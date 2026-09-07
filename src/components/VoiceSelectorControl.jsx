import React from 'react';
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
  Smile,
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

  // Clean, concise steps for the top progress bar (5 Steps)
  const steps = [
    { id: 'language', label: '1. Language', shortVal: currentLang.nativeName || currentLang.name, icon: Globe },
    { id: 'region', label: '2. Country', shortVal: currentRegion.name.split(' (')[0], icon: MapPin },
    { id: 'slang', label: '3. Slang', shortVal: currentSlang.name.split(' (')[0], icon: Radio },
    { id: 'voice', label: '4. Voice', shortVal: currentVoice.name.split(' ')[0], icon: Volume2 },
    { id: 'emotion', label: '5. Tone', shortVal: currentEmotion.name, icon: Smile }
  ];

  return (
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

      {/* 2. DYNAMIC SELECTION OPTIONS AREA (Strict Step-by-Step Flow) */}
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
                  >
                    <span className="chip-flag-icon">{lang.flag}</span>
                    <span className="chip-label-primary">{lang.name}</span>
                    <span className="chip-label-sub">({lang.nativeName})</span>
                    {isSelected && <Check size={12} className="chip-check text-emerald" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: COUNTRY / REGION SELECTION */}
        {currentStep === 'region' && (
          <div className="step-selection-row animate-fade-in">
            <div className="step-selection-header-row">
              <span className="step-indicator-tag">Step 2 of 5</span>
              <span className="selection-label">Select Country / Region ({currentLang.name}):</span>
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
                const isSelected = config.region === reg.id;
                return (
                  <button
                    key={reg.id}
                    type="button"
                    id={`region-btn-${reg.id}`}
                    className={`clean-selection-chip chip-region ${isSelected ? 'selected-chip' : ''}`}
                    onClick={() => onSelectRegion(reg.id)}
                  >
                    <MapPin size={12} className="chip-pin-icon text-blue" />
                    <span className="chip-label-primary">{reg.name}</span>
                    {isSelected && <Check size={12} className="chip-check text-emerald" />}
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
              <span className="selection-label">Select Slang Style ({currentLang.name}):</span>
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
                const isSelected = config.slang === slang.id;
                return (
                  <button
                    key={slang.id}
                    type="button"
                    id={`slang-btn-${slang.id}`}
                    className={`clean-selection-chip chip-slang ${isSelected ? 'selected-chip' : ''}`}
                    onClick={() => onSelectSlang(slang.id)}
                    title={slang.description}
                  >
                    <Radio size={12} className="chip-radio-icon text-cyan" />
                    <span className="chip-label-primary">{slang.name}</span>
                    {slang.badge && <span className="chip-badge-tag">{slang.badge}</span>}
                    {isSelected && <Check size={12} className="chip-check text-emerald" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: VOICE MODEL SELECTION */}
        {currentStep === 'voice' && (
          <div className="step-selection-row animate-fade-in">
            <div className="step-selection-header-row">
              <span className="step-indicator-tag">Step 4 of 5</span>
              <span className="selection-label">Select {currentLang.name} Voice Model:</span>
              <button 
                type="button" 
                className="step-back-link" 
                onClick={() => onSetStep('slang')}
                title="Back to Step 3: Slang"
              >
                <ChevronLeft size={12} /> Slang
              </button>
            </div>
            <div className="chips-wrap-grid">
              {currentVoiceList.map((v) => {
                const isSelected = currentVoice.id === v.id || config.voice === v.id;
                const isUserVoice = v.id === 'user' || v.gender === 'user';

                return (
                  <button
                    key={v.id}
                    type="button"
                    id={`voice-btn-${v.id}`}
                    className={`clean-selection-chip chip-voice ${isSelected ? 'selected-chip' : ''}`}
                    onClick={() => {
                      onSelectVoice(v.id);
                      if (isUserVoice && !uploadedVoiceFile) {
                        onOpenVoiceModal();
                      }
                    }}
                    title={v.description}
                  >
                    <span className="chip-emoji-icon">{v.icon}</span>
                    <span className="chip-label-primary">{v.name}</span>
                    {v.nativeName && <span className="chip-label-sub">({v.nativeName})</span>}
                    {v.badge && <span className="chip-badge-tag">{v.badge}</span>}
                    {isUserVoice && uploadedVoiceFile && (
                      <span className="chip-badge-tag text-emerald">Ready</span>
                    )}
                    {isSelected && <Check size={12} className="chip-check text-emerald" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: VOICE TONE SELECTION */}
        {currentStep === 'emotion' && (
          <div className="step-selection-row animate-fade-in">
            <div className="step-selection-header-row">
              <span className="step-indicator-tag">Step 5 of 5</span>
              <span className="selection-label">Select Voice Tone (குரல் பாணி):</span>
              <button 
                type="button" 
                className="step-back-link" 
                onClick={() => onSetStep('voice')}
                title="Back to Step 4: Voice"
              >
                <ChevronLeft size={12} /> Voice
              </button>
            </div>
            <div className="chips-wrap-grid">
              {SUPPORTED_EMOTIONS.map((emo) => {
                const isSelected = (config.emotion || 'default') === emo.id;

                return (
                  <button
                    key={emo.id}
                    type="button"
                    id={`emotion-btn-${emo.id}`}
                    className={`clean-selection-chip chip-emotion emotion-${emo.id} ${isSelected ? 'selected-chip' : ''}`}
                    onClick={() => onSelectEmotion(emo.id)}
                    title={emo.description}
                  >
                    <span className="chip-emoji-icon">{emo.icon}</span>
                    <span className="chip-label-primary">{emo.name}</span>
                    {emo.nativeName && (
                      <span className="chip-label-sub">({emo.nativeName.split(' (')[0]})</span>
                    )}
                    {emo.badge && <span className="chip-badge-tag">{emo.badge}</span>}
                    {isSelected && <Check size={12} className="chip-check text-emerald" />}
                  </button>
                );
              })}
            </div>
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
                title={`Change Voice (Step 4)`}
              >
                <Volume2 size={12} className="text-emerald" />
                <span>{currentVoice.icon} {currentVoice.name}</span>
              </button>

              <button 
                type="button" 
                className="clean-selection-chip chip-summary chip-emotion-summary"
                onClick={() => onSetStep('emotion')}
                title="Change Voice Tone (Step 5)"
              >
                <Smile size={12} className="text-amber" />
                <span>{currentEmotion.icon} {currentEmotion.name}</span>
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

            {/* NEAT CLICKABLE 3-OPTION SPEECH SPEED BOX (Appears only after Step 5) */}
            <div className="neat-speed-box" id="speech-speed-container">
              <div className="neat-speed-header">
                <div className="neat-speed-title-wrap">
                  <div className="neat-speed-icon-box">
                    <span className="neat-speed-icon">🎚️</span>
                  </div>
                  <div className="neat-speed-text-wrap">
                    <span className="neat-speed-label">Speech Speed / குரல் வேகம்:</span>
                    <span className="neat-speed-sublabel">Select AI Speaking Pace</span>
                  </div>
                </div>
                <div className={`neat-speed-status-badge badge-speed-${speechSpeed}`}>
                  <span className="neat-speed-badge-dot" />
                  <span className="neat-speed-badge-text">
                    {speechSpeed === 'slow' ? '🐢 Slow (0.75x)' : speechSpeed === 'fast' ? '⚡ Fast (1.4x)' : '▶️ Normal (1.0x)'}
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
                  title="Slow Speed (0.75x) - பொறுமையாக பேசும்"
                >
                  <div className="speed-btn-top">
                    <span className="speed-btn-emoji">🐢</span>
                    <span className="speed-btn-multiplier">0.75x</span>
                  </div>
                  <div className="speed-btn-body">
                    <span className="speed-btn-title">Slow</span>
                    <span className="speed-btn-native">பொறுமையாக</span>
                  </div>
                  {speechSpeed === 'slow' && <span className="speed-btn-active-indicator" />}
                </button>

                {/* 2. NORMAL BUTTON (CENTER & DEFAULT) */}
                <button
                  type="button"
                  id="speed-btn-normal"
                  className={`neat-speed-btn speed-btn-normal ${speechSpeed === 'normal' ? 'speed-btn-active' : ''}`}
                  onClick={() => onChangeSpeechSpeed && onChangeSpeechSpeed('normal')}
                  title="Normal Speed (1.0x) - இயல்பான வேகம் (Default)"
                >
                  <div className="speed-btn-top">
                    <span className="speed-btn-emoji">▶️</span>
                    <span className="speed-btn-multiplier">1.0x</span>
                    <span className="speed-btn-badge-default">Default</span>
                  </div>
                  <div className="speed-btn-body">
                    <span className="speed-btn-title">Normal</span>
                    <span className="speed-btn-native">இயல்பான வேகம்</span>
                  </div>
                  {speechSpeed === 'normal' && <span className="speed-btn-active-indicator" />}
                </button>

                {/* 3. FAST BUTTON */}
                <button
                  type="button"
                  id="speed-btn-fast"
                  className={`neat-speed-btn speed-btn-fast ${speechSpeed === 'fast' ? 'speed-btn-active' : ''}`}
                  onClick={() => onChangeSpeechSpeed && onChangeSpeechSpeed('fast')}
                  title="Fast Speed (1.4x) - வேகமாக பேசும்"
                >
                  <div className="speed-btn-top">
                    <span className="speed-btn-emoji">⚡</span>
                    <span className="speed-btn-multiplier">1.4x</span>
                  </div>
                  <div className="speed-btn-body">
                    <span className="speed-btn-title">Fast</span>
                    <span className="speed-btn-native">வேகமாக</span>
                  </div>
                  {speechSpeed === 'fast' && <span className="speed-btn-active-indicator" />}
                </button>
              </div>
            </div>
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
  );
}
