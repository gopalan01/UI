import React from 'react';
import {
  Globe,
  MapPin,
  MessageCircle,
  UserCheck,
  Smile,
  Gauge,
  Mic,
  Check
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../constants/languageConfig';

/**
 * SetupQuestionCard Component
 * Refactored to render ONLY the internal setup options directly inside
 * the existing THAMILI AI conversation message bubble.
 * No separate outer card, floating box, or disconnected white container.
 */
export default function SetupQuestionCard({
  currentStep = 'language',
  config = {},
  speechSpeed = 'normal',
  onSelectLanguage,
  onSelectRegion,
  onSelectSlang,
  onSelectVoice,
  onSelectEmotion,
  onSelectSpeed
}) {
  if (currentStep === 'completed' || currentStep === 'welcome') {
    return null;
  }

  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.id === config.language) || SUPPORTED_LANGUAGES[0];

  // Helper for localized speak/tap guidance caption
  const getDualGuidanceCaption = (langId) => {
    switch (langId) {
      case 'tamil':
        return '🎤 பேசுங்கள் அல்லது ஒரு விருப்பத்தைத் தட்டலாம்';
      case 'malayalam':
        return '🎤 സംസാരിക്കുക അല്ലെങ്കിൽ ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക';
      case 'hindi':
        return '🎤 बोलें या किसी विकल्प को टैप करें';
      case 'telugu':
        return '🎤 మాట్లాడండి లేదా ఒక ఎంపికను ట్యాప్ చేయండి';
      case 'english':
      default:
        return '🎤 Speak your choice or tap an option';
    }
  };

  // Localized spoken examples for each step
  const getStepExamples = (step, langId) => {
    switch (step) {
      case 'language':
        return ['"தமிழ்"', '"English"', '"மலையாளம்"', '"हिंदी"', '"తెలుగు"'];
      case 'region':
        if (langId === 'tamil') return ['"இந்தியா"', '"இந்தியா வேணும்"', '"சிங்கப்பூர்"'];
        if (langId === 'malayalam') return ['"ഇന്ത്യ"', '"ഇന്ത്യ വേണം"'];
        if (langId === 'hindi') return ['"भारत"', '"इंडिया"'];
        if (langId === 'telugu') return ['"భారతదేశం"', '"ఇండియా"'];
        return ['"India"', '"United States"', '"United Kingdom"'];
      case 'slang':
        if (langId === 'tamil') return ['"கொங்கு தமிழ்"', '"மதுரை தமிழ்"', '"சென்னை தமிழ்"'];
        if (langId === 'malayalam') return ['"വള്ളുവനാടൻ"', '"മലബാർ"'];
        if (langId === 'hindi') return ['"दिल्ली हिंदी"', '"मुंबई हिंदी"'];
        if (langId === 'telugu') return ['"తెలంగాణ"', '"ఆంధ్ర"'];
        return ['"Standard"', '"Casual"', '"British"'];
      case 'voice':
        if (langId === 'tamil') return ['"ஆண் குரல்"', '"மேல் வாய்ஸ்"', '"பெண் குரல்"', '"ஃபீமேல் வாய்ஸ்"'];
        if (langId === 'malayalam') return ['"പുരുഷ ശബ്ദം"', '"സ്ത്രീ ശബ്ദം"'];
        if (langId === 'hindi') return ['"पुरुष आवाज़"', '"महिला आवाज़"'];
        if (langId === 'telugu') return ['"పురుష స్వరం"', '"మహిళా స్వరం"'];
        return ['"Male Voice"', '"Female Voice"'];
      case 'emotion':
        if (langId === 'tamil') return ['"ஹேப்பி டோன்"', '"ஹஸ்கி வாய்ஸ்"', '"அமைதியான குரல்"'];
        if (langId === 'malayalam') return ['"Happy"', '"Husky"', '"Calm"'];
        if (langId === 'hindi') return ['"खुश टोन"', '"गंभीर आवाज़"'];
        if (langId === 'telugu') return ['"హ్యాపీ"', '"హుస్కీ"'];
        return ['"Happy tone"', '"Husky voice"', '"Calm voice"'];
      case 'speed':
        if (langId === 'tamil') return ['"நார்மல் ஸ்பீட்"', '"மெதுவா பேசு"', '"வேகமா பேசு"'];
        if (langId === 'malayalam') return ['"Normal speed"', '"പതുക്കെ"'];
        if (langId === 'hindi') return ['"सामान्य गति"', '"धीरे बोलो"', '"तेज़ बोलो"'];
        if (langId === 'telugu') return ['"సాధారణ వేగం"', '"నెమ్మదిగా"', '"వేగంగా"'];
        return ['"Normal speed"', '"Slow speed"', '"Fast speed"'];
      default:
        return [];
    }
  };

  // --------------------------------------------------------------------------
  // Step 1: Language Selection
  // --------------------------------------------------------------------------
  if (currentStep === 'language') {
    const primaryLanguages = [
      { id: 'tamil', label: 'தமிழ்', sub: 'Tamil' },
      { id: 'english', label: 'English', sub: 'English' },
      { id: 'malayalam', label: 'മലയാളം', sub: 'Malayalam' },
      { id: 'hindi', label: 'हिंदी', sub: 'Hindi' },
      { id: 'telugu', label: 'తెలుగు', sub: 'Telugu' }
    ];

    return (
      <div className="setup-bubble-content" role="region" aria-label="Language Selection">
        <div className="setup-bubble-header">
          <div className="setup-bubble-title-wrap">
            <Globe size={15} className="text-cyan" />
            <span className="setup-bubble-title">Select Your Language</span>
          </div>
          <span className="setup-bubble-step-badge">Step 1 of 6</span>
        </div>

        <div className="setup-bubble-chips-grid">
          {primaryLanguages.map((lang) => {
            const isSelected = config.language === lang.id;
            return (
              <button
                key={lang.id}
                type="button"
                className={`setup-chip-btn ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onSelectLanguage?.(lang.id)}
                aria-pressed={isSelected}
              >
                <span className="chip-label-main">{lang.label}</span>
                {lang.sub !== lang.label && (
                  <span className="chip-label-sub">({lang.sub})</span>
                )}
                {isSelected && <Check size={14} className="chip-check-icon" />}
              </button>
            );
          })}
        </div>

        {/* Spoken Examples */}
        <div className="setup-bubble-examples-row">
          <span className="examples-label">Try saying:</span>
          {getStepExamples('language', config.language).map((ex, idx) => (
            <span key={idx} className="example-speech-pill">{ex}</span>
          ))}
        </div>

        {/* Speak / Tap Instruction */}
        <div className="setup-bubble-guidance">
          <Mic size={13} className="text-cyan" />
          <span>{getDualGuidanceCaption(config.language)}</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Step 2: Country / Region Selection (Localized in Selected Language)
  // --------------------------------------------------------------------------
  if (currentStep === 'region') {
    const regions = currentLangObj.regions || [
      { id: 'india', name: 'India' },
      { id: 'united_states', name: 'USA' },
      { id: 'united_kingdom', name: 'UK' },
      { id: 'singapore', name: 'Singapore' },
      { id: 'malaysia', name: 'Malaysia' }
    ];

    let titleText = 'Select Your Country';
    if (config.language === 'tamil') {
      titleText = 'நாட்டைத் தேர்ந்தெடுக்கவும் (Country)';
    } else if (config.language === 'malayalam') {
      titleText = 'രാജ്യം തിരഞ്ഞെടുക്കുക (Country)';
    } else if (config.language === 'hindi') {
      titleText = 'अपना देश चुनें (Country)';
    } else if (config.language === 'telugu') {
      titleText = 'దేశాన్ని ఎంచుకోండి (Country)';
    }

    return (
      <div className="setup-bubble-content" role="region" aria-label="Country Selection">
        <div className="setup-bubble-header">
          <div className="setup-bubble-title-wrap">
            <MapPin size={15} className="text-cyan" />
            <span className="setup-bubble-title">{titleText}</span>
          </div>
          <span className="setup-bubble-step-badge">Step 2 of 6</span>
        </div>

        <div className="setup-bubble-chips-grid">
          {regions.map((reg) => {
            const isSelected = config.region === reg.id;
            return (
              <button
                key={reg.id}
                type="button"
                className={`setup-chip-btn ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onSelectRegion?.(reg.id)}
                aria-pressed={isSelected}
              >
                <span className="chip-label-main">{reg.name}</span>
                {isSelected && <Check size={14} className="chip-check-icon" />}
              </button>
            );
          })}
        </div>

        {/* Spoken Examples */}
        <div className="setup-bubble-examples-row">
          <span className="examples-label">Try saying:</span>
          {getStepExamples('region', config.language).map((ex, idx) => (
            <span key={idx} className="example-speech-pill">{ex}</span>
          ))}
        </div>

        {/* Speak / Tap Instruction */}
        <div className="setup-bubble-guidance">
          <Mic size={13} className="text-cyan" />
          <span>{getDualGuidanceCaption(config.language)}</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Step 3: Slang / Dialect Selection (Localized in Selected Language)
  // --------------------------------------------------------------------------
  if (currentStep === 'slang') {
    const slangs = currentLangObj.slangs || [];

    let titleText = 'Select Slang / Dialect';
    if (config.language === 'tamil') {
      titleText = 'வட்டார வழக்கை தேர்ந்தெடுக்கவும் (Slang)';
    } else if (config.language === 'malayalam') {
      titleText = 'സംഭാഷണ ശൈലി തിരഞ്ഞെടുക്കുക (Slang)';
    } else if (config.language === 'hindi') {
      titleText = 'स्थानीय बोली चुनें (Slang)';
    } else if (config.language === 'telugu') {
      titleText = 'యాసను ఎంచుకోండి (Slang)';
    }

    return (
      <div className="setup-bubble-content" role="region" aria-label="Slang Selection">
        <div className="setup-bubble-header">
          <div className="setup-bubble-title-wrap">
            <MessageCircle size={15} className="text-cyan" />
            <span className="setup-bubble-title">{titleText}</span>
          </div>
          <span className="setup-bubble-step-badge">Step 3 of 6</span>
        </div>

        <div className="setup-bubble-chips-grid">
          {slangs.map((sl) => {
            const isSelected = config.slang === sl.id;
            return (
              <button
                key={sl.id}
                type="button"
                className={`setup-chip-btn ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onSelectSlang?.(sl.id)}
                aria-pressed={isSelected}
              >
                <span className="chip-label-main">{sl.name}</span>
                {isSelected && <Check size={14} className="chip-check-icon" />}
              </button>
            );
          })}
        </div>

        {/* Spoken Examples */}
        <div className="setup-bubble-examples-row">
          <span className="examples-label">Try saying:</span>
          {getStepExamples('slang', config.language).map((ex, idx) => (
            <span key={idx} className="example-speech-pill">{ex}</span>
          ))}
        </div>

        {/* Speak / Tap Instruction */}
        <div className="setup-bubble-guidance">
          <Mic size={13} className="text-cyan" />
          <span>{getDualGuidanceCaption(config.language)}</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Step 4: Voice Type Selection (Male / Female / Own Voice)
  // --------------------------------------------------------------------------
  if (currentStep === 'voice') {
    let titleText = 'Select Voice Type';
    let maleLabel = 'Male Voice';
    let femaleLabel = 'Female Voice';
    let ownLabel = 'Own Voice';

    if (config.language === 'tamil') {
      titleText = 'குரல் வகையைத் தேர்ந்தெடுக்கவும் (Voice)';
      maleLabel = 'ஆண் குரல் (Male)';
      femaleLabel = 'பெண் குரல் (Female)';
      ownLabel = 'சொந்த குரல் (Own)';
    } else if (config.language === 'malayalam') {
      titleText = 'ശബ്ദ തരം തിരഞ്ഞെടുക്കുക (Voice)';
      maleLabel = 'പുരുഷ സ്വരം (Male)';
      femaleLabel = 'സ്ത്രീ സ്വരം (Female)';
      ownLabel = 'സ്വന്തം ശബ്ദം (Own)';
    } else if (config.language === 'hindi') {
      titleText = 'आवाज़ का प्रकार चुनें (Voice)';
      maleLabel = 'पुरुष आवाज़ (Male)';
      femaleLabel = 'महिला आवाज़ (Female)';
      ownLabel = 'खुद की आवाज़ (Own)';
    } else if (config.language === 'telugu') {
      titleText = 'వాయిస్ రకాన్ని ఎంచుకోండి (Voice)';
      maleLabel = 'పురుష స్వరం (Male)';
      femaleLabel = 'మహిళా స్వరం (Female)';
      ownLabel = 'సొంత వాయిస్ (Own)';
    }

    const voiceOptions = [
      { id: 'male', label: maleLabel, icon: '👨' },
      { id: 'female', label: femaleLabel, icon: '👩' },
      { id: 'user', label: ownLabel, icon: '🎙️' }
    ];

    return (
      <div className="setup-bubble-content" role="region" aria-label="Voice Type Selection">
        <div className="setup-bubble-header">
          <div className="setup-bubble-title-wrap">
            <UserCheck size={15} className="text-cyan" />
            <span className="setup-bubble-title">{titleText}</span>
          </div>
          <span className="setup-bubble-step-badge">Step 4 of 6</span>
        </div>

        <div className="setup-bubble-chips-grid">
          {voiceOptions.map((v) => {
            const isSelected = config.voice === v.id;
            return (
              <button
                key={v.id}
                type="button"
                className={`setup-chip-btn ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onSelectVoice?.(v.id)}
                aria-pressed={isSelected}
              >
                <span className="chip-leading-emoji">{v.icon}</span>
                <span className="chip-label-main">{v.label}</span>
                {isSelected && <Check size={14} className="chip-check-icon" />}
              </button>
            );
          })}
        </div>

        {/* Spoken Examples */}
        <div className="setup-bubble-examples-row">
          <span className="examples-label">Try saying:</span>
          {getStepExamples('voice', config.language).map((ex, idx) => (
            <span key={idx} className="example-speech-pill">{ex}</span>
          ))}
        </div>

        {/* Speak / Tap Instruction */}
        <div className="setup-bubble-guidance">
          <Mic size={13} className="text-cyan" />
          <span>{getDualGuidanceCaption(config.language)}</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Step 5: Voice Tone Selection
  // --------------------------------------------------------------------------
  if (currentStep === 'emotion') {
    let titleText = 'Select Voice Tone';
    if (config.language === 'tamil') {
      titleText = 'வாய்ஸ் டோனைத் தேர்ந்தெடுக்கவும் (Tone)';
    } else if (config.language === 'malayalam') {
      titleText = 'വോയ്സ് ടോൺ തിരഞ്ഞെടുക്കുക (Tone)';
    } else if (config.language === 'hindi') {
      titleText = 'आवाज़ का टोन चुनें (Tone)';
    } else if (config.language === 'telugu') {
      titleText = 'వాయిస్ టోన్ ఎంచుకోండి (Tone)';
    }

    const toneOptions = [
      { id: 'happy', label: 'Happy', emoji: '😊', nativeTamil: 'மகிழ்ச்சி' },
      { id: 'calm', label: 'Calm', emoji: '🧘', nativeTamil: 'அமைதி' },
      { id: 'friendly', label: 'Friendly', emoji: '🤝', nativeTamil: 'நட்பு' },
      { id: 'husky', label: 'Husky', emoji: '🎙️', nativeTamil: 'கம்பீரம்' }
    ];

    return (
      <div className="setup-bubble-content" role="region" aria-label="Tone Selection">
        <div className="setup-bubble-header">
          <div className="setup-bubble-title-wrap">
            <Smile size={15} className="text-cyan" />
            <span className="setup-bubble-title">{titleText}</span>
          </div>
          <span className="setup-bubble-step-badge">Step 5 of 6</span>
        </div>

        <div className="setup-bubble-chips-grid">
          {toneOptions.map((t) => {
            const isSelected = config.emotion === t.id;
            return (
              <button
                key={t.id}
                type="button"
                className={`setup-chip-btn ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onSelectEmotion?.(t.id)}
                aria-pressed={isSelected}
              >
                <span className="chip-leading-emoji">{t.emoji}</span>
                <span className="chip-label-main">{t.label}</span>
                {config.language === 'tamil' && (
                  <span className="chip-label-sub">({t.nativeTamil})</span>
                )}
                {isSelected && <Check size={14} className="chip-check-icon" />}
              </button>
            );
          })}
        </div>

        {/* Spoken Examples */}
        <div className="setup-bubble-examples-row">
          <span className="examples-label">Try saying:</span>
          {getStepExamples('emotion', config.language).map((ex, idx) => (
            <span key={idx} className="example-speech-pill">{ex}</span>
          ))}
        </div>

        {/* Speak / Tap Instruction */}
        <div className="setup-bubble-guidance">
          <Mic size={13} className="text-cyan" />
          <span>{getDualGuidanceCaption(config.language)}</span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Step 6: Speech Speed Selection
  // --------------------------------------------------------------------------
  if (currentStep === 'speed') {
    let titleText = 'Select Speech Speed';
    if (config.language === 'tamil') {
      titleText = 'பேசும் வேகத்தைத் தேர்ந்தெடுக்கவும் (Speed)';
    } else if (config.language === 'malayalam') {
      titleText = 'സംസാര വേഗത തിരഞ്ഞെടുക്കുക (Speed)';
    } else if (config.language === 'hindi') {
      titleText = 'आवाज़ की गति चुनें (Speed)';
    } else if (config.language === 'telugu') {
      titleText = 'మాట్లాడే వేగాన్ని ఎంచుకోండి (Speed)';
    }

    const speedOptions = [
      { id: 'slow', label: 'Slow', rate: '0.75x', emoji: '🐢', nativeTamil: 'மெதுவாக' },
      { id: 'normal', label: 'Normal', rate: '1.0x', emoji: '⚡', nativeTamil: 'இயல்பாக' },
      { id: 'fast', label: 'Fast', rate: '1.4x', emoji: '🚀', nativeTamil: 'வேகமாக' }
    ];

    return (
      <div className="setup-bubble-content" role="region" aria-label="Speech Speed Selection">
        <div className="setup-bubble-header">
          <div className="setup-bubble-title-wrap">
            <Gauge size={15} className="text-cyan" />
            <span className="setup-bubble-title">{titleText}</span>
          </div>
          <span className="setup-bubble-step-badge">Step 6 of 6 (Final)</span>
        </div>

        <div className="setup-bubble-chips-grid">
          {speedOptions.map((s) => {
            const isSelected = speechSpeed === s.id;
            return (
              <button
                key={s.id}
                type="button"
                className={`setup-chip-btn ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onSelectSpeed?.(s.id)}
                aria-pressed={isSelected}
              >
                <span className="chip-leading-emoji">{s.emoji}</span>
                <span className="chip-label-main">{s.label} ({s.rate})</span>
                {isSelected && <Check size={14} className="chip-check-icon" />}
              </button>
            );
          })}
        </div>

        {/* Spoken Examples */}
        <div className="setup-bubble-examples-row">
          <span className="examples-label">Try saying:</span>
          {getStepExamples('speed', config.language).map((ex, idx) => (
            <span key={idx} className="example-speech-pill">{ex}</span>
          ))}
        </div>

        {/* Speak / Tap Instruction */}
        <div className="setup-bubble-guidance">
          <Mic size={13} className="text-cyan" />
          <span>{getDualGuidanceCaption(config.language)}</span>
        </div>
      </div>
    );
  }

  return null;
}
