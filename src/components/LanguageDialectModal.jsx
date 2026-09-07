import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  Globe, 
  MapPin, 
  Radio, 
  Volume2, 
  Smile, 
  ChevronLeft, 
  ChevronRight,
  Lock
} from 'lucide-react';
import { 
  SUPPORTED_LANGUAGES, 
  SUPPORTED_EMOTIONS, 
  getVoicesForLanguage,
  getVoicePreference,
  getEmotionPreference
} from '../constants/languageConfig';

const MODAL_STEP_ORDER = ['language', 'region', 'slang', 'voice', 'emotion'];

export default function LanguageDialectModal({
  isOpen,
  onClose,
  config,
  onCompleteSetup,
  initialStep = 'language'
}) {
  const [modalStep, setModalStep] = useState('language');
  const [selectedLangId, setSelectedLangId] = useState(config?.language || 'tamil');
  const [selectedRegionId, setSelectedRegionId] = useState(config?.region || 'tamil_nadu');
  const [selectedSlangId, setSelectedSlangId] = useState(config?.slang || 'kongu_tamil');
  const [selectedVoiceId, setSelectedVoiceId] = useState(config?.voice || 'female');
  const [selectedEmotionId, setSelectedEmotionId] = useState(config?.emotion || 'default');
  const [langCategoryFilter, setLangCategoryFilter] = useState('all');

  useEffect(() => {
    if (isOpen) {
      setModalStep(initialStep || 'language');
      setSelectedLangId(config?.language || 'tamil');
      setSelectedRegionId(config?.region || 'tamil_nadu');
      setSelectedSlangId(config?.slang || 'kongu_tamil');
      setSelectedVoiceId(config?.voice || 'female');
      setSelectedEmotionId(config?.emotion || 'default');
      setLangCategoryFilter('all');
    }
  }, [isOpen, initialStep, config]);

  if (!isOpen) return null;

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === selectedLangId) || SUPPORTED_LANGUAGES[0];
  const currentRegion = currentLang.regions.find((r) => r.id === selectedRegionId) || currentLang.regions[0];
  const currentSlang = currentLang.slangs.find((s) => s.id === selectedSlangId) || currentLang.slangs[0];
  const voicesList = getVoicesForLanguage(selectedLangId);
  const currentVoiceObj = getVoicePreference(selectedLangId, selectedVoiceId);
  const currentEmotionObj = getEmotionPreference(selectedEmotionId);

  const stepList = [
    { id: 'language', stepNum: 1, label: 'Language', icon: Globe, val: currentLang.nativeName || currentLang.name },
    { id: 'region', stepNum: 2, label: 'Country', icon: MapPin, val: currentRegion.name.split(' (')[0] },
    { id: 'slang', stepNum: 3, label: 'Slang', icon: Radio, val: currentSlang.name },
    { id: 'voice', stepNum: 4, label: 'Voice', icon: Volume2, val: currentVoiceObj.name.split(' ')[0] },
    { id: 'emotion', stepNum: 5, label: 'Tone', icon: Smile, val: currentEmotionObj.name }
  ];

  const currentStepIndex = MODAL_STEP_ORDER.indexOf(modalStep);

  const filteredLanguages = SUPPORTED_LANGUAGES.filter((lang) => {
    if (langCategoryFilter === 'indian') return lang.category === 'indian';
    if (langCategoryFilter === 'global') return lang.category === 'global';
    return true;
  });

  const handleChooseLanguage = (langId) => {
    const langObj = SUPPORTED_LANGUAGES.find((l) => l.id === langId) || SUPPORTED_LANGUAGES[0];
    setSelectedLangId(langId);
    setSelectedRegionId(langObj.defaultRegion);
    setSelectedSlangId(langObj.slangs[0].id);
    setSelectedVoiceId(langObj.defaultVoice || 'female');
    setModalStep('region');
  };

  const handleChooseRegion = (regId) => {
    setSelectedRegionId(regId);
    setModalStep('slang');
  };

  const handleChooseSlang = (slangId) => {
    setSelectedSlangId(slangId);
    setModalStep('voice');
  };

  const handleChooseVoice = (voiceId) => {
    setSelectedVoiceId(voiceId);
    setModalStep('emotion');
  };

  const handleChooseEmotion = (emoId) => {
    setSelectedEmotionId(emoId);
    if (onCompleteSetup) {
      onCompleteSetup({
        language: selectedLangId,
        region: selectedRegionId,
        slang: selectedSlangId,
        voice: selectedVoiceId,
        emotion: emoId
      });
    }
    onClose();
  };

  const handleGoBack = () => {
    if (modalStep === 'emotion') setModalStep('voice');
    else if (modalStep === 'voice') setModalStep('slang');
    else if (modalStep === 'slang') setModalStep('region');
    else if (modalStep === 'region') setModalStep('language');
  };

  return (
    <div className="dialect-modal-backdrop" onClick={onClose}>
      <div className="dialect-modal-content modal-wizard-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="dialect-modal-header">
          <div className="dialect-header-left">
            <div className="dialect-icon-box">
              <Globe size={20} />
            </div>
            <div>
              <div className="wizard-step-badge">
                <span>Step {currentStepIndex + 1} of 5</span>
              </div>
              <h2 className="dialect-modal-title">
                {modalStep === 'language' && 'Step 1: Select Language (மொழி / भाषा)'}
                {modalStep === 'region' && `Step 2: Select Country (${currentLang.name})`}
                {modalStep === 'slang' && `Step 3: Select Slang Style (${currentLang.name})`}
                {modalStep === 'voice' && `Step 4: Select Voice Model (${currentLang.name})`}
                {modalStep === 'emotion' && 'Step 5: Select Voice Tone (குரல் பாணி)'}
              </h2>
            </div>
          </div>
          <button className="dialect-modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="modal-wizard-stepper">
          {stepList.map((st, idx) => {
            const isCurrent = modalStep === st.id;
            const isCompleted = idx < currentStepIndex;
            const isClickable = idx <= currentStepIndex;

            return (
              <React.Fragment key={st.id}>
                <button
                  type="button"
                  className={`modal-step-tab ${isCurrent ? 'step-tab-current' : isCompleted ? 'step-tab-done' : 'step-tab-locked'}`}
                  onClick={() => {
                    if (isClickable) setModalStep(st.id);
                  }}
                  disabled={!isClickable}
                  title={!isClickable ? 'Complete previous steps first' : `Go to ${st.label}`}
                >
                  <span className="step-number-circle">
                    {isCompleted ? <Check size={11} className="text-emerald" /> : st.stepNum}
                  </span>
                  <span className="step-tab-name">{st.label}</span>
                  {!isClickable && <Lock size={9} className="step-tab-lock" />}
                </button>
                {idx < stepList.length - 1 && (
                  <div className={`modal-step-connector ${isCompleted ? 'connector-done' : ''}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="dialect-modal-body">
          {/* STEP 1: LANGUAGE SELECTION */}
          {modalStep === 'language' && (
            <div className="wizard-step-pane animate-fade-in">
              <div className="wizard-pane-top-row">
                <p className="wizard-step-instruction">
                  Choose your primary language:
                </p>
                <div className="wizard-lang-count-badge">
                  <span>6 Core Languages</span>
                </div>
              </div>
              <div className="modal-cards-grid">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = selectedLangId === lang.id;
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      className={`wizard-selection-card ${isSelected ? 'card-is-selected' : ''}`}
                      onClick={() => handleChooseLanguage(lang.id)}
                    >
                      <div className="card-flag-lg">{lang.flag}</div>
                      <div className="card-content-wrap">
                        <div className="card-title-row">
                          <span className="card-primary-title">{lang.name}</span>
                          {isSelected && <Check size={15} className="text-emerald" />}
                        </div>
                        <span className="card-sub-native">{lang.nativeName}</span>
                        <span className="card-slangs-count">{lang.slangs.length} Regional Dialects Available</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: COUNTRY / REGION SELECTION */}
          {modalStep === 'region' && (
            <div className="wizard-step-pane animate-fade-in">
              <div className="wizard-pane-nav">
                <button type="button" className="wizard-back-btn" onClick={handleGoBack}>
                  <ChevronLeft size={14} /> Back to Language
                </button>
                <span className="wizard-context-tag">Language: {currentLang.name}</span>
              </div>
              <p className="wizard-step-instruction">
                Select your country or state for authentic geographical accents.
              </p>
              <div className="modal-cards-grid">
                {currentLang.regions.map((reg) => {
                  const isSelected = selectedRegionId === reg.id;
                  return (
                    <button
                      key={reg.id}
                      type="button"
                      className={`wizard-selection-card ${isSelected ? 'card-is-selected' : ''}`}
                      onClick={() => handleChooseRegion(reg.id)}
                    >
                      <div className="card-icon-circle text-blue">
                        <MapPin size={18} />
                      </div>
                      <div className="card-content-wrap">
                        <div className="card-title-row">
                          <span className="card-primary-title">{reg.name}</span>
                          {isSelected && <Check size={15} className="text-emerald" />}
                        </div>
                        <span className="card-sub-native">Regional Dialect Base</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: SLANG / DIALECT SELECTION */}
          {modalStep === 'slang' && (
            <div className="wizard-step-pane animate-fade-in">
              <div className="wizard-pane-nav">
                <button type="button" className="wizard-back-btn" onClick={handleGoBack}>
                  <ChevronLeft size={14} /> Back to Country
                </button>
                <span className="wizard-context-tag">{currentRegion.name}</span>
              </div>
              <p className="wizard-step-instruction">
                Select your preferred slang / conversational speaking style.
              </p>
              <div className="modal-cards-grid">
                {currentLang.slangs.map((slang) => {
                  const isSelected = selectedSlangId === slang.id;
                  return (
                    <button
                      key={slang.id}
                      type="button"
                      className={`wizard-selection-card dialect-slang-card ${isSelected ? 'card-is-selected' : ''}`}
                      onClick={() => handleChooseSlang(slang.id)}
                    >
                      <div className="slang-card-top">
                        <span className="slang-card-title">{slang.name}</span>
                        {isSelected && <Check size={15} className="text-emerald" />}
                      </div>
                      <span className="slang-card-native">{slang.nativeName}</span>
                      <p className="slang-card-desc">{slang.description}</p>
                      <div className="slang-sample-pill">
                        <Sparkles size={11} className="sample-icon" />
                        <span>"{slang.sampleGreeting}"</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: VOICE MODEL SELECTION */}
          {modalStep === 'voice' && (
            <div className="wizard-step-pane animate-fade-in">
              <div className="wizard-pane-nav">
                <button type="button" className="wizard-back-btn" onClick={handleGoBack}>
                  <ChevronLeft size={14} /> Back to Slang
                </button>
                <span className="wizard-context-tag">{currentSlang.name}</span>
              </div>
              <p className="wizard-step-instruction">
                Choose the voice profile: Male, Female, or Cloned Own Voice.
              </p>
              <div className="modal-cards-grid">
                {voicesList.map((v) => {
                  const isSelected = selectedVoiceId === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      className={`wizard-selection-card ${isSelected ? 'card-is-selected' : ''}`}
                      onClick={() => handleChooseVoice(v.id)}
                    >
                      <div className="card-emoji-lg">{v.icon}</div>
                      <div className="card-content-wrap">
                        <div className="card-title-row">
                          <span className="card-primary-title">{v.name}</span>
                          {isSelected && <Check size={15} className="text-emerald" />}
                        </div>
                        {v.nativeName && <span className="card-sub-native">{v.nativeName}</span>}
                        <p className="slang-card-desc">{v.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: VOICE TONE SELECTION */}
          {modalStep === 'emotion' && (
            <div className="wizard-step-pane animate-fade-in">
              <div className="wizard-pane-nav">
                <button type="button" className="wizard-back-btn" onClick={handleGoBack}>
                  <ChevronLeft size={14} /> Back to Voice
                </button>
                <span className="wizard-context-tag">Final Step: Select Tone</span>
              </div>
              <p className="wizard-step-instruction">
                Choose the emotional expression and speaking tone (குரல் பாணி).
              </p>
              <div className="modal-cards-grid emotions-modal-grid">
                {SUPPORTED_EMOTIONS.map((emo) => {
                  const isSelected = selectedEmotionId === emo.id;
                  return (
                    <button
                      key={emo.id}
                      type="button"
                      className={`dialect-emotion-card ${isSelected ? 'emotion-card-selected' : ''}`}
                      onClick={() => handleChooseEmotion(emo.id)}
                    >
                      <div className="emotion-card-icon">{emo.icon}</div>
                      <div className="emotion-card-info">
                        <div className="emotion-card-title-row">
                          <span className="emotion-card-name">{emo.name}</span>
                          {isSelected && <Check size={13} className="text-emerald" />}
                        </div>
                        <span className="emotion-card-native">{emo.nativeName}</span>
                        <span className="emotion-card-desc-text">{emo.description}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
