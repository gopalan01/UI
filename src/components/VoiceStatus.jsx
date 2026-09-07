import React from 'react';
import { 
  Radio, 
  Mic, 
  Cpu, 
  Volume2, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, getVoicePreference, getEmotionPreference } from '../constants/languageConfig';

export default function VoiceStatus({ 
  state = 'idle', 
  errorMessage = '', 
  config = { language: 'tamil', slang: 'kongu_tamil', voice: 'female', emotion: 'default' } 
}) {
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === config.language) || SUPPORTED_LANGUAGES[0];
  const currentSlang = currentLang.slangs.find((s) => s.id === config.slang) || currentLang.slangs[0];
  const currentVoice = getVoicePreference(config.language, config.voice);
  const currentEmotion = getEmotionPreference(config.emotion || 'default');

  const getStatusContent = () => {
    switch (state) {
      case 'listening':
        return {
          title: `Listening in ${currentLang.name}...`,
          description: `Speak now in ${currentSlang.name} (${currentEmotion.name} mood) — capturing voice`,
          icon: Mic,
          badgeClass: 'status-badge-listening'
        };
      case 'thinking':
        return {
          title: `Processing in ${currentSlang.name}...`,
          description: `Synthesizing ${currentVoice.name} [${currentEmotion.icon} ${currentEmotion.name}] answer`,
          icon: Cpu,
          badgeClass: 'status-badge-thinking'
        };
      case 'speaking':
        return {
          title: `AI Speaking (${currentVoice.name} • ${currentEmotion.icon} ${currentEmotion.name})...`,
          description: `Audio synthesized in ${currentSlang.name} (${currentEmotion.badge} tone)`,
          icon: Volume2,
          badgeClass: 'status-badge-speaking'
        };
      case 'uploading':
        return {
          title: 'Uploading your voice sample...',
          description: 'Extracting audio frequencies for personalized cloned voice',
          icon: UploadCloud,
          badgeClass: 'status-badge-uploading'
        };
      case 'ready':
        return {
          title: 'Voice Studio Active',
          description: `${currentLang.name} • ${currentSlang.name} • ${currentVoice.name} • ${currentEmotion.icon} ${currentEmotion.name}`,
          icon: CheckCircle2,
          badgeClass: 'status-badge-ready'
        };
      case 'error':
        return {
          title: 'Voice Engine Notice',
          description: errorMessage || 'Could not recognize voice. Please try again.',
          icon: AlertCircle,
          badgeClass: 'status-badge-error'
        };
      case 'idle':
      default:
        return {
          title: `Ready: ${currentSlang.name} (${currentVoice.name} • ${currentEmotion.icon} ${currentEmotion.name})`,
          description: `Voice synthesis active in ${currentLang.name}. Tap the mic or choose any question.`,
          icon: Radio,
          badgeClass: 'status-badge-idle'
        };
    }
  };

  const status = getStatusContent();
  const IconComponent = status.icon;

  return (
    <div className="voice-status-section">
      <div className={`voice-status-pill ${status.badgeClass}`}>
        <IconComponent size={16} className="voice-status-icon" />
        <span className="voice-status-title">{status.title}</span>
      </div>
      <p className="voice-status-description">{status.description}</p>
    </div>
  );
}
