import React, { useState, useEffect } from 'react';
import { 
  X, 
  Globe, 
  Sparkles, 
  Check, 
  Radio, 
  Volume2, 
  Smile, 
  ChevronRight, 
  ArrowLeft,
  Sliders
} from 'lucide-react';
import { 
  getVoicePreference, 
  getEmotionPreference, 
  SUPPORTED_LANGUAGES 
} from '../constants/languageConfig';

// 6 Target Languages for compact selector
const COMPACT_LANGUAGES = [
  { id: 'tamil', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', defaultSlangId: 'kongu_tamil', suggestedStyleName: 'Kongu Tamil' },
  { id: 'english', name: 'English', nativeName: 'English', flag: '🇬🇧', defaultSlangId: 'indian_english', suggestedStyleName: 'Indian English' },
  { id: 'hindi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', defaultSlangId: 'standard_hindi', suggestedStyleName: 'Standard Hindi' },
  { id: 'telugu', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', defaultSlangId: 'telangana_telugu', suggestedStyleName: 'Telangana Telugu' },
  { id: 'malayalam', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', defaultSlangId: 'standard_malayalam', suggestedStyleName: 'Standard Malayalam' },
  { id: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', defaultSlangId: 'standard_kannada', suggestedStyleName: 'Standard Kannada' }
];

// Rich style options matching exact requested lists
const LANGUAGE_STYLES = {
  english: [
    { id: 'american_standard', name: 'Standard English', nativeName: 'Standard English' },
    { id: 'indian_english', name: 'Indian English', nativeName: 'Indian English' },
    { id: 'casual_indian_english', name: 'Casual Indian English', nativeName: 'Casual Indian English' },
    { id: 'british_standard', name: 'British English', nativeName: 'British English' },
    { id: 'british_casual', name: 'Casual British English', nativeName: 'Casual British English' },
    { id: 'australian_casual', name: 'Australian English', nativeName: 'Australian English' },
    { id: 'american_casual', name: 'Casual American English', nativeName: 'Casual American English' }
  ],
  tamil: [
    { id: 'standard_tamil', name: 'Standard Tamil', nativeName: 'செந்தமிழ் / பொதுத் தமிழ்' },
    { id: 'kongu_tamil', name: 'Kongu Tamil', nativeName: 'கொங்கு தமிழ் (கோவை / ஈரோடு)' },
    { id: 'chennai_tamil', name: 'Chennai Tamil', nativeName: 'சென்னை தமிழ் (மெட்ராஸ் பாஷை)' },
    { id: 'madurai_tamil', name: 'Madurai Tamil', nativeName: 'மதுரை தமிழ் (தென் பாஷை)' },
    { id: 'nellai_tamil', name: 'Nellai Tamil', nativeName: 'நெல்லை தமிழ் (திருநெல்வேலி)' },
    { id: 'coimbatore_tamil', name: 'Coimbatore Tamil', nativeName: 'கோயம்புத்தூர் கொங்கு தமிழ்' },
    { id: 'sri_lanka_tamil', name: 'Sri Lankan Tamil', nativeName: 'இலங்கை தமிழ் (யாழ்ப்பாணம்)' }
  ],
  hindi: [
    { id: 'standard_hindi', name: 'Standard Hindi', nativeName: 'मानक हिन्दी (Standard)' },
    { id: 'delhi_hindi', name: 'Delhi Style', nativeName: 'दिल्ली हिन्दी (Delhi / NCR)' },
    { id: 'mumbai_hindi', name: 'Mumbai Style', nativeName: 'मुंबईया हिन्दी (Bambaiya)' },
    { id: 'up_hindi', name: 'Uttar Pradesh Style', nativeName: 'यूपी स्टाइल हिन्दी (UP / Awadhi)' },
    { id: 'bihar_hindi', name: 'Bihar Style', nativeName: 'बिहारी हिन्दी (Bhojpuri Mix)' }
  ],
  telugu: [
    { id: 'standard_telugu', name: 'Standard Telugu', nativeName: 'ప్రామాణిక తెలుగు' },
    { id: 'telangana_telugu', name: 'Telangana Telugu', nativeName: 'తెలంగాణ తెలుగు' },
    { id: 'andhra_telugu', name: 'Andhra Telugu', nativeName: 'ఆంధ్ర తెలుగు (కోస్తా)' },
    { id: 'hyderabad_telugu', name: 'Hyderabad Style', nativeName: 'హైదరాబాద్ తెలుగు' }
  ],
  malayalam: [
    { id: 'standard_malayalam', name: 'Standard Malayalam', nativeName: 'ശുദ്ധ മലയാളം' },
    { id: 'malabar_malayalam', name: 'Malabar Style', nativeName: 'മലബാർ ശൈലി' },
    { id: 'travancore_malayalam', name: 'Travancore Style', nativeName: 'തിരുവിതാംകൂർ ശൈലി' },
    { id: 'kochi_malayalam', name: 'Kochi Central Style', nativeName: 'കൊച്ചി ശൈലി' }
  ],
  kannada: [
    { id: 'standard_kannada', name: 'Standard Kannada', nativeName: 'ಪ್ರಾಮಾಣಿಕ ಕನ್ನಡ' },
    { id: 'bengaluru_kannada', name: 'Bengaluru Style', nativeName: 'ಬೆಂಗಳೂರು ಕನ್ನಡ' },
    { id: 'mysuru_kannada', name: 'Mysuru Style', nativeName: 'ಮೈಸೂರು ಕನ್ನಡ' },
    { id: 'hubbali_kannada', name: 'Hubbali-Dharwad Style', nativeName: 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ ಶೈಲಿ' }
  ]
};

// Available Voice Options
const OPTIONAL_VOICES = [
  { id: 'female', name: 'Female', icon: '👩', desc: 'Clear, gentle studio voice' },
  { id: 'male', name: 'Male', icon: '👨', desc: 'Deep, crisp studio voice' },
  { id: 'deep', name: 'Deep', icon: '🎙️', desc: 'Resonant, warm radio host timbre' },
  { id: 'soft', name: 'Soft', icon: '✨', desc: 'Gentle, soothing voice' },
  { id: 'user', name: 'My Voice', icon: '🎙️', desc: 'Custom cloned voice sample' }
];

// Available Tone Options
const OPTIONAL_TONES = [
  { id: 'friendly', name: 'Friendly', icon: '🤝', desc: 'Warm and approachable' },
  { id: 'happy', name: 'Happy', icon: '😊', desc: 'Joyful, bright, upbeat' },
  { id: 'calm', name: 'Calm', icon: '🧘', desc: 'Peaceful, relaxed' },
  { id: 'sad', name: 'Sad', icon: '🥺', desc: 'Gentle, empathetic' },
  { id: 'excited', name: 'Excited', icon: '🤩', desc: 'High-energy, vibrant' }
];

export default function CompactChangeLanguageModal({
  isOpen,
  onClose,
  config,
  onApplyLanguageChange
}) {
  const [viewMode, setViewMode] = useState('pick_language'); // 'pick_language' | 'smart_suggest' | 'custom_style'
  const [targetLangId, setTargetLangId] = useState(config?.language || 'tamil');
  const [targetSlangId, setTargetSlangId] = useState(config?.slang || 'kongu_tamil');
  const [targetVoiceId, setTargetVoiceId] = useState(config?.voice || 'female');
  const [targetEmotionId, setTargetEmotionId] = useState(config?.emotion || 'friendly');

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setViewMode('pick_language');
      setTargetLangId(config?.language || 'tamil');
      setTargetSlangId(config?.slang || 'kongu_tamil');
      setTargetVoiceId(config?.voice || 'female');
      setTargetEmotionId(config?.emotion || 'friendly');
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const currentSelectedLangObj = COMPACT_LANGUAGES.find((l) => l.id === targetLangId) || COMPACT_LANGUAGES[0];
  const availableStyles = LANGUAGE_STYLES[targetLangId] || LANGUAGE_STYLES.english;
  const currentSelectedStyleObj = availableStyles.find((s) => s.id === targetSlangId) || availableStyles[0];
  const currentVoiceObj = OPTIONAL_VOICES.find((v) => v.id === targetVoiceId) || OPTIONAL_VOICES[0];
  const currentEmotionObj = OPTIONAL_TONES.find((t) => t.id === targetEmotionId) || OPTIONAL_TONES[0];

  // Pick a language from step 1
  const handleSelectLanguage = (langId) => {
    const langObj = COMPACT_LANGUAGES.find((l) => l.id === langId) || COMPACT_LANGUAGES[0];
    setTargetLangId(langId);
    setTargetSlangId(langObj.defaultSlangId);
    setViewMode('smart_suggest');
  };

  // Continue with suggested style while preserving voice and emotion
  const handleContinueWithSuggested = () => {
    onApplyLanguageChange({
      language: targetLangId,
      slang: targetSlangId,
      voice: targetVoiceId,
      emotion: targetEmotionId
    });
    onClose();
  };

  // Continue from custom style view
  const handleContinueWithCustom = () => {
    onApplyLanguageChange({
      language: targetLangId,
      slang: targetSlangId,
      voice: targetVoiceId,
      emotion: targetEmotionId
    });
    onClose();
  };

  return (
    <div className="compact-lang-modal-backdrop" onClick={onClose}>
      <div className="compact-lang-modal-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="compact-lang-header">
          <div className="compact-lang-header-left">
            <div className="compact-lang-icon-circle">
              <Globe size={18} />
            </div>
            <div>
              <h3 className="compact-lang-title">Change Language</h3>
              <span className="compact-lang-subtitle">
                {viewMode === 'pick_language' && 'Select your conversation language'}
                {viewMode === 'smart_suggest' && `${currentSelectedLangObj.name} Selected`}
                {viewMode === 'custom_style' && `Customize ${currentSelectedLangObj.name} Style & Voice`}
              </span>
            </div>
          </div>
          <button type="button" className="compact-lang-close-btn" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* BODY VIEW 1: Pick Language (6 Supported Languages) */}
        {viewMode === 'pick_language' && (
          <div className="compact-lang-body">
            <div className="compact-languages-grid">
              {COMPACT_LANGUAGES.map((lang) => {
                const isSelected = config?.language === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    className={`compact-lang-item-btn ${isSelected ? 'active-lang-item' : ''}`}
                    onClick={() => handleSelectLanguage(lang.id)}
                  >
                    <span className="lang-item-flag">{lang.flag}</span>
                    <div className="lang-item-labels">
                      <span className="lang-item-primary">{lang.name}</span>
                      <span className="lang-item-native">{lang.nativeName}</span>
                    </div>
                    {isSelected && <Check size={14} className="text-emerald lang-check-icon" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* BODY VIEW 2: Smart Suggestion Card */}
        {viewMode === 'smart_suggest' && (
          <div className="compact-lang-body">
            <div className="smart-suggest-card">
              <div className="smart-suggest-top-banner">
                <span className="suggest-flag-lg">{currentSelectedLangObj.flag}</span>
                <div>
                  <h4 className="suggest-lang-heading">{currentSelectedLangObj.name} Selected</h4>
                  <span className="suggest-subtext">Settings adjusted intelligently</span>
                </div>
              </div>

              <div className="smart-suggest-specs-list">
                <div className="suggest-spec-item">
                  <span className="spec-label">Suggested Style:</span>
                  <span className="spec-value highlight-cyan">
                    <Radio size={12} className="inline mr-1 text-cyan" />
                    {currentSelectedStyleObj.name}
                  </span>
                </div>

                <div className="suggest-spec-item">
                  <span className="spec-label">Current Voice:</span>
                  <span className="spec-value">
                    <Volume2 size={12} className="inline mr-1 text-emerald" />
                    {currentVoiceObj.name} ({currentVoiceObj.icon})
                  </span>
                </div>

                <div className="suggest-spec-item">
                  <span className="spec-label">Current Tone:</span>
                  <span className="spec-value">
                    <Smile size={12} className="inline mr-1 text-amber" />
                    {currentEmotionObj.name} ({currentEmotionObj.icon})
                  </span>
                </div>
              </div>

              <div className="smart-suggest-actions-row">
                <button
                  type="button"
                  className="suggest-btn-change-style"
                  onClick={() => setViewMode('custom_style')}
                >
                  <Sliders size={14} />
                  <span>Change Style</span>
                </button>

                <button
                  type="button"
                  className="suggest-btn-continue"
                  onClick={handleContinueWithSuggested}
                >
                  <span>Continue</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BODY VIEW 3: Custom Style Options + Optional Voice & Tone */}
        {viewMode === 'custom_style' && (
          <div className="compact-lang-body custom-style-body-scroll">
            {/* Top Navigation */}
            <div className="custom-style-top-nav">
              <button
                type="button"
                className="custom-style-back-btn"
                onClick={() => setViewMode('smart_suggest')}
              >
                <ArrowLeft size={13} />
                <span>Back to Suggestion</span>
              </button>
              <span className="custom-style-lang-badge">
                {currentSelectedLangObj.flag} {currentSelectedLangObj.name}
              </span>
            </div>

            {/* 1. Style Selection */}
            <div className="custom-style-section">
              <span className="custom-section-title">
                <Radio size={13} className="text-cyan inline mr-1" />
                Select Style / Slang:
              </span>
              <div className="custom-chips-grid">
                {availableStyles.map((style) => {
                  const isSelected = targetSlangId === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      className={`custom-chip-btn ${isSelected ? 'chip-active' : ''}`}
                      onClick={() => setTargetSlangId(style.id)}
                    >
                      <span className="chip-btn-title">{style.name}</span>
                      {style.nativeName && <span className="chip-btn-sub">{style.nativeName}</span>}
                      {isSelected && <Check size={12} className="text-emerald" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Optional Voice Selection */}
            <div className="custom-style-section">
              <span className="custom-section-title">
                <Volume2 size={13} className="text-emerald inline mr-1" />
                Optional Voice Profile:
              </span>
              <div className="custom-chips-grid voice-chips-grid">
                {OPTIONAL_VOICES.map((v) => {
                  const isSelected = targetVoiceId === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      className={`custom-chip-btn ${isSelected ? 'chip-active' : ''}`}
                      onClick={() => setTargetVoiceId(v.id)}
                    >
                      <span className="chip-emoji">{v.icon}</span>
                      <span className="chip-btn-title">{v.name}</span>
                      {isSelected && <Check size={12} className="text-emerald" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Optional Tone Selection */}
            <div className="custom-style-section">
              <span className="custom-section-title">
                <Smile size={13} className="text-amber inline mr-1" />
                Optional Voice Tone:
              </span>
              <div className="custom-chips-grid tone-chips-grid">
                {OPTIONAL_TONES.map((t) => {
                  const isSelected = targetEmotionId === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      className={`custom-chip-btn ${isSelected ? 'chip-active' : ''}`}
                      onClick={() => setTargetEmotionId(t.id)}
                    >
                      <span className="chip-emoji">{t.icon}</span>
                      <span className="chip-btn-title">{t.name}</span>
                      {isSelected && <Check size={12} className="text-emerald" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Continue Action */}
            <div className="custom-style-footer">
              <button
                type="button"
                className="custom-style-continue-btn"
                onClick={handleContinueWithCustom}
              >
                <span>Continue with Selected Settings</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
