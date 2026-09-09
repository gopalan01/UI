import React, { useState, useRef, useEffect } from 'react';
import { 
  Globe, 
  MapPin, 
  Radio, 
  Volume2, 
  UploadCloud, 
  Check, 
  Sparkles, 
  Play, 
  RotateCcw, 
  ChevronDown,
  ChevronUp,
  Smile,
  Frown,
  Mic2,
  Zap,
  Wind,
  Heart,
  Flame,
  Sliders,
  User,
  X,
  Lock
} from 'lucide-react';
import { 
  SUPPORTED_LANGUAGES, 
  getVoicesForLanguage, 
  getVoicePreference, 
  SUPPORTED_EMOTIONS,
  getEmotionPreference
} from '../constants/languageConfig';

// Static Lucide Icons for Tone Options (Zero emojis, static & clean UI icons)
const TONE_ICONS = {
  default: Sliders,
  happy: Smile,
  sad: Frown,
  husky: Mic2,
  excitement: Zap,
  calm: Wind,
  romantic: Heart,
  bold: Flame
};

// Localized Voice Labels (Strictly 3 options: Male Voice, Female Voice, Own Voice)
const LOCALIZED_VOICE_LABELS = {
  tamil: {
    male: 'ஆண் குரல் (Male Voice)',
    female: 'பெண் குரல் (Female Voice)',
    user: 'சொந்த குரல் (Own Voice)'
  },
  malayalam: {
    male: 'പുരുഷ ശബ്ദം (Male Voice)',
    female: 'സ്ത്രീ ശബ്ദം (Female Voice)',
    user: 'സ്വന്തം ശബ്ദം (Own Voice)'
  },
  hindi: {
    male: 'पुरुष आवाज़ (Male Voice)',
    female: 'महिला आवाज़ (Female Voice)',
    user: 'अपनी आवाज़ (Own Voice)'
  },
  telugu: {
    male: 'పురుష స్వరం (Male Voice)',
    female: 'స్త్రీ స్వరం (Female Voice)',
    user: 'స్వంత వాయిస్ (Own Voice)'
  },
  kannada: {
    male: 'ಪುರುಷ ಧ್ವನಿ (Male Voice)',
    female: 'ಮಹಿಳಾ ಧ್ವನಿ (Female Voice)',
    user: 'ಸ್ವಂತ ಧ್ವನಿ (Own Voice)'
  },
  bengali: {
    male: 'পুরুষ কণ্ঠ (Male Voice)',
    female: 'নারী কণ্ঠ (Female Voice)',
    user: 'নিজের কণ্ঠ (Own Voice)'
  },
  marathi: {
    male: 'पुरुष आवाज (Male Voice)',
    female: 'स्त्री आवाज (Female Voice)',
    user: 'स्वतःचा आवाज (Own Voice)'
  },
  gujarati: {
    male: 'પુરુષ અવાજ (Male Voice)',
    female: 'સ્ત્રી અવાજ (Female Voice)',
    user: 'પોતાનો અવાજ (Own Voice)'
  },
  spanish: {
    male: 'Voz Masculina',
    female: 'Voz Femenina',
    user: 'Propia Voz (Own Voice)'
  },
  french: {
    male: 'Voix Masculine',
    female: 'Voix Féminine',
    user: 'Propre Voix (Own Voice)'
  },
  german: {
    male: 'Männliche Stimme',
    female: 'Weibliche Stimme',
    user: 'Eigene Stimme (Own Voice)'
  },
  japanese: {
    male: '男性音声 (Male Voice)',
    female: '女性音声 (Female Voice)',
    user: 'カスタム音声 (Own Voice)'
  },
  arabic: {
    male: 'صوت رجالي (Male Voice)',
    female: 'صوت نسائي (Female Voice)',
    user: 'صوت خاص (Own Voice)'
  },
  english: {
    male: 'Male Voice',
    female: 'Female Voice',
    user: 'Own Voice'
  }
};

// Localized Tone Options (Default, Happy, Sad, Husky, Excitement, Calm, Romantic, Bold)
const LOCALIZED_TONES = {
  tamil: {
    default: 'இயல்பான நிலை (Default)',
    happy: 'மகிழ்ச்சி (Happy)',
    sad: 'அமைதி (Sad)',
    husky: 'கம்பீரம் (Husky)',
    excitement: 'அதி தீவிர உற்சாகம் (Excitement)',
    calm: 'அமைதி (Calm)',
    romantic: 'காதல் உணர்வு (Romantic)',
    bold: 'அதிரடி (Bold)'
  },
  malayalam: {
    default: 'സാധാരണ ശൈലി (Default)',
    happy: 'സന്തോഷം (Happy)',
    sad: 'ശാന്തം (Sad)',
    husky: 'ഗാംഭീര്യം (Husky)',
    excitement: 'ആവേശം (Excitement)',
    calm: 'പ്രശാന്തം (Calm)',
    romantic: 'പ്രണയാർദ്രം (Romantic)',
    bold: 'ധീരം (Bold)'
  },
  hindi: {
    default: 'सामान्य (Default)',
    happy: 'प्रसन्न (Happy)',
    sad: 'शांत / भावुक (Sad)',
    husky: 'गंभीर (Husky)',
    excitement: 'उत्साहित (Excitement)',
    calm: 'शांत (Calm)',
    romantic: 'रोमांटिक (Romantic)',
    bold: 'दमदार (Bold)'
  },
  telugu: {
    default: 'సాధారణ (Default)',
    happy: 'సంతోషం (Happy)',
    sad: 'బాధ (Sad)',
    husky: 'గంభీరమైన (Husky)',
    excitement: 'ఉత్సాహం (Excitement)',
    calm: 'ప్రశాంతం (Calm)',
    romantic: 'శృంగార (Romantic)',
    bold: 'సాహసోపేత (Bold)'
  },
  kannada: {
    default: 'ಸಾಮಾನ್ಯ (Default)',
    happy: 'ಸಂತೋಷ (Happy)',
    sad: 'ಶಾಂತ (Sad)',
    husky: 'ಗಂಭೀರ (Husky)',
    excitement: 'ಉತ್ಸಾಹ (Excitement)',
    calm: 'ಶಾಂತಿಯುತ (Calm)',
    romantic: 'ರೋಮ್ಯಾಂಟಿಕ್ (Romantic)',
    bold: 'ಧೈರ್ಯಶಾಲಿ (Bold)'
  },
  bengali: {
    default: 'স্বাভাবিক (Default)',
    happy: 'আনন্দিত (Happy)',
    sad: 'শান্ত (Sad)',
    husky: 'ভারী কণ্ঠ (Husky)',
    excitement: 'উত্তেজিত (Excitement)',
    calm: 'প্রশান্ত (Calm)',
    romantic: 'রোমান্টিক (Romantic)',
    bold: 'দৃঢ় (Bold)'
  },
  marathi: {
    default: 'सामान्य (Default)',
    happy: 'आनंदी (Happy)',
    sad: 'शांत (Sad)',
    husky: 'खर्जातला (Husky)',
    excitement: 'उत्साही (Excitement)',
    calm: 'शांत (Calm)',
    romantic: 'रोमँटिक (Romantic)',
    bold: 'दमदार (Bold)'
  },
  gujarati: {
    default: 'સામાન્ય (Default)',
    happy: 'ખુશ (Happy)',
    sad: 'ઉદાસ (Sad)',
    husky: 'ગંભીર (Husky)',
    excitement: 'ઉત્સાહી (Excitement)',
    calm: 'શાંત (Calm)',
    romantic: 'રોમેન્ટિક (Romantic)',
    bold: 'બોલ્ડ (Bold)'
  },
  spanish: {
    default: 'Por Defecto (Default)',
    happy: 'Feliz (Happy)',
    sad: 'Melancólico (Sad)',
    husky: 'Profundo (Husky)',
    excitement: 'Emocionado (Excitement)',
    calm: 'Tranquilo (Calm)',
    romantic: 'Romántico (Romantic)',
    bold: 'Audaz (Bold)'
  },
  french: {
    default: 'Par Défaut (Default)',
    happy: 'Joyeux (Happy)',
    sad: 'Mélancolique (Sad)',
    husky: 'Grave (Husky)',
    excitement: 'Enthousiaste (Excitement)',
    calm: 'Calme (Calm)',
    romantic: 'Romantique (Romantic)',
    bold: 'Audacieux (Bold)'
  },
  german: {
    default: 'Standard (Default)',
    happy: 'Fröhlich (Happy)',
    sad: 'Sanft (Sad)',
    husky: 'Rauchig (Husky)',
    excitement: 'Begeistert (Excitement)',
    calm: 'Ruhig (Calm)',
    romantic: 'Romantisch (Romantic)',
    bold: 'Kräftig (Bold)'
  },
  japanese: {
    default: 'デフォルト (Default)',
    happy: '明るい (Happy)',
    sad: '穏やか (Sad)',
    husky: 'ハスキー (Husky)',
    excitement: 'エキサイト (Excitement)',
    calm: '落ち着いた (Calm)',
    romantic: 'ロマンチック (Romantic)',
    bold: '力強い (Bold)'
  },
  arabic: {
    default: 'افتراضي (Default)',
    happy: 'سعيد (Happy)',
    sad: 'حزين (Sad)',
    husky: 'عميق (Husky)',
    excitement: 'حماسي (Excitement)',
    calm: 'هادئ (Calm)',
    romantic: 'رومانسي (Romantic)',
    bold: 'جريء (Bold)'
  },
  english: {
    default: 'Default',
    happy: 'Happy',
    sad: 'Sad',
    husky: 'Husky',
    excitement: 'Excitement',
    calm: 'Calm',
    romantic: 'Romantic',
    bold: 'Bold'
  }
};

// Localized Speech Speed Controls
const LOCALIZED_SPEED = {
  tamil: {
    title: 'குரல் வேகம் (Speech Speed):',
    sublabel: 'பேசும் வேகத்தை தேர்ந்தெடுக்கவும்',
    slow: 'பொறுமையாக (Slow)',
    normal: 'இயல்பு (Normal)',
    fast: 'வேகம் (Fast)'
  },
  malayalam: {
    title: 'സംസാര വേഗത (Speech Speed):',
    sublabel: 'ശബ്ദത്തിന്റെ വേഗത തിരഞ്ഞെടുക്കുക',
    slow: 'പതുക്കെ (Slow)',
    normal: 'സാധാരണ (Normal)',
    fast: 'വേഗത്തിൽ (Fast)'
  },
  hindi: {
    title: 'बोलने की गति (Speech Speed):',
    sublabel: 'गति का चयन करें',
    slow: 'धीमी (Slow)',
    normal: 'सामान्य (Normal)',
    fast: 'तेज़ (Fast)'
  },
  telugu: {
    title: 'వాయిస్ వేగం (Speech Speed):',
    sublabel: 'మాట్లాడే వేగం ఎంచుకోండి',
    slow: 'నెమ్మదిగా (Slow)',
    normal: 'సాధారణ (Normal)',
    fast: 'వేగంగా (Fast)'
  },
  kannada: {
    title: 'ಧ್ವನಿ ವೇಗ (Speech Speed):',
    sublabel: 'ಮಾತನಾಡುವ ವೇಗ ಆಯ್ಕೆಮಾಡಿ',
    slow: 'ನಿಧಾನ (Slow)',
    normal: 'ಸಾಮಾನ್ಯ (Normal)',
    fast: 'ವೇಗ (Fast)'
  },
  bengali: {
    title: 'কথা বলার গতি (Speech Speed):',
    sublabel: 'গতি নির্বাচন করুন',
    slow: 'ধীর (Slow)',
    normal: 'স্বাভাবিক (Normal)',
    fast: 'দ্রুত (Fast)'
  },
  marathi: {
    title: 'बोलण्याचा वेग (Speech Speed):',
    sublabel: 'गती निवडा',
    slow: 'हळू (Slow)',
    normal: 'सामान्य (Normal)',
    fast: 'जलद (Fast)'
  },
  gujarati: {
    title: 'બોલવાની ઝડપ (Speech Speed):',
    sublabel: 'ઝડપ પસંદ કરો',
    slow: 'ધીમી (Slow)',
    normal: 'સામાન્ય (Normal)',
    fast: 'ઝડપી (Fast)'
  },
  spanish: {
    title: 'Velocidad de voz (Speech Speed):',
    sublabel: 'Selecciona el ritmo de voz',
    slow: 'Lento (Slow)',
    normal: 'Normal',
    fast: 'Rápido (Fast)'
  },
  french: {
    title: 'Vitesse de parole (Speech Speed):',
    sublabel: 'Sélectionnez le rythme vocal',
    slow: 'Lent (Slow)',
    normal: 'Normal',
    fast: 'Rapide (Fast)'
  },
  german: {
    title: 'Sprechgeschwindigkeit (Speech Speed):',
    sublabel: 'Sprechtempo auswählen',
    slow: 'Langsam (Slow)',
    normal: 'Normal',
    fast: 'Schnell (Fast)'
  },
  japanese: {
    title: '音声速度 (Speech Speed):',
    sublabel: '発話速度を選択',
    slow: '遅い (Slow)',
    normal: '標準 (Normal)',
    fast: '速い (Fast)'
  },
  arabic: {
    title: 'سرعة الصوت (Speech Speed):',
    sublabel: 'اختر سرعة التحدث',
    slow: 'بطيء (Slow)',
    normal: 'عادي (Normal)',
    fast: 'سريع (Fast)'
  },
  english: {
    title: 'Speech Speed:',
    sublabel: 'Select AI Speaking Pace',
    slow: 'Slow',
    normal: 'Normal',
    fast: 'Fast'
  }
};

export default function VoiceSelectorControl({
  config,
  currentStep = 'language',
  onSetStep,
  onSelectLanguage,
  onSelectRegion,
  onSelectSlang,
  onSelectVoice,
  onSelectEmotion,
  onOpenVoiceModal,
  uploadedVoiceFile,
  onTestVoice,
  onRestartSetup,
  onSelectQuickPrompt,
  isSpeaking = false,
  speechSpeed = 'normal',
  onChangeSpeechSpeed,
  onClose
}) {
  // Main settings container expanded by default for fixed right sidebar
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(true);

  // Step progression ranks:
  // 1: Language -> 2: Country -> 3: Slang -> 4: Voice -> 5: Tone -> 6: Completed
  const STEP_RANKS = {
    language: 1,
    region: 2,
    slang: 3,
    voice: 4,
    emotion: 5,
    completed: 6
  };

  const currentRank = STEP_RANKS[currentStep] || 1;

  // Step unlock states based strictly on prior step selection:
  const isLanguageUnlocked = true;
  const isRegionUnlocked = currentRank >= 2;
  const isSlangUnlocked = currentRank >= 3;
  const isVoiceUnlocked = currentRank >= 4;
  const isEmotionUnlocked = currentRank >= 5;

  // Active open dropdown: 'language' | 'region' | 'slang' | 'voice' | 'emotion' | null
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownGridRef = useRef(null);

  // Close open dropdown when clicking anywhere outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownGridRef.current && !dropdownGridRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleDropdown = (name) => {
    if (name === 'region' && !isRegionUnlocked) return;
    if (name === 'slang' && !isSlangUnlocked) return;
    if (name === 'voice' && !isVoiceUnlocked) return;
    if (name === 'emotion' && !isEmotionUnlocked) return;

    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  // 1. Language Selected -> Unlocks Country & automatically opens Country dropdown
  const handleLanguagePick = (langId) => {
    onSelectLanguage(langId);
    if (onSetStep) onSetStep('region');
    setTimeout(() => {
      setOpenDropdown('region');
    }, 60);
  };

  // 2. Country Selected -> Unlocks Slang & automatically opens Slang dropdown
  const handleRegionPick = (regId) => {
    onSelectRegion(regId);
    if (onSetStep) onSetStep('slang');
    setTimeout(() => {
      setOpenDropdown('slang');
    }, 60);
  };

  // 3. Slang Selected -> Unlocks Voice & automatically opens Voice dropdown
  const handleSlangPick = (slangId) => {
    onSelectSlang(slangId);
    if (onSetStep) onSetStep('voice');
    setTimeout(() => {
      setOpenDropdown('voice');
    }, 60);
  };

  // 4. Voice Selected -> Unlocks Tone & automatically opens Tone dropdown
  const handleVoicePick = (vid) => {
    onSelectVoice(vid);
    if (onSetStep) onSetStep('emotion');
    const isUserVoice = vid === 'user';
    if (isUserVoice && !uploadedVoiceFile) {
      setOpenDropdown(null);
      if (onOpenVoiceModal) onOpenVoiceModal();
    } else {
      setTimeout(() => {
        setOpenDropdown('emotion');
      }, 60);
    }
  };

  // 5. Tone Selected -> All 5 steps completed!
  const handleEmotionPick = (emoId) => {
    onSelectEmotion(emoId);
    if (onSetStep) onSetStep('completed');
    setOpenDropdown(null);
  };

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === config.language) || SUPPORTED_LANGUAGES[0];
  const currentRegion = currentLang.regions.find((r) => r.id === config.region) || currentLang.regions[0];
  const currentSlang = currentLang.slangs.find((s) => s.id === config.slang) || currentLang.slangs[0];
  const currentVoiceList = getVoicesForLanguage(config.language);
  const currentVoice = getVoicePreference(config.language, config.voice);
  const currentEmotion = getEmotionPreference(config.emotion || 'default');

  // Localized string helpers
  const voiceLangDict = LOCALIZED_VOICE_LABELS[config.language] || LOCALIZED_VOICE_LABELS.english;
  const toneLangDict = LOCALIZED_TONES[config.language] || LOCALIZED_TONES.english;
  const speedTexts = LOCALIZED_SPEED[config.language] || LOCALIZED_SPEED.english;

  const currentVoiceLabel = voiceLangDict[currentVoice.id] || voiceLangDict[currentVoice.gender] || currentVoice.name;
  const currentEmotionLabel = toneLangDict[currentEmotion.id] || currentEmotion.name;
  const CurrentEmotionIcon = TONE_ICONS[currentEmotion.id] || Sliders;

  // 3 Standard Voices: Male Voice, Female Voice, Own Voice
  const canonicalVoices = ['male', 'female', 'user'].map((vid) => {
    const existingObj = currentVoiceList.find((v) => v.id === vid || v.gender === vid) || {
      id: vid,
      gender: vid,
      name: vid === 'male' ? 'Male Voice' : vid === 'female' ? 'Female Voice' : 'Own Voice'
    };
    return {
      ...existingObj,
      id: vid,
      displayName: voiceLangDict[vid] || existingObj.name
    };
  });

  // Quick prompts
  const getQuickPrompts = () => {
    if (config.language === 'tamil') {
      if (config.slang === 'kongu_tamil') {
        return [
          { id: 'p1', text: 'சாப்பிட்டீங்களாங்ணா?' },
          { id: 'p2', text: 'கொங்கு நாடு பத்தி சொல்லுங்கண்ணா' },
          { id: 'p3', text: 'ஒரு கொங்கு ஜோக் சொல்லுங்க' }
        ];
      }
      if (config.slang === 'chennai_tamil') {
        return [
          { id: 'p1', text: 'எப்படி இருக்க பா?' },
          { id: 'p2', text: 'சென்னை பத்தி சொல்லு பா' },
          { id: 'p3', text: 'ஒரு மெட்ராஸ் ஜோக் சொல்லு பா' }
        ];
      }
      if (config.slang === 'madurai_tamil') {
        return [
          { id: 'p1', text: 'எப்படி இருக்கீங்கயா?' },
          { id: 'p2', text: 'மதுரை பத்தி சொல்லுங்கயா' },
          { id: 'p3', text: 'ஒரு மதுரை ஜோக் சொல்லுங்க' }
        ];
      }
      if (config.slang === 'nellai_tamil') {
        return [
          { id: 'p1', text: 'ஏலே நல்லா இருக்கீங்களா?' },
          { id: 'p2', text: 'நெல்லை பத்தி சொல்லுங்கவே' },
          { id: 'p3', text: 'ஒரு நெல்லை ஜோக் சொல்லுவே' }
        ];
      }
      return [
        { id: 'p1', text: 'ஒரு ஜோக் சொல்லுங்க' },
        { id: 'p2', text: 'தமிழி பத்தி சொல்லு' },
        { id: 'p3', text: 'எப்படி இருக்கீங்க?' }
      ];
    }
    if (config.language === 'hindi') {
      return [
        { id: 'p1', text: 'एक मजेदार चुटकुला सुनाओ' },
        { id: 'p2', text: 'தமிழி (THAMILI) के बारे में बताओ' },
        { id: 'p3', text: 'क्या हाल चाल है?' }
      ];
    }
    if (config.language === 'telugu') {
      return [
        { id: 'p1', text: 'ఒక మంచి జోక్ చెప్పు' },
        { id: 'p2', text: 'தமிழி (THAMILI) గురించి చెప్పు' },
        { id: 'p3', text: 'ఎలా ఉన్నారు?' }
      ];
    }
    if (config.language === 'malayalam') {
      return [
        { id: 'p1', text: 'ഒരു തമാശ പറയൂ' },
        { id: 'p2', text: 'தமிழி (THAMILI) കുറിച്ച് പറയൂ' },
        { id: 'p3', text: 'സുഖമാണോ?' }
      ];
    }
    return [
      { id: 'p1', text: 'Tell me a funny joke' },
      { id: 'p2', text: 'What is THAMILI AI?' },
      { id: 'p3', text: 'How are you doing?' }
    ];
  };

  const quickPrompts = getQuickPrompts();

  // Reusable Speech Speed Selector
  // Unique & Simple Minimalist Speech Speed Segmented Control
  const renderSpeechSpeedBox = () => (
    <div className="simple-speed-control" id="speech-speed-container">
      <div className="simple-speed-header">
        <div className="simple-speed-label-group">
          <Zap size={13} className="text-cyan" />
          <span className="simple-speed-title">Speech Speed / பேச்சு வேகம்</span>
        </div>
        <span className="simple-speed-current-tag">
          {speechSpeed === 'slow' ? '0.6x' : speechSpeed === 'fast' ? '1.4x' : '1.0x'}
        </span>
      </div>

      <div className="simple-speed-track" role="group" aria-label="Speech Speed Selector">
        <button
          type="button"
          id="speed-btn-slow"
          className={`simple-speed-pill ${speechSpeed === 'slow' ? 'is-active' : ''}`}
          onClick={() => onChangeSpeechSpeed && onChangeSpeechSpeed('slow')}
          title="Slow speed: 0.6x"
        >
          <span className="pill-multiplier">0.6x</span>
          <span className="pill-name">{speedTexts.slow ? speedTexts.slow.split(' ')[0] : 'Slow'}</span>
        </button>

        <button
          type="button"
          id="speed-btn-normal"
          className={`simple-speed-pill ${speechSpeed === 'normal' ? 'is-active' : ''}`}
          onClick={() => onChangeSpeechSpeed && onChangeSpeechSpeed('normal')}
          title="Normal speed: 1.0x (Default)"
        >
          <span className="pill-multiplier">1.0x</span>
          <span className="pill-name">{speedTexts.normal ? speedTexts.normal.split(' ')[0] : 'Normal'}</span>
        </button>

        <button
          type="button"
          id="speed-btn-fast"
          className={`simple-speed-pill ${speechSpeed === 'fast' ? 'is-active' : ''}`}
          onClick={() => onChangeSpeechSpeed && onChangeSpeechSpeed('fast')}
          title="Fast speed: 1.4x"
        >
          <span className="pill-multiplier">1.4x</span>
          <span className="pill-name">{speedTexts.fast ? speedTexts.fast.split(' ')[0] : 'Fast'}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className={`voice-language-collapsible-wrapper ${isSettingsExpanded ? 'wrapper-expanded' : 'wrapper-collapsed'}`} aria-label="Voice & Language Settings Panel">
      {/* 1. CLEAN PANEL HEADER (Dropdown & dropup arrows removed) */}
      <div
        id="voice-language-settings-panel-header"
        className="collapsible-settings-header panel-clean-header"
      >
        <div className="settings-header-left">
          <div className="settings-header-icon-box">
            <Sliders size={15} className="settings-header-icon" />
          </div>
          <span className="settings-header-title">Voice & Language Settings</span>
          <span className="settings-header-summary-tag">
            {currentLang.flag} {currentLang.name} • {currentRegion.name.split(' (')[0]} • {currentSlang.name} • {currentVoiceLabel.split(' ')[0]}
          </span>
        </div>

        {/* Clean Close Button to dismiss settings */}
        {onClose && (
          <button
            type="button"
            className="settings-panel-close-btn"
            onClick={onClose}
            title="Close Voice & Language Settings"
            aria-label="Close Settings Panel"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* 2. EXPANDED SETTINGS CONTENT BODY */}
      <div 
        id="voice-settings-collapsible-content"
        className={`collapsible-settings-body ${isSettingsExpanded ? 'body-expanded' : 'body-collapsed'}`}
        aria-hidden={!isSettingsExpanded}
      >
        <div className="neat-voice-studio-card" aria-label="Voice & Language Studio Selection">
          {/* Top Quick Actions Bar (Test Voice & Restart) */}
          <div className="studio-navbar-header">
            <div className="studio-header-summary">
              <span className="studio-summary-chip">
                {currentLang.flag} <strong>{currentLang.name}</strong> ({currentLang.nativeName})
              </span>
              <span className="studio-summary-sub">
                {currentRegion.name.split(' (')[0]} • {currentSlang.name}
              </span>
            </div>

            <div className="studio-quick-actions">
              <button
                type="button"
                id="test-voice-btn"
                className={`studio-action-button btn-test-live ${isSpeaking ? 'is-speaking-anim' : ''}`}
                onClick={onTestVoice}
                title="Hear live voice sample in selected dialect & emotion"
              >
                {isSpeaking ? (
                  <>
                    <Volume2 size={12} className="animate-pulse" />
                    <span>Speaking...</span>
                  </>
                ) : (
                  <>
                    <Play size={11} />
                    <span>Test Voice</span>
                  </>
                )}
              </button>

              <button
                type="button"
                id="restart-voice-flow-btn"
                className="studio-action-button btn-restart-live"
                onClick={onRestartSetup}
                title="Restart Selection to Defaults"
              >
                <RotateCcw size={11} />
                <span>Restart</span>
              </button>
            </div>
          </div>

          {/* 3. NEAT 5-DROPDOWN GRID: STEP-BY-STEP SEQUENTIAL SELECTION */}
          {/* Rule: Language -> Country -> Slang -> Voice -> Tone */}
          <div className="voice-dropdowns-grid" ref={dropdownGridRef}>
            {/* DROPDOWN 1: SELECT LANGUAGE (STEP 1 - Always selectable) */}
            <div className={`voice-dropdown-box ${openDropdown === 'language' ? 'is-active-dropdown' : ''} ${currentRank === 1 ? 'is-current-step' : ''}`}>
              <div className="voice-dropdown-label-row">
                <span className="voice-dropdown-label">
                  <span className={`step-badge-circle ${currentRank > 1 ? 'is-done' : 'is-active'}`}>1</span>
                  <Globe size={13} className="text-purple" />
                  <span>Language / மொழி</span>
                </span>
                <span className="step-state-tag">Step 1</span>
              </div>
              <button
                type="button"
                id="dropdown-btn-language"
                className={`voice-dropdown-trigger ${openDropdown === 'language' ? 'trigger-open' : ''}`}
                onClick={() => toggleDropdown('language')}
                aria-expanded={openDropdown === 'language'}
                title="Step 1: Choose Language"
              >
                <div className="dropdown-trigger-content">
                  <span className="dropdown-flag-icon">{currentLang.flag}</span>
                  <span className="dropdown-trigger-title">{currentLang.name}</span>
                  <span className="dropdown-trigger-sub">({currentLang.nativeName})</span>
                </div>
                <span className="dropdown-arrow-icon" aria-hidden="true">
                  {openDropdown === 'language' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>

              {openDropdown === 'language' && (
                <div className="voice-dropdown-menu animate-fade-in" id="menu-language">
                  <div className="dropdown-menu-header">Step 1: Select Language ({SUPPORTED_LANGUAGES.length})</div>
                  <div className="dropdown-menu-scroll">
                    {SUPPORTED_LANGUAGES.map((lang) => {
                      const isSelected = config.language === lang.id;
                      return (
                        <button
                          key={lang.id}
                          type="button"
                          className={`voice-dropdown-option ${isSelected ? 'option-selected' : ''}`}
                          onClick={() => handleLanguagePick(lang.id)}
                        >
                          <span className="option-flag">{lang.flag}</span>
                          <div className="option-details">
                            <span className="option-primary">{lang.name}</span>
                            <span className="option-secondary">{lang.nativeName}</span>
                          </div>
                          {isSelected && <Check size={14} className="option-check text-emerald" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* DROPDOWN 2: SELECT COUNTRY / REGION (STEP 2 - Unlocks only after Language is selected) */}
            <div className={`voice-dropdown-box ${openDropdown === 'region' ? 'is-active-dropdown' : ''} ${!isRegionUnlocked ? 'is-locked' : currentRank === 2 ? 'is-current-step' : ''}`}>
              <div className="voice-dropdown-label-row">
                <span className="voice-dropdown-label">
                  <span className={`step-badge-circle ${currentRank > 2 ? 'is-done' : currentRank === 2 ? 'is-active' : 'is-locked'}`}>2</span>
                  <MapPin size={13} className="text-blue" />
                  <span>Country / நாடு</span>
                </span>
                {!isRegionUnlocked ? (
                  <span className="step-locked-tag">
                    <Lock size={10} /> Locked (Select Language)
                  </span>
                ) : (
                  <span className="step-state-tag">Step 2</span>
                )}
              </div>
              <button
                type="button"
                id="dropdown-btn-region"
                className={`voice-dropdown-trigger ${openDropdown === 'region' ? 'trigger-open' : ''} ${!isRegionUnlocked ? 'is-locked' : ''}`}
                onClick={() => toggleDropdown('region')}
                disabled={!isRegionUnlocked}
                aria-expanded={openDropdown === 'region'}
                title={isRegionUnlocked ? "Step 2: Choose Country" : "Select Language first to unlock Country"}
              >
                <div className="dropdown-trigger-content">
                  <MapPin size={13} className="text-blue" />
                  <span className="dropdown-trigger-title">{currentRegion.name}</span>
                </div>
                <span className="dropdown-arrow-icon" aria-hidden="true">
                  {!isRegionUnlocked ? <Lock size={13} className="text-muted" /> : openDropdown === 'region' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>

              {isRegionUnlocked && openDropdown === 'region' && (
                <div className="voice-dropdown-menu animate-fade-in" id="menu-region">
                  <div className="dropdown-menu-header">Step 2: Select Country for {currentLang.name}</div>
                  <div className="dropdown-menu-scroll">
                    {currentLang.regions.map((reg) => {
                      const isSelected = (config.region || currentRegion.id) === reg.id;
                      return (
                        <button
                          key={reg.id}
                          type="button"
                          className={`voice-dropdown-option ${isSelected ? 'option-selected' : ''}`}
                          onClick={() => handleRegionPick(reg.id)}
                        >
                          <MapPin size={13} className="text-blue" />
                          <div className="option-details">
                            <span className="option-primary">{reg.name.split(' (')[0]}</span>
                            {reg.name.includes('(') && (
                              <span className="option-secondary">({reg.name.split('(')[1]}</span>
                            )}
                          </div>
                          {isSelected && <Check size={14} className="option-check text-emerald" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* DROPDOWN 3: SELECT SLANG / DIALECT (STEP 3 - Unlocks only after Country is selected) */}
            <div className={`voice-dropdown-box ${openDropdown === 'slang' ? 'is-active-dropdown' : ''} ${!isSlangUnlocked ? 'is-locked' : currentRank === 3 ? 'is-current-step' : ''}`}>
              <div className="voice-dropdown-label-row">
                <span className="voice-dropdown-label">
                  <span className={`step-badge-circle ${currentRank > 3 ? 'is-done' : currentRank === 3 ? 'is-active' : 'is-locked'}`}>3</span>
                  <Radio size={13} className="text-cyan" />
                  <span>Slang / வழக்கு</span>
                </span>
                {!isSlangUnlocked ? (
                  <span className="step-locked-tag">
                    <Lock size={10} /> Locked (Select Country)
                  </span>
                ) : (
                  <span className="step-state-tag">Step 3</span>
                )}
              </div>
              <button
                type="button"
                id="dropdown-btn-slang"
                className={`voice-dropdown-trigger ${openDropdown === 'slang' ? 'trigger-open' : ''} ${!isSlangUnlocked ? 'is-locked' : ''}`}
                onClick={() => toggleDropdown('slang')}
                disabled={!isSlangUnlocked}
                aria-expanded={openDropdown === 'slang'}
                title={isSlangUnlocked ? "Step 3: Choose Slang / Dialect" : "Select Country first to unlock Slang"}
              >
                <div className="dropdown-trigger-content">
                  <Radio size={13} className="text-cyan" />
                  <span className="dropdown-trigger-title">{currentSlang.name}</span>
                </div>
                <span className="dropdown-arrow-icon" aria-hidden="true">
                  {!isSlangUnlocked ? <Lock size={13} className="text-muted" /> : openDropdown === 'slang' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>

              {isSlangUnlocked && openDropdown === 'slang' && (
                <div className="voice-dropdown-menu animate-fade-in" id="menu-slang">
                  <div className="dropdown-menu-header">Step 3: {currentLang.name} Dialect / Slang ({currentLang.slangs.length})</div>
                  <div className="dropdown-menu-scroll">
                    {currentLang.slangs.map((slang) => {
                      const isSelected = (config.slang || currentSlang.id) === slang.id;
                      return (
                        <button
                          key={slang.id}
                          type="button"
                          className={`voice-dropdown-option ${isSelected ? 'option-selected' : ''}`}
                          onClick={() => handleSlangPick(slang.id)}
                        >
                          <Radio size={13} className="text-cyan" />
                          <div className="option-details">
                            <span className="option-primary">{slang.name}</span>
                            <span className="option-secondary">{slang.badge}</span>
                          </div>
                          {isSelected && <Check size={14} className="option-check text-emerald" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* DROPDOWN 4: SELECT VOICE (STEP 4 - Unlocks only after Slang is selected) */}
            <div className={`voice-dropdown-box ${openDropdown === 'voice' ? 'is-active-dropdown' : ''} ${!isVoiceUnlocked ? 'is-locked' : currentRank === 4 ? 'is-current-step' : ''}`}>
              <div className="voice-dropdown-label-row">
                <span className="voice-dropdown-label">
                  <span className={`step-badge-circle ${currentRank > 4 ? 'is-done' : currentRank === 4 ? 'is-active' : 'is-locked'}`}>4</span>
                  <Volume2 size={13} className="text-emerald" />
                  <span>Voice / குரல்</span>
                </span>
                {!isVoiceUnlocked ? (
                  <span className="step-locked-tag">
                    <Lock size={10} /> Locked (Select Slang)
                  </span>
                ) : (
                  <span className="step-state-tag">Step 4</span>
                )}
              </div>
              <button
                type="button"
                id="dropdown-btn-voice"
                className={`voice-dropdown-trigger ${openDropdown === 'voice' ? 'trigger-open' : ''} ${!isVoiceUnlocked ? 'is-locked' : ''}`}
                onClick={() => toggleDropdown('voice')}
                disabled={!isVoiceUnlocked}
                aria-expanded={openDropdown === 'voice'}
                title={isVoiceUnlocked ? "Step 4: Choose Voice Model" : "Select Slang first to unlock Voice"}
              >
                <div className="dropdown-trigger-content">
                  {config.voice === 'user' ? (
                    <UploadCloud size={14} className="text-emerald" />
                  ) : config.voice === 'male' ? (
                    <User size={14} className="text-blue" />
                  ) : (
                    <User size={14} className="text-purple" />
                  )}
                  <span className="dropdown-trigger-title">{currentVoiceLabel}</span>
                  {config.voice === 'user' && uploadedVoiceFile && (
                    <span className="dropdown-ready-tag">Ready</span>
                  )}
                </div>
                <span className="dropdown-arrow-icon" aria-hidden="true">
                  {!isVoiceUnlocked ? <Lock size={13} className="text-muted" /> : openDropdown === 'voice' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>

              {isVoiceUnlocked && openDropdown === 'voice' && (
                <div className="voice-dropdown-menu animate-fade-in" id="menu-voice">
                  <div className="dropdown-menu-header">Step 4: Select Voice Model</div>
                  <div className="dropdown-menu-scroll">
                    {canonicalVoices.map((v) => {
                      const isSelected = config.voice === v.id || currentVoice.id === v.id;
                      const isUserVoice = v.id === 'user';
                      return (
                        <button
                          key={v.id}
                          type="button"
                          className={`voice-dropdown-option ${isSelected ? 'option-selected' : ''}`}
                          onClick={() => handleVoicePick(v.id)}
                        >
                          {isUserVoice ? (
                            <UploadCloud size={14} className="text-emerald" />
                          ) : v.id === 'male' ? (
                            <User size={14} className="text-blue" />
                          ) : (
                            <User size={14} className="text-purple" />
                          )}
                          <div className="option-details">
                            <span className="option-primary">{v.displayName}</span>
                            {isUserVoice && (
                              <span className="option-secondary">
                                {uploadedVoiceFile ? `Sample: ${uploadedVoiceFile.name.slice(0, 15)}` : 'Click to record or upload voice sample'}
                              </span>
                            )}
                          </div>
                          {isSelected && <Check size={14} className="option-check text-emerald" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* DROPDOWN 5: SELECT TONE / EMOTION (STEP 5 - Unlocks only after Voice is selected) */}
            <div className={`voice-dropdown-box ${openDropdown === 'emotion' ? 'is-active-dropdown' : ''} ${!isEmotionUnlocked ? 'is-locked' : currentRank === 5 ? 'is-current-step' : ''}`}>
              <div className="voice-dropdown-label-row">
                <span className="voice-dropdown-label">
                  <span className={`step-badge-circle ${currentRank > 5 ? 'is-done' : currentRank === 5 ? 'is-active' : 'is-locked'}`}>5</span>
                  <Sliders size={13} className="text-amber" />
                  <span>Tone / பாணி</span>
                </span>
                {!isEmotionUnlocked ? (
                  <span className="step-locked-tag">
                    <Lock size={10} /> Locked (Select Voice)
                  </span>
                ) : (
                  <span className="step-state-tag">Step 5</span>
                )}
              </div>
              <button
                type="button"
                id="dropdown-btn-emotion"
                className={`voice-dropdown-trigger ${openDropdown === 'emotion' ? 'trigger-open' : ''} ${!isEmotionUnlocked ? 'is-locked' : ''}`}
                onClick={() => toggleDropdown('emotion')}
                disabled={!isEmotionUnlocked}
                aria-expanded={openDropdown === 'emotion'}
                title={isEmotionUnlocked ? "Step 5: Choose Voice Tone" : "Select Voice first to unlock Tone"}
              >
                <div className="dropdown-trigger-content">
                  <CurrentEmotionIcon size={14} className="text-amber" />
                  <span className="dropdown-trigger-title">{currentEmotionLabel}</span>
                </div>
                <span className="dropdown-arrow-icon" aria-hidden="true">
                  {!isEmotionUnlocked ? <Lock size={13} className="text-muted" /> : openDropdown === 'emotion' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>

              {isEmotionUnlocked && openDropdown === 'emotion' && (
                <div className="voice-dropdown-menu animate-fade-in" id="menu-emotion">
                  <div className="dropdown-menu-header">Step 5: Select Voice Tone ({SUPPORTED_EMOTIONS.length})</div>
                  <div className="dropdown-menu-scroll">
                    {SUPPORTED_EMOTIONS.map((emo) => {
                      const isSelected = (config.emotion || 'default') === emo.id;
                      const ToneIcon = TONE_ICONS[emo.id] || Sliders;
                      const localizedLabel = toneLangDict[emo.id] || emo.name;
                      return (
                        <button
                          key={emo.id}
                          type="button"
                          className={`voice-dropdown-option ${isSelected ? 'option-selected' : ''}`}
                          onClick={() => handleEmotionPick(emo.id)}
                        >
                          <ToneIcon size={14} className="text-amber" />
                          <div className="option-details">
                            <span className="option-primary">{localizedLabel}</span>
                          </div>
                          {isSelected && <Check size={14} className="option-check text-emerald" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 4. SPEECH SPEED CONTROLS */}
          {renderSpeechSpeedBox()}

          {/* 5. QUICK CONVERSATIONAL PROMPTS BAR */}
          <div className="studio-prompts-bar">
            <div className="prompts-intro">
              <Sparkles size={11} className="text-cyan" />
              <span>Ask ({currentSlang.name}):</span>
            </div>
            <div className="prompts-pills-wrap">
              {quickPrompts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  id={`quick-prompt-${p.id}`}
                  className="quick-action-pill"
                  onClick={() => onSelectQuickPrompt(p.text)}
                  title={`Ask: "${p.text}"`}
                >
                  <span>{p.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
