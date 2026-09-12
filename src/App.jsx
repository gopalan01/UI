import React, { useState, useEffect, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AICharacter from './components/AICharacter';
import AudioVisualizer from './components/AudioVisualizer';
import VoiceStatus from './components/VoiceStatus';
import CentralMic from './components/CentralMic';
import ConversationPanel from './components/ConversationPanel';
import VoiceUploadModal from './components/VoiceUploadModal';
import LanguageDialectModal from './components/LanguageDialectModal';
import UserProfileModal from './components/UserProfileModal';
import VoiceSelectorControl from './components/VoiceSelectorControl';
import HistoryDropdownMenu from './components/HistoryDropdownMenu';
import CompactChangeLanguageModal from './components/CompactChangeLanguageModal';
import { Sparkles, MessageSquare } from 'lucide-react';

import { 
  SUPPORTED_LANGUAGES, 
  getDefaultVoiceForLanguage,
  getVoicePreference,
  getEmotionPreference,
  getEmotionConfirmationMessage,
  getVoiceConfirmationMessage,
  getSpeechSpeedConfirmationMessage,
  getSpeechRecognitionLanguage,
  getSpeedSelectPrompt,
  getSetupCompletionGreeting
} from './constants/languageConfig';

import { 
  getMockAIResponse, 
  autoDetectLanguageAndSlang,
  checkExplicitLanguageSwitch,
  checkExplicitSettingSwitch
} from './services/mockAIEngine';

import { speechRecognizer } from './services/speechRecognition';
import { speechAudioEngine } from './services/speechAudioEngine';
import { audioRecorder } from './services/audioRecorder';
import { apiService } from './services/apiService';
import { 
  saveConversationSession 
} from './services/conversationHistoryService';
import {
  normalizeVoiceInput,
  normalizeSpeechText,
  matchLanguage,
  matchLanguageAlias,
  matchCountry,
  matchRegionAlias,
  matchSlang,
  matchSlangAlias,
  matchVoiceType,
  matchVoiceAlias,
  matchTone,
  matchEmotionAlias,
  matchSpeechSpeed,
  matchSpeedAlias,
  STT_LANGUAGE_CODES
} from './services/setupVoiceMatcher';

// ================================================================
// FUTURE THAMILI PLATFORM INTEGRATION HOOKS:
// MAIN THAMILI USER DATA WILL CONNECT HERE
// MAIN PROJECT AI RESPONSE CAN BE RECEIVED HERE
// REAL SPEECH-TO-TEXT SERVICE CAN CONNECT HERE
// REAL LANGUAGE DETECTION CAN CONNECT HERE
// REAL COUNTRY OR REGION DETECTION CAN CONNECT HERE
// REAL SLANG DETECTION CAN CONNECT HERE
// REAL TEXT-TO-SPEECH SERVICE CAN CONNECT HERE
// REAL MALE VOICE SERVICE CAN CONNECT HERE
// REAL FEMALE VOICE SERVICE CAN CONNECT HERE
// UPLOADED USER VOICE FILE AVAILABLE HERE
// REAL VOICE CLONING SERVICE CAN CONNECT HERE
// ================================================================

export default function App() {
  // 1. Theme State (persisted in LocalStorage)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('aurqo_theme') || 'light';
  });

  // 1b. User Name State (Defaults to 'Gopi' as requested, persisted in LocalStorage)
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('aurqo_user_name') || 'Gopi';
  });

  // 2. Active Voice Configuration (Language, Region, Slang, Voice, Emotion)
  // Defaults to Tamil (Kongu Tamil, Female Voice, Default Emotion)
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('aurqo_voice_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.voice) {
          // Normalise legacy voice names
          if (['karthik', 'valluvar', 'alex', 'ryan', 'rohan', 'kabir', 'ramesh', 'krishna'].includes(parsed.voice)) {
            parsed.voice = 'male';
          } else if (['kavitha', 'nila', 'emma', 'sophia', 'priya', 'ananya', 'lakshmi', 'sravani'].includes(parsed.voice)) {
            parsed.voice = 'female';
          }
          if (!parsed.emotion) {
            parsed.emotion = 'default';
          }
          return parsed;
        }
      } catch (_err) {
        // Fallback default
      }
    }
    return {
      language: 'tamil',
      region: 'tamil_nadu',
      slang: 'kongu_tamil',
      voice: 'female',
      emotion: 'default'
    };
  });

  // 3. Selection Step State: 'welcome' -> 'language' -> 'region' -> 'slang' -> 'voice' -> 'emotion' -> 'speed' -> 'completed'
  const [currentStep, setCurrentStep] = useState('welcome');

  // 3b. Speech Speed State ('slow' | 'normal' | 'fast', persisted in LocalStorage)
  const [speechSpeed, setSpeechSpeed] = useState(() => {
    return localStorage.getItem('aurqo_speech_speed') || 'normal';
  });

  // 4. Conversational & AI Core States
  const [aiState, setAiState] = useState('idle'); // 'idle' | 'listening' | 'thinking' | 'speaking' | 'uploading' | 'ready' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [speechNotice, setSpeechNotice] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [uploadedVoiceFile, setUploadedVoiceFile] = useState(null);

  // 5. UI & Modal States
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isDialectModalOpen, setIsDialectModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHistoryMenuOpen, setIsHistoryMenuOpen] = useState(false);
  const [isCompactChangeLangOpen, setIsCompactChangeLangOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [isVoicePanelCollapsed, setIsVoicePanelCollapsed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activePlayingIndex, setActivePlayingIndex] = useState(null);
  const [hasStartedVoice, setHasStartedVoice] = useState(false);
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);
  const currentAudioRef = useRef(null);

  // Close voice settings on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isVoiceSettingsOpen) {
        setIsVoiceSettingsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVoiceSettingsOpen]);

  // Update & persist User Name
  const handleUpdateUserName = (newName) => {
    setUserName(newName);
    localStorage.setItem('aurqo_user_name', newName);
  };

  // Sync theme changes to document element and LocalStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aurqo_theme', theme);
  }, [theme]);

  // Persist voice config
  useEffect(() => {
    localStorage.setItem('aurqo_voice_config', JSON.stringify(config));
  }, [config]);

  // Handle Speech Speed Change with immediate localized voice reply in the new speed!
  const handleChangeSpeechSpeed = (newSpeed) => {
    setSpeechSpeed(newSpeed);
    localStorage.setItem('aurqo_speech_speed', newSpeed);

    const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === config.language) || SUPPORTED_LANGUAGES[0];
    const currentSlang = currentLang.slangs.find((s) => s.id === config.slang) || currentLang.slangs[0];
    const currentVoice = getVoicePreference(config.language, config.voice);
    const speedBadge = newSpeed === 'slow' ? 'Slow 0.6x' : newSpeed === 'fast' ? 'Fast 1.4x' : 'Normal 1.0x';

    if (currentStep !== 'completed') {
      // Completing setup through step 6 (Speech Speed)
      setCurrentStep('completed');
      const completionGreeting = getSetupCompletionGreeting(config.language, config.slang);
      addMessage('ai', completionGreeting, `${currentSlang.name} (${currentVoice.name} • ${speedBadge})`, config.language);
      speakAI(completionGreeting, () => setAiState('idle'), config, newSpeed);
    } else {
      // Normal conversation speed adjustment
      const speedConfirmText = getSpeechSpeedConfirmationMessage(config.slang, newSpeed, config.language);
      addMessage('ai', speedConfirmText, `${currentSlang.name} (${currentVoice.name} • ${speedBadge})`, config.language);
      speakAI(speedConfirmText, () => setAiState('idle'), config, newSpeed);
    }
  };

  // Auto-save active conversation into LocalStorage
  useEffect(() => {
    if (messages && messages.length > 0) {
      const saved = saveConversationSession({
        id: currentConversationId,
        messages,
        language: config.language,
        country: config.region,
        region: config.region,
        style: config.slang,
        slang: config.slang,
        voice: config.voice,
        emotion: config.emotion || 'default',
        speechSpeed
      });
      if (saved && !currentConversationId) {
        setCurrentConversationId(saved.id);
      }
    }
  }, [messages, config.language, config.region, config.slang, config.voice, config.emotion, speechSpeed]);

  // Helper: Format message timestamp
  const getFormattedTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Helper: Add message to conversation history
  const addMessage = useCallback((sender, text, slangName = '', messageLang = null) => {
    const newMsg = {
      id: Date.now() + Math.random(),
      sender,
      text,
      slangName,
      language: messageLang || config.language,
      timestamp: getFormattedTime()
    };
    setMessages((prev) => [...prev, newMsg]);
  }, [config.language]);

  // Main voice output synthesis function (strictly applies language, region, slang, voice, emotion, speed)
  const speakAI = useCallback(async (text, onFinish, specificConfig = null, customSpeed = null) => {
    if (isMuted) {
      if (onFinish) onFinish();
      return;
    }

    const activeLang = specificConfig?.language || config.language;
    const activeRegion = specificConfig?.region || config.region;
    const activeSlang = specificConfig?.slang || config.slang;
    const activeVoice = specificConfig?.voice || config.voice;
    const activeEmotion = specificConfig?.emotion || config.emotion || 'default';
    const effectiveSpeed = customSpeed || speechSpeed;

    setAiState('speaking');

    // Fallback speaker using browser Web Speech API
    const fallbackSpeak = () => {
      const bcp47 = getSpeechRecognitionLanguage(activeLang, activeRegion);
      speechAudioEngine.speak(text, {
        languageCode: bcp47,
        voicePreference: activeVoice,
        emotion: activeEmotion,
        speechSpeed: effectiveSpeed,
        onStart: () => {
          setAiState('speaking');
        },
        onEnd: () => {
          setAiState('idle');
          setActivePlayingIndex(null);
          if (onFinish) onFinish();
        },
        onError: (err) => {
          console.warn('Speech synthesis notice:', err);
          setAiState('idle');
          setActivePlayingIndex(null);
          if (onFinish) onFinish();
        }
      });
    };

    // Try FastAPI /synthesize (Edge-TTS neural voices)
    try {
      const res = await apiService.synthesizeSpeech(text, {
        language: activeLang,
        region: activeRegion,
        slang: activeSlang,
        voice: activeVoice,
        emotion: activeEmotion,
        speechSpeed: effectiveSpeed
      });

      if (res && res.status === 'success' && res.audio_base64) {
        if (currentAudioRef.current) {
          try { currentAudioRef.current.pause(); } catch (_e) {}
        }
        const audio = new Audio(res.audio_base64);
        currentAudioRef.current = audio;
        audio.onended = () => {
          setAiState('idle');
          currentAudioRef.current = null;
          setActivePlayingIndex(null);
          if (onFinish) onFinish();
        };
        audio.onerror = () => {
          currentAudioRef.current = null;
          fallbackSpeak();
        };
        try {
          await audio.play();
          return;
        } catch (_playErr) {
          fallbackSpeak();
          return;
        }
      }
    } catch (synthErr) {
      console.warn('Backend synthesizeSpeech error, falling back to browser speechAudioEngine:', synthErr);
    }

    fallbackSpeak();
  }, [config.language, config.region, config.slang, config.voice, config.emotion, speechSpeed, isMuted]);

  // Helper for localized language setup prompt
  const getLanguageSelectPrompt = (lang) => {
    switch (lang.id) {
      case 'tamil':
        return `${lang.name} மொழி அமைக்கப்பட்டது! இப்போது உங்கள் நாடு அல்லது பகுதியைத் தேர்ந்தெடுக்கவும்.`;
      case 'hindi':
        return `${lang.name} भाषा चुनी गई! कृपया अपना देश या क्षेत्र चुनें।`;
      case 'telugu':
        return `${lang.name} భాష ఎంపికైంది! దయచేసి మీ ప్రాంతాన్ని ఎంచుకోండి.`;
      case 'malayalam':
        return `${lang.name} ഭാഷ തിരഞ്ഞെടുത്തു! ദയവായി നിങ്ങളുടെ രാജ്യമോ പ്രദേശമോ തിരഞ്ഞെടുക്കുക.`;
      case 'kannada':
        return `${lang.name} ಭಾಷೆ ಆಯ್ಕೆಯಾಗಿದೆ! ದಯವಿಟ್ಟು ನಿಮ್ಮ ದೇಶ ಅಥವಾ ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ.`;
      case 'bengali':
        return `${lang.name} ভাষা নির্বাচিত হয়েছে! অনুগ্রহ করে আপনার দেশ বা অঞ্চল নির্বাচন করুন।`;
      case 'marathi':
        return `${lang.name} भाषा निवडली गेली आहे! कृपया आपला देश किंवा प्रदेश निवडा.`;
      case 'gujarati':
        return `${lang.name} ભાષા પસંદ થઈ ગઈ છે! કૃપા કરીને તમારો દેશ અથવા પ્રદેશ પસંદ કરો.`;
      case 'spanish':
        return `Idioma ${lang.name} seleccionado. Por favor, selecciona tu país o región.`;
      case 'french':
        return `Langue ${lang.name} sélectionnée. Veuillez choisir votre pays ou région.`;
      case 'german':
        return `Sprache ${lang.name} ausgewählt. Bitte wählen Sie Ihr Land oder Ihre Region.`;
      case 'japanese':
        return `${lang.name}が選択されました。国または地域を選択してください。`;
      case 'arabic':
        return `تم اختيار اللغة ${lang.name}. يرجى اختيار بلدك அல்லது உங்கள் பகுதியைத் தேர்ந்தெடுக்கவும்.`;
      case 'english':
      default:
        return `Switched to ${lang.name}. Please select your country or region.`;
    }
  };

  // Helper for localized region setup prompt
  const getRegionSelectPrompt = (lang, region) => {
    switch (lang.id) {
      case 'tamil':
        return `${region.name} பகுதி தேர்வு செய்யப்பட்டது! உங்கள் விருப்பமான வட்டார வழக்கை (Slang) தேர்ந்தெடுக்கவும்.`;
      case 'hindi':
        return `${region.name} क्षेत्र चुना गया! कृपया अपनी पसंदीदा स्थानीय बोली चुनें।`;
      case 'telugu':
        return `${region.name} ప్రాంతం ఎంపికైంది! మీకు ఇష్టమైన యాసను ఎంచుకోండి.`;
      case 'malayalam':
        return `${region.name} പ്രദേശം തിരഞ്ഞെടുത്തു! ദയവായി നിങ്ങളുടെ സംഭാഷണ ശൈലി തിരഞ്ഞെടുക്കുക.`;
      case 'kannada':
        return `${region.name} ಪ್ರದೇಶ ಆಯ್ಕೆಯಾಗಿದೆ! ನಿಮ್ಮ ಮೆಚ್ಚಿನ ಕನ್ನಡ ಶೈಲಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.`;
      case 'bengali':
        return `${region.name} অঞ্চল নির্বাচিত হয়েছে! আপনার পছন্দের আঞ্চলিক ঢং নির্বাচন করুন।`;
      case 'marathi':
        return `${region.name} प्रदेश निवडला गेला आहे! आपली स्थानिक भाषा शैली निवडा.`;
      case 'gujarati':
        return `${region.name} પ્રદેશ પસંદ થયો છે! તમારી મનપસંદ બોલી પસંદ કરો.`;
      case 'spanish':
        return `Región ${region.name} seleccionada. Elige tu estilo de habla preferido.`;
      case 'french':
        return `Région ${region.name} sélectionnée. Choisissez votre style de communication.`;
      case 'german':
        return `Region ${region.name} ausgewählt. Wählen Sie Ihren bevorzugten Sprachstil.`;
      case 'japanese':
        return `${region.name}が選択されました。会話スタイルを選択してください。`;
      case 'arabic':
        return `تم اختيار منطقة ${region.name}. يرجى اختيار اللهجة أو أسلوب التحدث.`;
      case 'english':
      default:
        return `${region.name} selected! Please choose your local communication slang or style.`;
    }
  };

  // Helper for localized voice model prompt (Male Voice / Female Voice)
  const getVoiceSelectPrompt = (lang, slang) => {
    switch (lang.id) {
      case 'tamil':
        if (slang.id === 'kongu_tamil') {
          return "சரிங்கண்ணா, கொங்கு தமிழ் ஸ்டைல் தேர்வு செஞ்சாச்சுங்கண்ணா! உங்களுக்கு எந்த குரல் வேணுமுங்கண்ணா: ஆண் குரல் (Male Voice) அல்லது பெண் குரல் (Female Voice)?";
        }
        if (slang.id === 'chennai_tamil') {
          return "சூப்பர் பா! மெட்ராஸ் பாஷை செட் பண்ணியாச்சு பா. என்ன வாய்ஸ்ல பேசட்டும் சொல்லு பாப்போம்: ஆண் வாய்ஸ் (Male Voice) இல்ல பெண் வாய்ஸ் (Female Voice)?";
        }
        return `${slang.confirmation || 'அருமை!'} உங்களுக்கு எந்த குரல் வேண்டும்: ஆண் குரல் (Male Voice) அல்லது பெண் குரல் (Female Voice)?`;
      case 'hindi':
        return `${slang.confirmation || 'बढ़िया!'} आप किस आवाज़ में बात करना चाहेंगे: पुरुष स्वर (Male Voice) या महिला स्वर (Female Voice)?`;
      case 'telugu':
        return `${slang.confirmation || 'బాగుంది!'} మీకు ఏ వాయిస్ కావాలి: పురుష స్వరం (Male Voice) లేదా స్త్రీ స్వరం (Female Voice)?`;
      case 'malayalam':
        return `${slang.confirmation || 'കൊള്ളാം!'} ഏത് ശബ്ദമാണ് താങ്കൾക്ക് വേണ്ടത്: പുരുഷ സ്വരം (Male Voice) അതോ സ്ത്രീ സ്വരം (Female Voice)?`;
      case 'kannada':
        return `${slang.confirmation || 'ಉತ್ತಮ!'} ತಮಗೆ ಯಾವ ಧ್ವನಿ ಬೇಕು: ಪುರುಷ ಧ್ವನಿ (Male Voice) ಅಥವಾ ಮಹಿಳಾ ಧ್ವನಿ (Female Voice)?`;
      case 'bengali':
        return `${slang.confirmation || 'দারুণ!'} আপনি কোন কণ্ঠস্বর চান: পুরুষ কণ্ঠ (Male Voice) নাকি নারী কণ্ঠ (Female Voice)?`;
      case 'marathi':
        return `${slang.confirmation || 'छान!'} आपल्याला कोणता आवाज हवा आहे: पुरुष आवाज (Male Voice) की स्त्री आवाज (Female Voice)?`;
      case 'gujarati':
        return `${slang.confirmation || 'સરસ!'} તમને કયો અવાજ ગમશે: પુરુષ અવાજ (Male Voice) કે સ્ત્રી અવાજ (Female Voice)?`;
      case 'spanish':
        return `${slang.confirmation || '¡Excelente!'} ¿Qué voz prefieres: Voz Masculina (Male Voice) o Voz Femenina (Female Voice)?`;
      case 'french':
        return `${slang.confirmation || 'Parfait !'} Quelle voix souhaitez-vous : Voix Masculine ou Voix Féminine ?`;
      case 'german':
        return `${slang.confirmation || 'Ausgezeichnet!'} Welche Stimme bevorzugen Sie: Männliche Stimme oder Weibliche Stimme?`;
      case 'japanese':
        return `${slang.confirmation || '了解しました。'} どちらの音声がよろしいですか：男性音声（Male Voice）または女性音声（Female Voice）？`;
      case 'arabic':
        return `${slang.confirmation || 'رائع!'} أي صوت تفضل: صوت رجالي (Male Voice) أو صوت نسائي (Female Voice)?`;
      case 'english':
      default:
        return `${slang.confirmation || 'Great!'} Which voice type would you prefer: Male Voice or Female Voice?`;
    }
  };

  // Helper for localized tone prompt
  const getEmotionSelectPrompt = (lang, slang, voiceObj) => {
    const voiceLabel = voiceObj?.nativeName || voiceObj?.name || 'Voice';
    switch (lang.id) {
      case 'tamil':
        if (slang.id === 'kongu_tamil') {
          return `${voiceLabel} தேர்வு செஞ்சாச்சுங்கண்ணா! உங்களுக்கு எந்த வாய்ஸ் டோன் வேணுமுங்கண்ணா: இயல்பான நிலை (Default), மகிழ்ச்சி (Happy), அமைதி (Calm), நட்பு (Friendly), அல்லது கம்பீரம் (Husky)?`;
        }
        return `${voiceLabel} தேர்வு செய்யப்பட்டது! இப்போது உங்களுக்கு எந்த வாய்ஸ் டோன் வேண்டும்: இயல்பான நிலை (Default), மகிழ்ச்சி (Happy), அமைதி (Calm), நட்பு (Friendly), அல்லது கம்பீரம் (Husky)?`;
      case 'hindi':
        return `${voiceObj.name} चुना गया! कृपया अपना पसंदीदा वॉइस टोन (Tone) चुनें: Default, Happy, Calm, Friendly, या Husky.`;
      case 'telugu':
        return `${voiceObj.name} ఎంపికైంది! దయచేసి మీ వాయిస్ టోన్ (Tone) ఎంచుకోండి: Default, Happy, Calm, Friendly, లేదా Husky.`;
      case 'malayalam':
        return `${voiceObj.name} തിരഞ്ഞെടുത്തു! താങ്കൾക്ക് ഏത് വോയ്സ് ടോൺ (Tone) ആണ് വേണ്ടത്: Default, Happy, Calm, Friendly, അതോ Husky?`;
      case 'kannada':
        return `${voiceObj.name} ಆಯ್ಕೆಯಾಗಿದೆ! ತಮಗೆ ಯಾವ ಧ್ವನಿ ಶೈಲಿ (Tone) ಬೇಕು: Default, Happy, Sad, Husky, Excitement, Calm, Romantic, ಅಥವಾ Bold?`;
      case 'bengali':
        return `${voiceObj.name} নির্বাচিত হয়েছে! আপনার পছন্দের ভয়েস টোন নির্বাচন করুন: Default, Happy, Sad, Husky, Excitement, Calm, Romantic, অথবা Bold.`;
      case 'marathi':
        return `${voiceObj.name} निवडला गेला आहे! कृपया आपला आवडता टोन निवडा: Default, Happy, Sad, Husky, Excitement, Calm, Romantic, किंवा Bold.`;
      case 'gujarati':
        return `${voiceObj.name} પસંદ થયો છે! કૃપા કરીને તમારો મનપસંદ વૉઇસ ટોન પસંદ કરો: Default, Happy, Sad, Husky, Excitement, Calm, Romantic, કે Bold.`;
      case 'spanish':
        return `${voiceObj.name} seleccionada. Elige el tono de voz: Default, Happy, Sad, Husky, Excitement, Calm, Romantic o Bold.`;
      case 'french':
        return `${voiceObj.name} sélectionnée. Choisissez votre tonalité : Default, Happy, Sad, Husky, Excitement, Calm, Romantic ou Bold.`;
      case 'german':
        return `${voiceObj.name} ausgewählt. Bitte wählen Sie die Klangfarbe: Default, Happy, Sad, Husky, Excitement, Calm, Romantic oder Bold.`;
      case 'japanese':
        return `${voiceObj.name}が選択されました。ボイストーンを選択してください：Default, Happy, Sad, Husky, Excitement, Calm, Romantic, または Bold。`;
      case 'arabic':
        return `تم اختيار ${voiceObj.name}. يرجى اختيار نبرة الصوت: Default, Happy, Sad, Husky, Excitement, Calm, Romantic, أو Bold.`;
      case 'english':
      default:
        return `${voiceObj.name} selected! Please choose your preferred voice tone: Default, Happy, Calm, Friendly, or Husky.`;
    }
  };

  // 1. Handle Language Selection -> Sets language, replies, and advances to Region step during setup, or applies immediately during normal conversation!
  const handleSelectLanguage = (langId) => {
    const selectedLang = SUPPORTED_LANGUAGES.find((l) => l.id === langId) || SUPPORTED_LANGUAGES[0];
    const defaultRegion = selectedLang.defaultRegion;
    const defaultSlang = selectedLang.slangs[0];
    const defaultVoice = getDefaultVoiceForLanguage(langId);

    const newConfig = {
      ...config,
      language: langId,
      region: defaultRegion,
      slang: defaultSlang.id,
      voice: defaultVoice
    };
    setConfig(newConfig);

    // Default speed for all languages is 'normal'
    setSpeechSpeed('normal');
    localStorage.setItem('aurqo_speech_speed', 'normal');

    if (currentStep !== 'completed') {
      // Advance to Step 2 (Country / Region)
      setCurrentStep('region');
      const promptText = getLanguageSelectPrompt(selectedLang);
      addMessage('ai', promptText, 'Country Setup', langId);
      speakAI(promptText, () => setAiState('idle'), newConfig, 'normal');
    } else {
      // Normal conversation: apply immediately without restarting setup flow!
      const switchConfirm = getEmotionConfirmationMessage(newConfig.slang, newConfig.emotion, langId);
      addMessage('ai', switchConfirm, `${defaultSlang.name} (${defaultVoice})`, langId);
      speakAI(switchConfirm, () => setAiState('idle'), newConfig, 'normal');
    }
  };

  // 2. Handle Region Selection -> Updates region, replies, and advances to Slang step!
  const handleSelectRegion = (regionId) => {
    const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === config.language) || SUPPORTED_LANGUAGES[0];
    const selectedRegion = currentLang.regions.find((r) => r.id === regionId) || currentLang.regions[0];

    const newConfig = { ...config, region: regionId };
    setConfig(newConfig);

    if (currentStep !== 'completed') {
      // Advance to Step 3 (Slang / Style)
      setCurrentStep('slang');
      const promptText = getRegionSelectPrompt(currentLang, selectedRegion);
      addMessage('ai', promptText, 'Slang Setup', config.language);
      speakAI(promptText, () => setAiState('idle'), newConfig, speechSpeed);
    } else {
      // Normal conversation: apply immediately!
      const promptText = getRegionSelectPrompt(currentLang, selectedRegion);
      addMessage('ai', promptText, 'Region Updated', config.language);
      speakAI(promptText, () => setAiState('idle'), newConfig, speechSpeed);
    }
  };

  // 3. Handle Slang Selection -> Updates slang, replies in that slang, and advances to Voice step!
  const handleSelectSlang = (slangId) => {
    const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === config.language) || SUPPORTED_LANGUAGES[0];
    const selectedSlang = currentLang.slangs.find((s) => s.id === slangId) || currentLang.slangs[0];

    const newConfig = { ...config, slang: slangId };
    setConfig(newConfig);

    if (currentStep !== 'completed') {
      // Advance to Step 4 (Voice Model)
      setCurrentStep('voice');
      const voicePrompt = getVoiceSelectPrompt(currentLang, selectedSlang);
      addMessage('ai', voicePrompt, selectedSlang.name, config.language);
      speakAI(voicePrompt, () => setAiState('idle'), newConfig, speechSpeed);
    } else {
      // Normal conversation: apply immediately!
      const confirmText = selectedSlang.confirmation || `Switched to ${selectedSlang.name}.`;
      addMessage('ai', confirmText, selectedSlang.name, config.language);
      speakAI(confirmText, () => setAiState('idle'), newConfig, speechSpeed);
    }
  };

  // 4. Handle Voice Selection -> Advances to Step 5: Emotion Selection!
  const handleSelectVoice = (voiceId) => {
    const newConfig = { ...config, voice: voiceId };
    setConfig(newConfig);

    const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === config.language) || SUPPORTED_LANGUAGES[0];
    const currentSlang = currentLang.slangs.find((s) => s.id === config.slang) || currentLang.slangs[0];
    const voiceObj = getVoicePreference(config.language, voiceId);

    if (voiceId === 'user' && !uploadedVoiceFile) {
      if (currentStep !== 'completed') {
        setCurrentStep('emotion');
      }
      setIsVoiceModalOpen(true);
      setAiState('uploading');

      const uploadPrompt = config.language === 'tamil'
        ? "தயவுசெய்து உங்கள் சொந்த குரல் மாதிரியை பதிவேற்றவும்."
        : config.language === 'hindi'
        ? "कृपया अपना ऑडियो सैंपल अपलोड करें।"
        : config.language === 'telugu'
        ? "దయచేసి మీ ఆడియో నమూనాను అప్‌లోడ్ చేయండి."
        : "Please upload your voice sample.";
      addMessage('ai', uploadPrompt, currentSlang.name, config.language);
      speakAI(uploadPrompt, null, newConfig, speechSpeed);
      return;
    }

    if (currentStep !== 'completed') {
      // Advance to Step 5 (Voice Tone)
      setCurrentStep('emotion');
      const emotionPrompt = getEmotionSelectPrompt(currentLang, currentSlang, voiceObj);
      addMessage('ai', emotionPrompt, `${currentSlang.name} (${voiceObj.name})`, config.language);
      speakAI(emotionPrompt, () => setAiState('idle'), newConfig, speechSpeed);
    } else {
      // Normal conversation: apply immediately!
      const voiceConfirmMsg = getVoiceConfirmationMessage(config.slang, voiceId, config.language);
      addMessage('ai', voiceConfirmMsg, `${currentSlang.name} (${voiceObj.name})`, config.language);
      speakAI(voiceConfirmMsg, () => setAiState('idle'), newConfig, speechSpeed);
    }
  };

  // 5. Handle Tone Selection -> Advances to Step 6: Speech Speed
  const handleSelectEmotion = (emotionId) => {
    const newConfig = { ...config, emotion: emotionId };
    setConfig(newConfig);

    const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === newConfig.language) || SUPPORTED_LANGUAGES[0];
    const currentSlang = currentLang.slangs.find((s) => s.id === newConfig.slang) || currentLang.slangs[0];
    const voiceObj = getVoicePreference(newConfig.language, newConfig.voice);
    const emoObj = getEmotionPreference(emotionId);

    if (currentStep !== 'completed') {
      setCurrentStep('speed');
      const speedPrompt = getSpeedSelectPrompt(newConfig.language);
      addMessage('ai', speedPrompt, `${currentSlang.name} (${voiceObj.name} • ${emoObj.name})`, newConfig.language);
      speakAI(speedPrompt, () => setAiState('idle'), newConfig, speechSpeed);
    } else {
      const confirmText = getEmotionConfirmationMessage(newConfig.slang, emotionId, newConfig.language);
      addMessage('ai', confirmText, `${currentSlang.name} (${voiceObj.name} • ${emoObj.name})`, newConfig.language);
      speakAI(confirmText, () => setAiState('idle'), newConfig, speechSpeed);
    }
  };

  // Immediately stop AI audio playback, speech synthesis, and return to idle (Mute / Cancel)
  const handleStopSpeech = useCallback(() => {
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      } catch (_e) {}
      currentAudioRef.current = null;
    }
    try {
      speechAudioEngine.stop();
    } catch (_e) {}
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } catch (_e) {}
    try {
      audioRecorder.cancelRecording();
    } catch (_e) {}
    try {
      speechRecognizer.abortListening();
    } catch (_e) {}
    setAiState('idle');
    setActivePlayingIndex(null);
  }, []);

  // 6. Test Current Voice Live Audio
  const handleTestVoice = () => {
    const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === config.language) || SUPPORTED_LANGUAGES[0];
    const currentSlang = currentLang.slangs.find((s) => s.id === config.slang) || currentLang.slangs[0];
    const voiceObj = getVoicePreference(config.language, config.voice);
    const emoObj = getEmotionPreference(config.emotion || 'default');

    const testPhrase = currentSlang.sampleGreeting || getVoiceConfirmationMessage(config.slang, config.voice, config.language);
    addMessage('ai', testPhrase, `${currentSlang.name} (${voiceObj.name} • ${emoObj.name})`, config.language);
    speakAI(testPhrase, () => setAiState('idle'), config, speechSpeed);
  };

  // Restart Flow: Auto-saves complete conversation to History BEFORE resetting to Step 1 Language selection
  const handleRestartConversation = () => {
    if (currentAudioRef.current) {
      try { currentAudioRef.current.pause(); } catch (_e) {}
      currentAudioRef.current = null;
    }
    audioRecorder.cancelRecording();
    speechAudioEngine.stop();
    speechRecognizer.abortListening();
    setAiState('idle');
    setErrorMessage('');
    setSpeechNotice('');
    
    // STEP 1 & STEP 2: Check if messages exist and automatically save COMPLETE conversation before clearing
    if (messages && messages.length > 0) {
      saveConversationSession({
        id: currentConversationId,
        messages,
        language: config.language,
        country: config.region,
        region: config.region,
        style: config.slang,
        slang: config.slang,
        voice: config.voice,
        emotion: config.emotion || 'default',
        speechSpeed,
        forceSave: true
      });
    }

    // Reset selection step back to initial welcome stage
    setCurrentStep('welcome');

    // Reset config to fresh default setup (Tamil, Kongu Tamil, Female, Default Emotion)
    const resetConfig = {
      language: 'tamil',
      region: 'tamil_nadu',
      slang: 'kongu_tamil',
      voice: 'female',
      emotion: 'default'
    };
    setConfig(resetConfig);

    // Default speed for all languages is 'normal'
    setSpeechSpeed('normal');
    localStorage.setItem('aurqo_speech_speed', 'normal');

    setCurrentConversationId(null);
    setHasStartedVoice(false);

    setMessages([]);
  };

  // Handle selecting and restoring a saved conversation from History
  const handleSelectSavedConversation = (savedConv) => {
    if (!savedConv) return;
    speechAudioEngine.stop();
    speechRecognizer.abortListening();
    setAiState('idle');
    setSpeechNotice('');

    setCurrentConversationId(savedConv.id);
    setMessages(savedConv.messages || []);

    const updatedConfig = {
      language: savedConv.language || 'tamil',
      region: savedConv.country || savedConv.region || (savedConv.language === 'english' ? 'united_states' : 'tamil_nadu'),
      slang: savedConv.style || savedConv.slang || 'kongu_tamil',
      voice: savedConv.voice || 'female',
      emotion: savedConv.emotion || 'default'
    };
    setConfig(updatedConfig);

    if (savedConv.speechSpeed) {
      setSpeechSpeed(savedConv.speechSpeed);
      localStorage.setItem('aurqo_speech_speed', savedConv.speechSpeed);
    }

    setCurrentStep('completed');
    setHasStartedVoice(true);
    setIsHistoryMenuOpen(false);
  };

  // Start fresh new empty conversation
  const handleNewConversation = () => {
    if (currentAudioRef.current) {
      try { currentAudioRef.current.pause(); } catch (_e) {}
      currentAudioRef.current = null;
    }
    audioRecorder.cancelRecording();
    speechAudioEngine.stop();
    speechRecognizer.abortListening();
    setAiState('idle');
    setErrorMessage('');
    setSpeechNotice('');

    // Auto-save existing conversation before opening new session
    if (messages && messages.length > 0) {
      saveConversationSession({
        id: currentConversationId,
        messages,
        language: config.language,
        country: config.region,
        region: config.region,
        style: config.slang,
        slang: config.slang,
        voice: config.voice,
        emotion: config.emotion || 'default',
        speechSpeed,
        forceSave: true
      });
    }

    setCurrentConversationId(null);
    setMessages([]);
    setCurrentStep('completed');
    setHasStartedVoice(false);
  };

  // Apply language change from CompactChangeLanguageModal (PRESERVES EXISTING MESSAGES)
  const handleApplyCompactLanguageChange = ({ language, slang, voice, emotion }) => {
    const selectedLangObj = SUPPORTED_LANGUAGES.find((l) => l.id === language) || SUPPORTED_LANGUAGES[0];
    const newConfig = {
      ...config,
      language,
      region: selectedLangObj.defaultRegion || config.region,
      slang: slang || config.slang,
      voice: voice || config.voice,
      emotion: emotion || config.emotion || 'default'
    };
    setConfig(newConfig);
    setCurrentStep('completed');

    // Default speed for all languages is 'normal'
    setSpeechSpeed('normal');
    localStorage.setItem('aurqo_speech_speed', 'normal');

    const voiceObj = getVoicePreference(language, newConfig.voice);
    const emoObj = getEmotionPreference(newConfig.emotion);

    const switchConfirm = getEmotionConfirmationMessage(newConfig.slang, newConfig.emotion, language);
    addMessage('ai', switchConfirm, `${newConfig.slang.replace(/_/g, ' ')} (${voiceObj.name} • ${emoObj.name})`, language);
    speakAI(switchConfirm, () => setAiState('idle'), newConfig, 'normal');
  };

  // Complete Step-by-Step Setup from 5-step modal wizard
  const handleCompleteFullSetup = (fullConfig) => {
    const selectedLang = SUPPORTED_LANGUAGES.find((l) => l.id === fullConfig.language) || SUPPORTED_LANGUAGES[0];
    const selectedSlang = selectedLang.slangs.find((s) => s.id === fullConfig.slang) || selectedLang.slangs[0];
    const voiceObj = getVoicePreference(fullConfig.language, fullConfig.voice);
    const emoObj = getEmotionPreference(fullConfig.emotion || 'default');

    const newConfig = {
      ...config,
      language: fullConfig.language,
      region: fullConfig.region || selectedLang.defaultRegion,
      slang: fullConfig.slang,
      voice: fullConfig.voice || selectedLang.defaultVoice,
      emotion: fullConfig.emotion || 'default'
    };
    setConfig(newConfig);
    setCurrentStep('completed');

    const switchMsg = getEmotionConfirmationMessage(fullConfig.slang, fullConfig.emotion, fullConfig.language);
    addMessage('ai', switchMsg, `${selectedSlang.name} (${voiceObj.name} • ${emoObj.name})`, fullConfig.language);
    speakAI(switchMsg, () => setAiState('idle'), newConfig);
  };

  // Handle Speech Result: STRICTLY RESPONDS IN USER'S SELECTED LANGUAGE
  const handleSpeechResult = (queryText) => {
    if (!queryText || !queryText.trim()) return;

    if (!hasStartedVoice) {
      setHasStartedVoice(true);
    }

    setErrorMessage('');
    addMessage('user', queryText.trim(), '', config.language);

    // 1. Check for explicit voice command to switch language
    const switchCommand = checkExplicitLanguageSwitch(queryText);
    if (switchCommand) {
      const targetLang = SUPPORTED_LANGUAGES.find((l) => l.id === switchCommand.language) || SUPPORTED_LANGUAGES[0];
      const targetSlang = targetLang.slangs.find((s) => s.id === switchCommand.slang) || targetLang.slangs[0];

      const newConfig = {
        ...config,
        language: switchCommand.language,
        region: switchCommand.region,
        slang: switchCommand.slang
      };
      setConfig(newConfig);
      setCurrentStep('completed');

      setAiState('thinking');
      setTimeout(() => {
        addMessage('ai', switchCommand.confirmation, targetSlang.name, switchCommand.language);
        speakAI(switchCommand.confirmation, () => setAiState('idle'), newConfig);
      }, 400);
      return;
    }

    // 1b. Check for explicit voice command to switch slang, voice, tone, or speed (Requirement 6, 7, 9, 10, 16)
    const settingSwitch = checkExplicitSettingSwitch(queryText, config);
    if (settingSwitch) {
      setAiState('thinking');
      let newConfig = { ...config };
      let newSpeed = speechSpeed;

      if (settingSwitch.type === 'slang') {
        newConfig.slang = settingSwitch.value;
        setConfig(newConfig);
      } else if (settingSwitch.type === 'voice') {
        newConfig.voice = settingSwitch.value;
        setConfig(newConfig);
      } else if (settingSwitch.type === 'emotion') {
        newConfig.emotion = settingSwitch.value;
        setConfig(newConfig);
      } else if (settingSwitch.type === 'speed') {
        newSpeed = settingSwitch.value;
        setSpeechSpeed(newSpeed);
        localStorage.setItem('aurqo_speech_speed', newSpeed);
      }

      setTimeout(() => {
        const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === newConfig.language) || SUPPORTED_LANGUAGES[0];
        const currentSlang = currentLang.slangs.find((s) => s.id === newConfig.slang) || currentLang.slangs[0];
        addMessage('ai', settingSwitch.confirmation, currentSlang.name, newConfig.language);
        speakAI(settingSwitch.confirmation, () => setAiState('idle'), newConfig, newSpeed);
      }, 400);
      return;
    }

    // 2. We strictly honor the user's chosen language: config.language
    let activeLanguage = config.language;
    let activeRegion = config.region;
    let activeSlang = config.slang;

    const autoDetected = autoDetectLanguageAndSlang(queryText, config);
    if (autoDetected && autoDetected.language === config.language && autoDetected.slang !== config.slang) {
      activeSlang = autoDetected.slang;
      const updatedConfig = { ...config, slang: activeSlang };
      setConfig(updatedConfig);
    }

    // 3. Conversational AI Reasoning strictly in user's chosen language, slang, voice & emotion
    setAiState('thinking');

    setTimeout(() => {
      const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === activeLanguage) || SUPPORTED_LANGUAGES[0];
      const currentSlang = currentLang.slangs.find((s) => s.id === activeSlang) || currentLang.slangs[0];
      const currentVoice = getVoicePreference(activeLanguage, config.voice);
      const emoObj = getEmotionPreference(config.emotion || 'default');

      const aiResult = getMockAIResponse({
        text: queryText,
        language: activeLanguage,
        region: activeRegion,
        slang: activeSlang,
        emotion: config.emotion || 'default'
      });

      addMessage('ai', aiResult.finalResponse, `${currentSlang.name} (${currentVoice.name} • ${emoObj.name})`, activeLanguage);
      speakAI(aiResult.finalResponse, () => setAiState('idle'), {
        language: activeLanguage,
        region: activeRegion,
        voice: config.voice,
        emotion: config.emotion || 'default'
      }, speechSpeed);
    }, 450);
  };

  // Handle Spoken Input during 6-Step Voice-Guided Setup Flow (STRICT, NON-SKIPPABLE)
  const handleSetupVoiceInput = (userText) => {
    if (!userText || !userText.trim()) return;

    // RULE: At ANY point during setup, the user may explicitly change language
    // e.g., "எனக்கு இங்கிலிஷ்ல பேசணும்", "speak in english", "മലയാളത്തിൽ സംസാരിക്കൂ"
    const explicitLang = matchLanguage(userText);
    if (explicitLang && explicitLang !== config.language) {
      handleSelectLanguage(explicitLang);
      return;
    }

    if (currentStep === 'language') {
      // Step 1: Language selection with intelligent multilingual normalization & alias matching
      const matchedLang = matchLanguage(userText);
      if (matchedLang) {
        handleSelectLanguage(matchedLang);
      } else {
        const repeatMsg = "தயவுசெய்து உங்கள் மொழியைத் தேர்ந்தெடுக்கவும் (எ.கா: தமிழ், English, Malayalam, Hindi, Telugu).";
        addMessage('ai', repeatMsg, 'Language Setup', 'tamil');
        speakAI(repeatMsg, () => setAiState('idle'), config, speechSpeed);
      }
      return;
    }

    if (currentStep === 'region') {
      // Step 2: Country / Region selection in active language
      const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === config.language) || SUPPORTED_LANGUAGES[0];
      const matchedRegion = matchCountry(userText, currentLang);

      if (matchedRegion) {
        handleSelectRegion(matchedRegion);
      } else {
        let repeatMsg = "Please choose your country (e.g. India, USA, UK, Malaysia, Singapore).";
        if (config.language === 'tamil') {
          repeatMsg = "தயவுசெய்து உங்கள் நாட்டைத் தேர்ந்தெடுக்கவும் (எ.கா: இந்தியா, United States, United Kingdom, மலேசியா, சிங்கப்பூர்).";
        } else if (config.language === 'malayalam') {
          repeatMsg = "ദയവായി നിങ്ങളുടെ രാജ്യം തിരഞ്ഞെടുക്കുക (ഉദാ: India, United States, United Kingdom, Malaysia, Singapore).";
        } else if (config.language === 'hindi') {
          repeatMsg = "कृपया अपना देश चुनें (उदा: India, United States, United Kingdom, Malaysia, Singapore).";
        } else if (config.language === 'telugu') {
          repeatMsg = "దయచేసి మీ దేశాన్ని ఎంచుకోండి (ఉదా: India, United States, United Kingdom, Malaysia, Singapore).";
        }
        addMessage('ai', repeatMsg, 'Country Setup', config.language);
        speakAI(repeatMsg, () => setAiState('idle'), config, speechSpeed);
      }
      return;
    }

    if (currentStep === 'slang') {
      // Step 3: Slang / Dialect selection in active language
      const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === config.language) || SUPPORTED_LANGUAGES[0];
      const matchedSlang = matchSlang(userText, currentLang);

      if (matchedSlang) {
        handleSelectSlang(matchedSlang);
      } else {
        let repeatMsg = "Please choose your preferred communication slang or style.";
        if (config.language === 'tamil') {
          repeatMsg = "தயவுசெய்து உங்கள் வட்டார வழக்கை தேர்ந்தெடுக்கவும் (எ.கா: Kongu Tamil, Chennai Tamil, Madurai Tamil, Nellai Tamil, Standard Tamil).";
        } else if (config.language === 'malayalam') {
          repeatMsg = "ദയവായി സംഭാഷണ ശൈലി തിരഞ്ഞെടുക്കുക (ഉദാ: Valluvanadan Malayalam, Malabar, Travancore, Standard).";
        } else if (config.language === 'hindi') {
          repeatMsg = "कृपया अपनी पसंदीदा बोली चुनें (उदा: Delhi Hindi, Mumbai Hindi, Standard Hindi).";
        } else if (config.language === 'telugu') {
          repeatMsg = "దయచేసి మీ యాసను ఎంచుకోండి (ఉదా: Telangana, Andhra, Standard Telugu).";
        }
        addMessage('ai', repeatMsg, 'Slang Setup', config.language);
        speakAI(repeatMsg, () => setAiState('idle'), config, speechSpeed);
      }
      return;
    }

    if (currentStep === 'voice') {
      // Step 4: Centralized Voice Type Recognition (Male, Female, Own Voice)
      const normalizedText = normalizeVoiceInput(userText);
      const matchedVoice = matchVoiceType(userText);

      console.log("[Voice Setup] Raw transcript:", userText);
      console.log("[Voice Setup] Normalized transcript:", normalizedText);
      console.log("[Voice Setup] Matched Voice:", matchedVoice);

      if (matchedVoice === "male") {
        handleSelectVoice("male");
        return;
      }

      if (matchedVoice === "female") {
        handleSelectVoice("female");
        return;
      }

      if (matchedVoice === "own") {
        handleSelectVoice("user");
        return;
      }

      // Only if voiceType is null: re-prompt in user's chosen language
      let repeatMsg = "Please select Male or Female voice.";
      if (config.language === 'tamil') {
        repeatMsg = "தயவுசெய்து உங்கள் குரல் வகையைத் தேர்ந்தெடுக்கவும்: ஆண் குரல் (Male Voice) அல்லது பெண் குரல் (Female Voice).";
      } else if (config.language === 'malayalam') {
        repeatMsg = "ദയവായി ശബ്ദ തരം തിരഞ്ഞെടുക്കുക: പുരുഷ സ്വരം (Male Voice) അതോ സ്ത്രീ സ്വരം (Female Voice).";
      } else if (config.language === 'hindi') {
        repeatMsg = "कृपया अपनी आवाज़ चुनें: पुरुष स्वर (Male Voice) या महिला स्वर (Female Voice).";
      } else if (config.language === 'telugu') {
        repeatMsg = "దయచేసి మీ వాయిస్ రకాన్ని ఎంచుకోండి: పురుష స్వరం (Male Voice) లేదా స్త్రీ స్వరం (Female Voice).";
      }
      addMessage('ai', repeatMsg, 'Voice Setup', config.language);
      speakAI(repeatMsg, () => setAiState('idle'), config, speechSpeed);
      return;
    }

    if (currentStep === 'emotion') {
      // Step 5: Tone (Happy, Calm, Friendly, Husky)
      const matchedTone = matchTone(userText);

      if (matchedTone) {
        handleSelectEmotion(matchedTone);
      } else {
        let repeatMsg = "Please choose your voice tone: Happy, Calm, Friendly, or Husky.";
        if (config.language === 'tamil') {
          repeatMsg = "தயவுசெய்து உங்கள் வாய்ஸ் டோனைத் தேர்ந்தெடுக்கவும்: மகிழ்ச்சி (Happy), அமைதி (Calm), நட்பு (Friendly), அல்லது கம்பீரம் (Husky).";
        } else if (config.language === 'malayalam') {
          repeatMsg = "ദയവായി വോയ്സ് ടോൺ തിരഞ്ഞെടുക്കുക: Happy, Calm, Friendly, അതോ Husky.";
        } else if (config.language === 'hindi') {
          repeatMsg = "कृपया आवाज़ का टोन चुनें: Happy, Calm, Friendly, या Husky.";
        } else if (config.language === 'telugu') {
          repeatMsg = "దయచేసి వాయిస్ టోన్ ఎంచుకోండి: Happy, Calm, Friendly, లేదా Husky.";
        }
        addMessage('ai', repeatMsg, 'Tone Setup', config.language);
        speakAI(repeatMsg, () => setAiState('idle'), config, speechSpeed);
      }
      return;
    }

    if (currentStep === 'speed') {
      // Step 6: Speech Speed (Slow, Normal, Fast)
      const matchedSpeed = matchSpeechSpeed(userText);

      if (matchedSpeed) {
        handleChangeSpeechSpeed(matchedSpeed);
      } else {
        // Strict Setup: User said unrelated input. DO NOT advance! Re-prompt in current language!
        let repeatMsg = "Please choose speech speed: Slow, Normal, or Fast.";
        if (config.language === 'tamil') {
          repeatMsg = "தயவுசெய்து பேசும் வேகத்தைத் தேர்ந்தெடுக்கவும்: மெதுவாக (Slow), இயல்பாக (Normal), அல்லது வேகமாக (Fast).";
        } else if (config.language === 'malayalam') {
          repeatMsg = "ദയവായി സംസാര വേഗത തിരഞ്ഞെടുക്കുക: Slow, Normal, അതോ Fast.";
        } else if (config.language === 'hindi') {
          repeatMsg = "कृपया आवाज़ की गति चुनें: Slow, Normal, या Fast.";
        } else if (config.language === 'telugu') {
          repeatMsg = "దయచేసి వాయిస్ వేగం ఎంచుకోండి: Slow, Normal, లేదా Fast.";
        }
        addMessage('ai', repeatMsg, 'Speed Setup', config.language);
        speakAI(repeatMsg, () => setAiState('idle'), config, speechSpeed);
      }
      return;
    }
  };

  // Microphone Click Handler (Start / Stop) with FastAPI Backend Integration & Duplicate Request Protection
  const handleMicClick = async () => {
    // 1. Duplicate Request Protection: Prevent multiple triggers while backend is processing
    if (aiState === 'thinking') {
      return;
    }

    // 2. If currently speaking, stop voice playback immediately
    if (aiState === 'speaking') {
      if (currentAudioRef.current) {
        try { currentAudioRef.current.pause(); } catch (_e) {}
        currentAudioRef.current = null;
      }
      speechAudioEngine.stop();
      setAiState('idle');
      return;
    }

    // 2b. Immediately enter Voice Conversation Mode upon clicking (Requirement 1 & 2)
    if (!hasStartedVoice) {
      setHasStartedVoice(true);
    }

    // First Interaction Flow: Friendly Welcome Message before setup (Requirement 1)
    if (currentStep === 'welcome') {
      const welcomeText = "வணக்கம்! நான் தமிழி. இது உங்கள் Audio Generator. உங்களுக்கு என்ன உதவி வேண்டுமானாலும் என்னிடம் கேட்கலாம்.";
      addMessage('ai', welcomeText, 'THAMILI AI', 'tamil');
      speakAI(welcomeText, () => {
        // After welcome message is completed, THEN start the setup flow
        setCurrentStep('language');
        const langPrompt = "தயவுசெய்து உங்கள் உரையாடலுக்கான மொழியைத் தேர்ந்தெடுக்கவும் (தமிழ், English, Malayalam, Hindi, Telugu).";
        addMessage('ai', langPrompt, 'Language Setup', 'tamil');
        speakAI(langPrompt, () => setAiState('idle'), config, speechSpeed);
      }, config, speechSpeed);
      return;
    }

    // 3. If currently listening, stop recording and send audio to FastAPI backend if speech was detected!
    if (aiState === 'listening') {
      try {
        const audioResult = await audioRecorder.stopRecording();

        // Check if meaningful speech was detected during the recording
        if (!audioResult || !audioResult.blob || audioResult.blob.size === 0 || !audioResult.speechDetected) {
          console.log('[AudioRecorder] Silence detected: No meaningful speech detected during recording.');
          console.log('[AudioRecorder] Speech detected: false');
          console.log('[AudioRecorder] Silence detected: true');
          console.log('[AudioRecorder] Audio sent to backend: false');

          // Clear processing state and return the button to "Tap to Speak"
          setAiState('idle');
          setSpeechNotice('No speech detected. Please try again.');
          setErrorMessage('No speech detected. Please try again.');
          setTimeout(() => {
            setSpeechNotice((curr) => (curr === 'No speech detected. Please try again.' ? '' : curr));
            setErrorMessage((curr) => (curr === 'No speech detected. Please try again.' ? '' : curr));
          }, 3500);
          return;
        }

        // Meaningful speech was detected!
        console.log('[AudioRecorder] Meaningful speech detected during recording.');
        console.log('[AudioRecorder] Speech detected: true');
        console.log('[AudioRecorder] Silence detected: false');
        console.log('[AudioRecorder] Audio sent to backend: true');

        setAiState('thinking');
        setSpeechNotice('');
        setErrorMessage('');
        if (!hasStartedVoice) {
          setHasStartedVoice(true);
        }

        const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.id === config.language) || SUPPORTED_LANGUAGES[0];
        const currentSlangObj = currentLangObj.slangs.find((s) => s.id === config.slang) || currentLangObj.slangs[0];
        const voiceObj = getVoicePreference(config.language, config.voice);
        const emoObj = getEmotionPreference(config.emotion || 'default');

        // Route audio based on setup vs normal conversation
        if (currentStep !== 'completed') {
          // Rule 1: Use 'auto' ONLY during the first language-selection step.
          // After language is selected, ALWAYS send the selected language's ISO code (e.g. 'ta', 'ml', 'hi', 'te', 'en').
          const selectedLanguage = config.language;
          const sttLanguage = currentStep === 'language'
            ? 'auto'
            : (STT_LANGUAGE_CODES[selectedLanguage] || 'auto');

          console.log("[STT] Current selected language:", selectedLanguage);
          console.log("[STT] Sending transcription language:", sttLanguage);

          const transcribeRes = await apiService.transcribeAudio(audioResult.blob, sttLanguage);

          if (transcribeRes && transcribeRes.status === 'success' && transcribeRes.text) {
            const userSpokenText = transcribeRes.text.trim();
            console.log("[STT] Raw transcript:", userSpokenText);
            console.log("[STT] Selected language:", selectedLanguage);
            console.log("[STT] STT language code:", sttLanguage);

            addMessage('user', userSpokenText, '', config.language);
            handleSetupVoiceInput(userSpokenText);
          } else {
            let promptMsg = "Please repeat your choice.";
            if (config.language === 'tamil' || currentStep === 'language') {
              promptMsg = "தயவுசெய்து உங்கள் தேர்வை மீண்டும் கூறவும்: தமிழ், English, Malayalam, Hindi, Telugu.";
            } else if (config.language === 'malayalam') {
              promptMsg = "ദയവായി താങ്കളുടെ തിരഞ്ഞെടുപ്പ് വീണ്ടും പറയുക.";
            } else if (config.language === 'hindi') {
              promptMsg = "कृपया अपना विकल्प फिर से कहें।";
            } else if (config.language === 'telugu') {
              promptMsg = "దయచేసి మీ ఎంపికను మళ్లీ చెప్పండి.";
            }
            addMessage('ai', promptMsg, 'Setup', config.language);
            speakAI(promptMsg, () => setAiState('idle'), config, speechSpeed);
          }
          return;
        }

        // Send recorded audio + selected settings to FastAPI POST /conversation
        const backendRes = await apiService.sendConversation(audioResult.blob, {
          language: config.language,
          region: config.region,
          slang: config.slang,
          voice: config.voice,
          emotion: config.emotion || 'default',
          speechSpeed
        });

        if (backendRes && backendRes.status === 'success') {
          // Display recognized user transcript in conversation
          if (backendRes.user_text) {
            addMessage('user', backendRes.user_text, '', config.language);

            // Check if user requested a setting change by voice in normal conversation (Requirement 6, 16)
            const spokenSettingSwitch = checkExplicitSettingSwitch(backendRes.user_text, config);
            if (spokenSettingSwitch) {
              if (spokenSettingSwitch.type === 'slang') {
                setConfig((prev) => ({ ...prev, slang: spokenSettingSwitch.value }));
              } else if (spokenSettingSwitch.type === 'voice') {
                setConfig((prev) => ({ ...prev, voice: spokenSettingSwitch.value }));
              } else if (spokenSettingSwitch.type === 'emotion') {
                setConfig((prev) => ({ ...prev, emotion: spokenSettingSwitch.value }));
              } else if (spokenSettingSwitch.type === 'speed') {
                setSpeechSpeed(spokenSettingSwitch.value);
                localStorage.setItem('aurqo_speech_speed', spokenSettingSwitch.value);
              }
            }
          }

          // Display AI response in conversation
          if (backendRes.ai_text) {
            addMessage(
              'ai',
              backendRes.ai_text,
              `${currentSlangObj.name} (${voiceObj.name} • ${emoObj.name})`,
              config.language
            );

            // Play synthesized neural audio response
            if (backendRes.audio_base64 && !isMuted) {
              if (currentAudioRef.current) {
                try { currentAudioRef.current.pause(); } catch (_e) {}
              }
              const audio = new Audio(backendRes.audio_base64);
              currentAudioRef.current = audio;
              setAiState('speaking');

              audio.onended = () => {
                setAiState('idle');
                currentAudioRef.current = null;
              };

              audio.onerror = () => {
                currentAudioRef.current = null;
                speakAI(backendRes.ai_text, () => setAiState('idle'), config, speechSpeed);
              };

              try {
                await audio.play();
              } catch (_playErr) {
                speakAI(backendRes.ai_text, () => setAiState('idle'), config, speechSpeed);
              }
            } else {
              setAiState('idle');
            }
          } else {
            setAiState('idle');
          }
        } else {
          throw new Error(backendRes?.message || 'Error processing conversation.');
        }
      } catch (err) {
        console.error('Conversation processing error:', err);
        setErrorMessage(err.message || 'Error communicating with backend server.');
        setAiState('error');
        setTimeout(() => {
          setAiState((current) => (current === 'error' ? 'idle' : current));
        }, 4000);
      }
      return;
    }

    // 4. Start audio recording via MediaRecorder + Web Audio API AnalyserNode
    setErrorMessage('');
    setSpeechNotice('');
    try {
      await audioRecorder.startRecording();
      setAiState('listening');
    } catch (err) {
      console.warn('MediaRecorder error, attempting WebSpeech fallback:', err);
      // Fallback to speechRecognizer if microphone API had an issue
      const langCode = getSpeechRecognitionLanguage(config.language, config.region);
      const started = speechRecognizer.startListening(langCode, {
        onStart: () => setAiState('listening'),
        onResult: (transcript) => {
          if (currentStep !== 'completed') {
            addMessage('user', transcript, '', config.language);
            handleSetupVoiceInput(transcript);
          } else {
            handleSpeechResult(transcript);
          }
        },
        onError: (errMsg) => {
          setErrorMessage(errMsg);
          setAiState('error');
          setTimeout(() => setAiState((c) => (c === 'error' ? 'idle' : c)), 4000);
        },
        onEnd: () => {
          setAiState((c) => (c === 'listening' ? 'idle' : c));
        }
      });
      if (!started) {
        setErrorMessage(err.message || 'Could not access microphone.');
        setAiState('error');
        setTimeout(() => setAiState((c) => (c === 'error' ? 'idle' : c)), 4000);
      }
    }
  };

  // Replay specific message voice audio in its exact language, voice & emotion, with active speechSpeed
  const handleReplayAudio = (text, index, messageLang = null) => {
    if (activePlayingIndex === index) {
      handleStopSpeech();
      return;
    }
    setActivePlayingIndex(index);
    const targetLang = messageLang || config.language;
    speakAI(text, () => setActivePlayingIndex(null), {
      language: targetLang,
      region: config.region,
      voice: config.voice,
      emotion: config.emotion || 'default'
    }, speechSpeed);
  };

  // Clear Chat History Safely
  const handleClearHistory = () => {
    setMessages([]);
  };

  // Save Voice Sample after upload
  const handleSaveVoiceSample = (file) => {
    setUploadedVoiceFile(file);
    setConfig((prev) => ({ ...prev, voice: 'user' }));
    setCurrentStep('completed');
    setAiState('ready');

    const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === config.language) || SUPPORTED_LANGUAGES[0];
    const currentSlang = currentLang.slangs.find((s) => s.id === config.slang) || currentLang.slangs[0];

    const voiceReadyMsg = config.language === 'tamil'
      ? "உங்கள் குரல் மாதிரி வெற்றிகரமாக பதிவேற்றப்பட்டது. இனிமேல் இந்த பயனர் குரல் அமைப்பில் பதில்கள் ஒலிக்கப்படும்."
      : "Your voice sample has been uploaded successfully. Personal voice cloning profile is now active.";
    
    addMessage('ai', voiceReadyMsg, currentSlang.name);
    speakAI(voiceReadyMsg, () => setAiState('idle'), { ...config, voice: 'user' });
  };

  // Remove Voice Sample
  const handleRemoveVoiceSample = () => {
    setUploadedVoiceFile(null);
    setConfig((prev) => ({ ...prev, voice: 'female' }));
    addMessage('ai', 'Voice sample removed. Defaulting to Female AI voice.');
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.id === config.language) || SUPPORTED_LANGUAGES[0];
  const currentSlangObj = currentLangObj.slangs.find((s) => s.id === config.slang) || currentLangObj.slangs[0];

  return (
    <div className={`aurqo-app-root theme-${theme}`}>
      {/* 1. THAMILI Ecosystem Sidebar (Docked on desktop, Off-canvas drawer on mobile) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userName={userName}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        currentConversationId={currentConversationId}
        onSelectConversation={(conv) => {
          handleSelectSavedConversation(conv);
          setIsSidebarOpen(false);
        }}
        onNewConversation={() => {
          handleNewConversation();
          setIsSidebarOpen(false);
        }}
        onNavigate={(section) => {
          if (section !== 'ai_audio') {
            alert(`${section.toUpperCase()} is part of the THAMILI Platform ecosystem. You are currently in the dedicated AI Audio / Audio Generator module.`);
          }
        }}
      />

      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="sidebar-backdrop active" 
          onClick={() => setIsSidebarOpen(false)} 
          aria-hidden="true"
        />
      )}

      {/* 2. Main Platform Layout Container */}
      <div className="aurqo-main-layout">
        {/* Header with status badges, theme toggle, Gopi user profile, and action buttons */}
        <Header
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          onToggleChatDrawer={() => setIsChatDrawerOpen((prev) => !prev)}
          isChatDrawerOpen={isChatDrawerOpen}
          config={config}
          isMuted={isMuted}
          onToggleMute={() => {
            setIsMuted((prev) => {
              const nextMuted = !prev;
              if (nextMuted) {
                handleStopSpeech();
              }
              return nextMuted;
            });
          }}
          onOpenDialectModal={() => setIsDialectModalOpen(true)}
          userName={userName}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          onOpenHistoryMenu={() => setIsHistoryMenuOpen(true)}
          messagesCount={messages.length}
          isVoiceSettingsOpen={isVoiceSettingsOpen}
          onToggleVoiceSettings={() => setIsVoiceSettingsOpen((prev) => !prev)}
        />

        {/* Content Body: Fixed Center AI Stage + WhatsApp Style Chat Panel */}
        <main className={`aurqo-content-body ${hasStartedVoice ? 'conversation-active' : 'hero-active'}`}>
          {hasStartedVoice ? (
            /* CONVERSATION ACTIVE MODE:
               Voice Conversation Box with Integrated Microphone & AI Animation Stage */
            <section className="fixed-center-stage mode-conversation" aria-label="AI Audio Interaction Core">
              <div className="conversation-stage-container">
                <ConversationPanel
                  messages={messages}
                  onClearHistory={handleClearHistory}
                  onRestartConversation={handleRestartConversation}
                  onReplayAudio={handleReplayAudio}
                  activePlayingIndex={activePlayingIndex}
                  currentLanguage={config.language}
                  currentSlang={currentSlangObj.name}
                  onOpenChangeLanguage={() => setIsCompactChangeLangOpen(true)}
                  isCollapsed={false}
                  onSwitchToHero={() => setHasStartedVoice(false)}
                  currentStep={currentStep}
                  config={config}
                  speechSpeed={speechSpeed}
                  onSelectLanguage={handleSelectLanguage}
                  onSelectRegion={handleSelectRegion}
                  onSelectSlang={handleSelectSlang}
                  onSelectVoice={handleSelectVoice}
                  onSelectEmotion={handleSelectEmotion}
                  onSelectSpeed={handleChangeSpeechSpeed}
                  voiceControls={
                    <>
                      {/* Integrated Animation Row (AI Character + Energy Bridge + Central Mic) */}
                      <div className="dock-interactive-row">
                        <div className="dock-character-col">
                          <AICharacter state={aiState} customMessage={errorMessage} emotion={config.emotion || 'default'} />
                        </div>

                        <div className={`dock-connection-bridge hero-connection-bridge bridge-${aiState}`} aria-hidden="true">
                          <div className="bridge-line" />
                          <div className="bridge-pulse-node">
                            <Sparkles size={11} className="bridge-icon" />
                          </div>
                        </div>

                        <div className="dock-mic-col">
                          <CentralMic
                            isListening={aiState === 'listening'}
                            isSpeaking={aiState === 'speaking'}
                            state={aiState}
                            notice={speechNotice}
                            onMicClick={handleMicClick}
                            onStopSpeech={handleStopSpeech}
                          />
                        </div>
                      </div>

                      {/* Realtime Dual-Channel Audio Visualizer Spectrum */}
                      <div className="dock-visualizer-wrapper">
                        <AudioVisualizer 
                          state={aiState} 
                          isListening={aiState === 'listening'} 
                          isSpeaking={aiState === 'speaking'} 
                        />
                      </div>
                    </>
                  }
                />
              </div>
            </section>
          ) : (
            /* HERO SETUP MODE (Before Tap to Speak):
               1. Top Hero Badge
               2. Both Animation Buttons in Center
               3. Realtime Audio Visualizer
               (Zero conversation shown initially, clean hero presence!) */
            <section className="fixed-center-stage mode-hero" aria-label="AI Audio Interaction Core">
              <div className="fixed-stage-inner">
                {/* Brand Center Tag */}
                <div className="center-hero-badge">
                  <span className="hero-badge-title">One AI. <strong>Infinite Possibilities.</strong></span>
                </div>

                {/* DUAL CORE HERO ROW (AI Orb on Left, Central Mic on Right, Energy Bridge in Center) */}
                <div className="hero-interactive-row">
                  {/* Left: Holographic 3D AI Character Orb */}
                  <div className="hero-left-character">
                    <AICharacter state={aiState} customMessage={errorMessage} emotion={config.emotion || 'default'} />
                  </div>

                  {/* Center: Dynamic Energy Connection Bridge */}
                  <div className={`hero-connection-bridge bridge-${aiState}`} aria-hidden="true">
                    <div className="bridge-line" />
                    <div className="bridge-pulse-node">
                      <Sparkles size={11} className="bridge-icon" />
                    </div>
                  </div>

                  {/* Right: Interactive Central Microphone Button */}
                  <div className="hero-right-mic">
                    <CentralMic
                      isListening={aiState === 'listening'}
                      isSpeaking={aiState === 'speaking'}
                      state={aiState}
                      notice={speechNotice}
                      onMicClick={handleMicClick}
                      onStopSpeech={handleStopSpeech}
                    />
                  </div>
                </div>

                {/* Realtime Dual-Channel Audio Visualizer Spectrum */}
                <AudioVisualizer 
                  state={aiState} 
                  isListening={aiState === 'listening'} 
                  isSpeaking={aiState === 'speaking'} 
                />

                {/* Clean Hero Guidance Caption */}
                <div className="hero-tap-guidance-pill">
                  <Sparkles size={12} className="text-cyan" />
                  <span>{speechNotice || (currentStep === 'completed' ? 'Tap to Speak to start voice conversation' : 'Tap to Speak to start')}</span>
                </div>
              </div>
            </section>
          )}

          {/* RIGHT PANEL: VOICE & LANGUAGE SETTINGS (Appears only when 3-line button is clicked) */}
          {isVoiceSettingsOpen && (
            <>
              <div 
                className="voice-settings-backdrop" 
                onClick={() => setIsVoiceSettingsOpen(false)}
                aria-hidden="true"
              />
              <aside 
                className="fixed-settings-sidebar-wrapper animate-slide-in-right" 
                aria-label="Voice & Language Settings Studio"
              >
                <VoiceSelectorControl
                  config={config}
                  currentStep={currentStep}
                  onSetStep={(step) => setCurrentStep(step)}
                  onSelectLanguage={handleSelectLanguage}
                  onSelectRegion={handleSelectRegion}
                  onSelectSlang={handleSelectSlang}
                  onSelectVoice={handleSelectVoice}
                  onSelectEmotion={handleSelectEmotion}
                  onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
                  uploadedVoiceFile={uploadedVoiceFile}
                  onTestVoice={handleTestVoice}
                  onRestartSetup={handleRestartConversation}
                  onSelectQuickPrompt={(promptText) => {
                    setHasStartedVoice(true);
                    handleSpeechResult(promptText);
                  }}
                  isSpeaking={aiState === 'speaking'}
                  speechSpeed={speechSpeed}
                  onChangeSpeechSpeed={handleChangeSpeechSpeed}
                  onClose={() => setIsVoiceSettingsOpen(false)}
                />
              </aside>
            </>
          )}
        </main>
      </div>

      {/* Mobile / Responsive Chat Drawer for Voice Conversation */}
      {isChatDrawerOpen && (
        <div 
          className="mobile-chat-drawer-backdrop" 
          onClick={() => setIsChatDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Voice Conversation Drawer"
        >
          <div className="mobile-chat-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-top-handle" onClick={() => setIsChatDrawerOpen(false)}>
              <div className="mobile-drawer-drag-pill" />
            </div>
            <ConversationPanel
              messages={messages}
              onClearHistory={handleClearHistory}
              onRestartConversation={handleRestartConversation}
              onReplayAudio={handleReplayAudio}
              activePlayingIndex={activePlayingIndex}
              currentLanguage={config.language}
              currentSlang={currentSlangObj.name}
              isDrawerMode={true}
              onCloseDrawer={() => setIsChatDrawerOpen(false)}
              onOpenChangeLanguage={() => {
                setIsChatDrawerOpen(false);
                setIsCompactChangeLangOpen(true);
              }}
              currentStep={currentStep}
              config={config}
              speechSpeed={speechSpeed}
              onSelectLanguage={handleSelectLanguage}
              onSelectRegion={handleSelectRegion}
              onSelectSlang={handleSelectSlang}
              onSelectVoice={handleSelectVoice}
              onSelectEmotion={handleSelectEmotion}
              onSelectSpeed={handleChangeSpeechSpeed}
            />
          </div>
        </div>
      )}

      {/* Compact AURQO History Dropdown / Menu (Opened via ⋮ Three-Dot Button) */}
      <HistoryDropdownMenu
        isOpen={isHistoryMenuOpen}
        onClose={() => setIsHistoryMenuOpen(false)}
        currentConversationId={currentConversationId}
        onSelectConversation={handleSelectSavedConversation}
        onNewConversation={handleNewConversation}
      />

      {/* Compact Change Language Selector Modal */}
      <CompactChangeLanguageModal
        isOpen={isCompactChangeLangOpen}
        onClose={() => setIsCompactChangeLangOpen(false)}
        config={config}
        onApplyLanguageChange={handleApplyCompactLanguageChange}
      />

      {/* Language, Dialect & Emotion Selection 5-Step Wizard Modal */}
      <LanguageDialectModal
        isOpen={isDialectModalOpen}
        onClose={() => setIsDialectModalOpen(false)}
        config={config}
        onCompleteSetup={handleCompleteFullSetup}
        initialStep="language"
      />

      {/* Voice Upload Modal for User Voice Sample */}
      <VoiceUploadModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        uploadedFile={uploadedVoiceFile}
        onSaveVoiceSample={handleSaveVoiceSample}
        onRemoveVoiceSample={handleRemoveVoiceSample}
        currentLanguage={config.language}
      />

      {/* User Profile & Account Settings Modal (Gopi) */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userName={userName}
        onUpdateUserName={handleUpdateUserName}
        config={config}
        onOpenDialectModal={() => setIsDialectModalOpen(true)}
        onRestartConversation={handleRestartConversation}
        totalMessagesCount={messages.length}
      />
    </div>
  );
}
