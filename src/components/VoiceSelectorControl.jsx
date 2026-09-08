import React, { useState } from 'react';
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
  ChevronRight,
  ChevronLeft,
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
  Lock
} from 'lucide-react';
import { 
  SUPPORTED_LANGUAGES, 
  getVoicesForLanguage, 
  getVoicePreference, 
  SUPPORTED_EMOTIONS,
  getEmotionPreference
} from '../constants/languageConfig';

const STEP_ORDER = ['language', 'region', 'slang', 'voice', 'emotion'];

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
  currentStep = 'language', // 'language' | 'region' | 'slang' | 'voice' | 'emotion' | 'completed'
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
  onChangeSpeechSpeed
}) {
  // Requirement 1: Single collapsible section, closed/collapsed by default
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === config.language) || SUPPORTED_LANGUAGES[0];
  const currentRegion = currentLang.regions.find((r) => r.id === config.region) || currentLang.regions[0];
  const currentSlang = currentLang.slangs.find((s) => s.id === config.slang) || currentLang.slangs[0];
  const currentVoiceList = getVoicesForLanguage(config.language);
  const currentVoice = getVoicePreference(config.language, config.voice);
  const currentEmotion = getEmotionPreference(config.emotion || 'default');

  const activeIndex = currentStep === 'completed' ? 5 : STEP_ORDER.indexOf(currentStep);

  // Helper to check if a step tab is accessible
  const isStepAccessible = (stepId, index) => {
    if (currentStep === 'completed') return true;
    return index <= activeIndex;
  };

  // Localized string helpers
  const voiceLangDict = LOCALIZED_VOICE_LABELS[config.language] || LOCALIZED_VOICE_LABELS.english;
  const toneLangDict = LOCALIZED_TONES[config.language] || LOCALIZED_TONES.english;
  const speedTexts = LOCALIZED_SPEED[config.language] || LOCALIZED_SPEED.english;

  const currentVoiceLabel = voiceLangDict[currentVoice.id] || voiceLangDict[currentVoice.gender] || currentVoice.name;
  const currentEmotionLabel = toneLangDict[currentEmotion.id] || currentEmotion.name;

  // Quick prompt suggestions based on selected language and slang
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

    if (config.language === 'kannada') {
      return [
        { id: 'p1', text: 'ಒಂದು ಜೋಕ್ ಹೇಳಿ' },
        { id: 'p2', text: 'தமிழி (THAMILI) ಬಗ್ಗೆ ತಿಳಿಸಿ' },
        { id: 'p3', text: 'ಹೇಗಿದ್ದೀರಾ?' }
      ];
    }

    if (config.language === 'bengali') {
      return [
        { id: 'p1', text: 'একটি কৌতুক বলুন' },
        { id: 'p2', text: 'தமிழி (THAMILI) সম্পর্কে বলুন' },
        { id: 'p3', text: 'কেমন আছেন?' }
      ];
    }

    if (config.language === 'marathi') {
      return [
        { id: 'p1', text: 'एक विनोद सांगा' },
        { id: 'p2', text: 'தமிழி (THAMILI) बद्दल सांगा' },
        { id: 'p3', text: 'कसे आहात?' }
      ];
    }

    if (config.language === 'gujarati') {
      return [
        { id: 'p1', text: 'એક જોક કહો' },
        { id: 'p2', text: 'தமிழி (THAMILI) વિશે જણાવો' },
        { id: 'p3', text: 'કેમ છો?' }
      ];
    }

    if (config.language === 'spanish') {
      return [
        { id: 'p1', text: 'Cuéntame un chiste' },
        { id: 'p2', text: '¿Qué es THAMILI AI?' },
        { id: 'p3', text: '¿Cómo estás?' }
      ];
    }

    if (config.language === 'french') {
      return [
        { id: 'p1', text: 'Raconte-moi une blague' },
        { id: 'p2', text: 'Qu’est-ce que THAMILI AI ?' },
        { id: 'p3', text: 'Comment allez-vous ?' }
      ];
    }

    if (config.language === 'german') {
      return [
        { id: 'p1', text: 'Erzähle einen Witz' },
        { id: 'p2', text: 'Was ist THAMILI KI?' },
        { id: 'p3', text: 'Wie geht es dir?' }
      ];
    }

    if (config.language === 'japanese') {
      return [
        { id: 'p1', text: '面白いジョークを言って' },
        { id: 'p2', text: 'THAMILI AIについて教えて' },
        { id: 'p3', text: '元気ですか？' }
      ];
    }

    if (config.language === 'arabic') {
      return [
        { id: 'p1', text: 'قل لي نكتة مضحكة' },
        { id: 'p2', text: 'أخبرني عن THAMILI AI' },
        { id: 'p3', text: 'كيف حالك اليوم؟' }
      ];
    }

    return [
      { id: 'p1', text: 'Tell me a funny joke' },
      { id: 'p2', text: 'What is THAMILI AI?' },
      { id: 'p3', text: 'How are you doing?' }
    ];
  };

  const quickPrompts = getQuickPrompts();

  // Clean, concise steps for the top progress bar (5 Steps: Language, Country, Slang, Voice, Tone)
  const steps = [
    { id: 'language', label: '1. Language', shortVal: currentLang.nativeName || currentLang.name, icon: Globe },
    { id: 'region', label: '2. Country', shortVal: currentRegion.name.split(' (')[0], icon: MapPin },
    { id: 'slang', label: '3. Slang', shortVal: currentSlang.name.split(' (')[0], icon: Radio },
    { id: 'voice', label: '4. Voice', shortVal: currentVoiceLabel.split(' ')[0], icon: Volume2 },
    { id: 'emotion', label: '5. Tone', shortVal: currentEmotionLabel.split(' (')[0], icon: Sliders }
  ];

  // Exactly 3 Voice Options: Male Voice, Female Voice, Own Voice
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

  // Reusable Clickable 3-Option Speech Speed Box (Dynamically localized)
  const renderSpeechSpeedBox = () => (
    <div className="neat-speed-box" id="speech-speed-container">
      <div className="neat-speed-header">
        <div className="neat-speed-title-wrap">
          <div className="neat-speed-icon-box">
            <Sliders size={14} className="text-cyan" />
          </div>
          <div className="neat-speed-text-wrap">
            <span className="neat-speed-label">{speedTexts.title}</span>
            <span className="neat-speed-sublabel">{speedTexts.sublabel}</span>
          </div>
        </div>
        <div className={`neat-speed-status-badge badge-speed-${speechSpeed}`}>
          <span className="neat-speed-badge-dot" />
          <span className="neat-speed-badge-text">
            {speechSpeed === 'slow' ? `${speedTexts.slow} (0.6x)` : speechSpeed === 'fast' ? `${speedTexts.fast} (1.4x)` : `${speedTexts.normal} (1.0x)`}
          </span>
        </div>
      </div>

      <div className="neat-speed-buttons-row">
        {/* 1. SLOW BUTTON */}
        <button
          type="button"
          id="speed-btn-slow"
          className={`neat-speed-btn speed-btn-slow ${speechSpeed === 'slow' ? 'speed-btn-active' : ''}`}
          onClick={() => onChangeSpeechSpeed && onChangeSpeechSpeed('slow')}
          title={`Slow Speed (0.6x) - ${speedTexts.slow}`}
        >
          <div className="speed-btn-top">
            <span className="speed-btn-multiplier">0.6x</span>
          </div>
          <div className="speed-btn-body">
            <span className="speed-btn-title">{speedTexts.slow}</span>
          </div>
          {speechSpeed === 'slow' && <span className="speed-btn-active-indicator" />}
        </button>

        {/* 2. NORMAL BUTTON (CENTER & DEFAULT) */}
        <button
          type="button"
          id="speed-btn-normal"
          className={`neat-speed-btn speed-btn-normal ${speechSpeed === 'normal' ? 'speed-btn-active' : ''}`}
          onClick={() => onChangeSpeechSpeed && onChangeSpeechSpeed('normal')}
          title={`Normal Speed (1.0x) - ${speedTexts.normal}`}
        >
          <div className="speed-btn-top">
            <span className="speed-btn-multiplier">1.0x</span>
            <span className="speed-btn-badge-default">Default</span>
          </div>
          <div className="speed-btn-body">
            <span className="speed-btn-title">{speedTexts.normal}</span>
          </div>
          {speechSpeed === 'normal' && <span className="speed-btn-active-indicator" />}
        </button>

        {/* 3. FAST BUTTON */}
        <button
          type="button"
          id="speed-btn-fast"
          className={`neat-speed-btn speed-btn-fast ${speechSpeed === 'fast' ? 'speed-btn-active' : ''}`}
          onClick={() => onChangeSpeechSpeed && onChangeSpeechSpeed('fast')}
          title={`Fast Speed (1.4x) - ${speedTexts.fast}`}
        >
          <div className="speed-btn-top">
            <span className="speed-btn-multiplier">1.4x</span>
          </div>
          <div className="speed-btn-body">
            <span className="speed-btn-title">{speedTexts.fast}</span>
          </div>
          {speechSpeed === 'fast' && <span className="speed-btn-active-indicator" />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="voice-language-collapsible-wrapper" aria-label="Voice & Language Settings Panel">
      {/* ========================================================
          1. SINGLE COLLAPSIBLE SECTION HEADER
          - Header: Voice & Language Settings
          - ONE dropdown arrow at TOP-RIGHT (▼ when collapsed, ▲ when expanded)
          - Closed / Collapsed by default
          ======================================================== */}
      <button
        type="button"
        id="voice-language-settings-toggle-btn"
        className={`collapsible-settings-header ${isSettingsExpanded ? 'header-expanded' : 'header-collapsed'}`}
        onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
        aria-expanded={isSettingsExpanded}
        aria-controls="voice-settings-collapsible-content"
        title={isSettingsExpanded ? 'Click to collapse settings' : 'Click to expand settings'}
      >
        <div className="settings-header-left">
          <div className="settings-header-icon-box">
            <Sliders size={15} className="settings-header-icon" />
          </div>
          <span className="settings-header-title">Voice & Language Settings</span>
          {!isSettingsExpanded && (
            <span className="settings-header-summary-tag">
              {currentLang.flag} {currentLang.name} • {currentVoiceLabel.split(' ')[0]} • {currentEmotionLabel.split(' (')[0]}
            </span>
          )}
        </div>

        {/* ONE neat dropdown arrow at TOP-RIGHT corner: ▼ when collapsed, ▲ when expanded */}
        <div className="settings-header-arrow-wrap">
          <span className="settings-header-arrow-glyph" aria-hidden="true">
            {isSettingsExpanded ? '▲' : '▼'}
          </span>
        </div>
      </button>

      {/* ========================================================
          2. EXPANDABLE SETTINGS CONTENT BODY (Smooth transition)
          ======================================================== */}
      <div 
        id="voice-settings-collapsible-content"
        className={`collapsible-settings-body ${isSettingsExpanded ? 'body-expanded' : 'body-collapsed'}`}
        aria-hidden={!isSettingsExpanded}
      >
        <div className="neat-voice-studio-card" aria-label="Voice & Language Studio Selection">
          {/* 1. TOP STEPPER BREADCRUMBS ROW WITH STRICT STEP LOCKING */}
          <div className="studio-navbar-header">
            <div className="stepper-breadcrumbs">
              {steps.map((s, index) => {
                const isActive = currentStep === s.id;
                const isUnlocked = isStepAccessible(s.id, index);
                const isDone = (currentStep === 'completed') || (activeIndex > index);
                const IconComp = s.icon;

                return (
                  <React.Fragment key={s.id}>
                    <button
                      type="button"
                      id={`step-tab-${s.id}`}
                      className={`breadcrumb-pill ${isActive ? 'active-pill' : ''} ${!isUnlocked ? 'locked-pill' : 'idle-pill'}`}
                      onClick={() => {
                        if (isUnlocked && onSetStep) {
                          onSetStep(s.id);
                        }
                      }}
                      disabled={!isUnlocked}
                      title={!isUnlocked ? `Complete previous step to unlock ${s.label}` : `Switch to ${s.label}`}
                    >
                      {!isUnlocked ? (
                        <Lock size={10} className="breadcrumb-lock-icon" />
                      ) : (
                        <IconComp size={11} className="breadcrumb-icon" />
                      )}
                      <span className="breadcrumb-title">{s.label}</span>
                      {isActive && <span className="breadcrumb-val">({s.shortVal})</span>}
                      {isDone && !isActive && (
                        <Check size={10} className="breadcrumb-check text-emerald" />
                      )}
                    </button>
                    {index < steps.length - 1 && (
                      <ChevronRight size={11} className={`breadcrumb-separator ${!isUnlocked ? 'separator-muted' : ''}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Action Controls: Test Voice + Restart */}
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
                title="Restart Selection from Step 1: Language"
              >
                <RotateCcw size={11} />
                <span>Restart</span>
              </button>
            </div>
          </div>

          {/* 2. DYNAMIC SELECTION OPTIONS AREA (Strict Step-by-Step Flow: 1. Lang/Region, 2. Slang, 3. Voice, 4. Tone) */}
          <div className="studio-options-singleline-container">
            {/* STEP 1: LANGUAGE SELECTION */}
            {currentStep === 'language' && (
              <div className="step-selection-row animate-fade-in">
                <div className="step-selection-header-row">
                  <span className="step-indicator-tag">Step 1 of 5</span>
                  <span className="selection-label">Select Language / மொழியைத் தேர்ந்தெடுக்கவும்:</span>
                </div>
                <div className="chips-wrap-grid">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = config.language === lang.id;
                    return (
                      <button
                        key={lang.id}
                        type="button"
                        id={`lang-btn-${lang.id}`}
                        className={`clean-selection-chip chip-lang ${isSelected ? 'selected-chip' : ''}`}
                        onClick={() => onSelectLanguage(lang.id)}
                        title={`Select ${lang.name} (${lang.nativeName})`}
                      >
                        <span className="chip-flag-icon">{lang.flag}</span>
                        <div className="chip-text-content">
                          <span className="chip-label-primary">{lang.name}</span>
                          <span className="chip-label-sub">{lang.nativeName}</span>
                        </div>
                        {isSelected && <Check size={13} className="chip-check text-emerald" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: REGION / COUNTRY SELECTION */}
            {currentStep === 'region' && (
              <div className="step-selection-row animate-fade-in">
                <div className="step-selection-header-row">
                  <span className="step-indicator-tag">Step 2 of 5</span>
                  <span className="selection-label">Select Country or Region for {currentLang.name}:</span>
                  <button 
                    type="button" 
                    className="step-back-link" 
                    onClick={() => onSetStep('language')}
                    title="Back to Step 1: Language"
                  >
                    <ChevronLeft size={12} /> Language
                  </button>
                </div>
                <div className="chips-wrap-grid">
                  {currentLang.regions.map((reg) => {
                    const isSelected = (config.region || currentRegion.id) === reg.id;
                    return (
                      <button
                        key={reg.id}
                        type="button"
                        id={`region-btn-${reg.id}`}
                        className={`clean-selection-chip chip-region ${isSelected ? 'selected-chip' : ''}`}
                        onClick={() => onSelectRegion(reg.id)}
                        title={`Select ${reg.name}`}
                      >
                        <MapPin size={13} className="chip-pin-icon text-blue" />
                        <div className="chip-text-content">
                          <span className="chip-label-primary">{reg.name.split(' (')[0]}</span>
                          {reg.name.includes('(') && (
                            <span className="chip-label-sub">({reg.name.split('(')[1]}</span>
                          )}
                        </div>
                        {isSelected && <Check size={13} className="chip-check text-emerald" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: SLANG / DIALECT SELECTION */}
            {currentStep === 'slang' && (
              <div className="step-selection-row animate-fade-in">
                <div className="step-selection-header-row">
                  <span className="step-indicator-tag">Step 3 of 5</span>
                  <span className="selection-label">Select {currentLang.name} Dialect / Slang Style:</span>
                  <button 
                    type="button" 
                    className="step-back-link" 
                    onClick={() => onSetStep('region')}
                    title="Back to Step 2: Country"
                  >
                    <ChevronLeft size={12} /> Country
                  </button>
                </div>
                <div className="chips-wrap-grid">
                  {currentLang.slangs.map((slang) => {
                    const isSelected = (config.slang || currentSlang.id) === slang.id;
                    return (
                      <button
                        key={slang.id}
                        type="button"
                        id={`slang-btn-${slang.id}`}
                        className={`clean-selection-chip chip-slang ${isSelected ? 'selected-chip' : ''}`}
                        onClick={() => onSelectSlang(slang.id)}
                        title={slang.description}
                      >
                        <Radio size={13} className="chip-radio-icon text-cyan" />
                        <div className="chip-text-content">
                          <span className="chip-label-primary">{slang.name}</span>
                          <span className="chip-label-sub">{slang.badge}</span>
                        </div>
                        {isSelected && <Check size={13} className="chip-check text-emerald" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: VOICE MODEL SELECTION (Strictly 3 options: Male Voice, Female Voice, Own Voice) */}
            {currentStep === 'voice' && (
              <div className="step-selection-row animate-fade-in">
                <div className="step-selection-header-row">
                  <span className="step-indicator-tag">Step 4 of 5</span>
                  <span className="selection-label">Select Voice Model / குரல் மாதிரியைத் தேர்ந்தெடுக்கவும்:</span>
                  <button 
                    type="button" 
                    className="step-back-link" 
                    onClick={() => onSetStep('slang')}
                    title="Back to Step 3: Slang"
                  >
                    <ChevronLeft size={12} /> Slang
                  </button>
                </div>
                <div className="chips-wrap-grid voice-selection-grid">
                  {canonicalVoices.map((v) => {
                    const isSelected = (config.voice === v.id) || (currentVoice.id === v.id);
                    const isUserVoice = v.id === 'user';

                    return (
                      <button
                        key={v.id}
                        type="button"
                        id={`voice-btn-${v.id}`}
                        className={`clean-selection-chip chip-voice ${isUserVoice ? 'chip-voice-user' : ''} ${isSelected ? 'selected-chip' : ''}`}
                        onClick={() => {
                          onSelectVoice(v.id);
                          if (isUserVoice && !uploadedVoiceFile) {
                            onOpenVoiceModal();
                          }
                        }}
                        title={v.displayName}
                      >
                        <span className="chip-voice-icon-box">
                          {isUserVoice ? (
                            <UploadCloud size={16} className="text-emerald" />
                          ) : v.id === 'male' ? (
                            <User size={16} className="text-blue" />
                          ) : (
                            <User size={16} className="text-purple" />
                          )}
                        </span>
                        <div className="chip-text-content">
                          <span className="chip-label-primary">{v.displayName}</span>
                        </div>
                        {isUserVoice && uploadedVoiceFile && (
                          <span className="chip-badge-tag text-emerald">Ready</span>
                        )}
                        {isSelected && <Check size={14} className="chip-check text-emerald" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: VOICE TONE SELECTION (Zero emojis, static UI icons, localized labels) */}
            {currentStep === 'emotion' && (
              <div className="step-selection-row animate-fade-in">
                <div className="step-selection-header-row">
                  <span className="step-indicator-tag">Step 5 of 5</span>
                  <span className="selection-label">Select Voice Tone / குரல் பாணியைத் தேர்ந்தெடுக்கவும்:</span>
                  <button 
                    type="button" 
                    className="step-back-link" 
                    onClick={() => onSetStep('voice')}
                    title="Back to Step 4: Voice"
                  >
                    <ChevronLeft size={12} /> Voice
                  </button>
                </div>
                <div className="chips-wrap-grid emotion-selection-grid">
                  {SUPPORTED_EMOTIONS.map((emo) => {
                    const isSelected = (config.emotion || 'default') === emo.id;
                    const ToneIcon = TONE_ICONS[emo.id] || Sliders;
                    const localizedLabel = toneLangDict[emo.id] || emo.name;

                    return (
                      <button
                        key={emo.id}
                        type="button"
                        id={`emotion-btn-${emo.id}`}
                        className={`clean-selection-chip chip-emotion emotion-${emo.id} ${isSelected ? 'selected-chip' : ''}`}
                        onClick={() => onSelectEmotion(emo.id)}
                        title={localizedLabel}
                      >
                        <span className="chip-tone-icon-box">
                          <ToneIcon size={15} className={`tone-ui-icon tone-icon-${emo.id}`} />
                        </span>
                        <div className="chip-text-content">
                          <span className="chip-label-primary">{localizedLabel}</span>
                        </div>
                        {isSelected && <Check size={13} className="chip-check text-emerald" />}
                      </button>
                    );
                  })}
                </div>

                {/* Speech Speed control located directly under Tone options */}
                {renderSpeechSpeedBox()}
              </div>
            )}

            {/* COMPLETED STATE: QUICK ACTIVE SUMMARY & NEAT SPEECH SPEED BOX */}
            {currentStep === 'completed' && (
              <div className="step-selection-row animate-fade-in">
                <div className="step-selection-header-row">
                  <span className="step-indicator-tag tag-ready">Ready</span>
                  <span className="selection-label">Active Setup (Click any to adjust):</span>
                </div>
                <div className="chips-wrap-grid">
                  <button 
                    type="button" 
                    className="clean-selection-chip chip-summary"
                    onClick={() => onSetStep('language')}
                    title="Change Language (Step 1)"
                  >
                    <Globe size={12} className="text-purple" />
                    <span>{currentLang.flag} {currentLang.name}</span>
                  </button>

                  <button 
                    type="button" 
                    className="clean-selection-chip chip-summary"
                    onClick={() => onSetStep('region')}
                    title="Change Country (Step 2)"
                  >
                    <MapPin size={12} className="text-blue" />
                    <span>{currentRegion.name.split(' (')[0]}</span>
                  </button>

                  <button 
                    type="button" 
                    className="clean-selection-chip chip-summary"
                    onClick={() => onSetStep('slang')}
                    title="Change Slang (Step 3)"
                  >
                    <Radio size={12} className="text-cyan" />
                    <span>{currentSlang.name}</span>
                  </button>

                  <button 
                    type="button" 
                    className="clean-selection-chip chip-summary"
                    onClick={() => onSetStep('voice')}
                    title="Change Voice (Step 4)"
                  >
                    <Volume2 size={12} className="text-emerald" />
                    <span>{currentVoiceLabel}</span>
                  </button>

                  <button 
                    type="button" 
                    className="clean-selection-chip chip-summary chip-emotion-summary"
                    onClick={() => onSetStep('emotion')}
                    title="Change Voice Tone (Step 5)"
                  >
                    {(() => {
                      const SummaryToneIcon = TONE_ICONS[currentEmotion.id] || Sliders;
                      return <SummaryToneIcon size={12} className="text-amber" />;
                    })()}
                    <span>{currentEmotionLabel}</span>
                  </button>

                  {(config.voice === 'user' || currentVoice.id === 'user') && (
                    <button 
                      type="button" 
                      className="clean-selection-chip chip-upload-btn"
                      onClick={onOpenVoiceModal}
                      title="Upload / Change Voice Sample"
                    >
                      <UploadCloud size={12} />
                      <span>{uploadedVoiceFile ? 'Sample: ' + uploadedVoiceFile.name.slice(0, 10) : 'Upload Sample'}</span>
                    </button>
                  )}
                </div>

                {/* Speech Speed control in completed active setup */}
                {renderSpeechSpeedBox()}
              </div>
            )}
          </div>

          {/* 4. QUICK CONVERSATIONAL PROMPTS BAR */}
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
