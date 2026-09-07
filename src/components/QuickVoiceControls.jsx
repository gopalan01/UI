import React from 'react';
import { RotateCcw, VolumeX, UserCheck, Radio } from 'lucide-react';
import { SUPPORTED_LANGUAGES, getVoicePreference, getEmotionPreference } from '../constants/languageConfig';

export default function QuickVoiceControls({
  config,
  onResetSetup,
  onQuickChangeVoice,
  onOpenDialectModal,
  isSpeaking,
  onStopSpeech
}) {
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === config.language);
  const currentSlang = currentLang?.slangs.find((s) => s.id === config.slang);
  const currentVoice = getVoicePreference(config.language, config.voice);
  const currentEmotion = getEmotionPreference(config.emotion || 'default');

  return (
    <div className="quick-controls-bar">
      {/* Active Profile Summary */}
      <div className="profile-summary-tags">
        <div className="tag-item" title="Active Language">
          <span className="tag-bullet bullet-purple" />
          <span className="tag-label">{currentLang?.name || 'Tamil'}</span>
        </div>

        <div className="tag-item" title="Active Regional Slang">
          <span className="tag-bullet bullet-cyan" />
          <span className="tag-label">{currentSlang?.name || 'Kongu Tamil'}</span>
        </div>

        <div className="tag-item" title="Voice Model">
          <span className="tag-bullet bullet-emerald" />
          <span className="tag-label">{currentVoice?.name || 'Female Voice'}</span>
        </div>

        <div className="tag-item" title="Voice Tone">
          <span className="tag-bullet bullet-amber" />
          <span className="tag-label">{currentEmotion?.icon} {currentEmotion?.name || 'Default'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="quick-action-group">
        {isSpeaking && (
          <button
            className="quick-btn btn-danger"
            onClick={onStopSpeech}
            title="Stop AI voice output"
          >
            <VolumeX size={14} />
            <span>Stop Voice</span>
          </button>
        )}

        <button
          className="quick-btn btn-secondary"
          onClick={onOpenDialectModal}
          title="Switch Language or Dialect (Kongu Tamil, Chennai Tamil, etc.)"
        >
          <Radio size={14} className="text-cyan" />
          <span>Change Dialect</span>
        </button>

        <button
          className="quick-btn btn-secondary"
          onClick={onQuickChangeVoice}
          title="Switch between Male, Female, or Uploaded Voice"
        >
          <UserCheck size={14} />
          <span>Switch Voice</span>
        </button>

        <button
          className="quick-btn btn-secondary"
          onClick={onResetSetup}
          title="Re-run voice onboarding setup"
        >
          <RotateCcw size={14} />
          <span>Reset Setup</span>
        </button>
      </div>
    </div>
  );
}
