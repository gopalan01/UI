import React from 'react';
import { 
  Sparkles, 
  Cpu, 
  Volume2, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';

export default function AICharacter({ state = 'idle', customMessage = '', emotion = 'default' }) {
  // State metadata
  const stateMeta = {
    idle: {
      label: 'IDLE / READY',
      icon: Sparkles,
      colorClass: 'state-idle',
      subtext: 'THAMILI AI Core is ready'
    },
    listening: {
      label: 'LISTENING...',
      icon: Sparkles,
      colorClass: 'state-listening',
      subtext: 'Receiving voice audio stream'
    },
    thinking: {
      label: 'PROCESSING...',
      icon: Cpu,
      colorClass: 'state-thinking',
      subtext: 'Synthesizing dialect & intent'
    },
    speaking: {
      label: 'SPEAKING...',
      icon: Volume2,
      colorClass: 'state-speaking',
      subtext: 'Generating voice output'
    },
    uploading: {
      label: 'UPLOADING VOICE...',
      icon: UploadCloud,
      colorClass: 'state-uploading',
      subtext: 'Analyzing audio spectrum'
    },
    ready: {
      label: 'VOICE READY',
      icon: CheckCircle2,
      colorClass: 'state-ready',
      subtext: 'Voice preference locked'
    },
    error: {
      label: 'ATTENTION NEEDED',
      icon: AlertCircle,
      colorClass: 'state-error',
      subtext: customMessage || 'Please check microphone'
    }
  };

  const current = stateMeta[state] || stateMeta.idle;
  const StateIcon = current.icon;

  return (
    <div className={`ai-character-container ${current.colorClass} emotion-aura-${emotion}`} aria-label={`AI Character: ${current.label}`}>
      {/* Main Clean Professional AI Orb */}
      <div className="ai-character-orb">
        {/* Soft Ambient Glow */}
        <div className="orb-backdrop-glow" />

        {/* Clean Professional Core */}
        <div className="orb-core">
          <div className="orb-inner-gradient" />

          {/* Central AI State Icon */}
          <div className="orb-center-icon">
            <StateIcon size={26} className="center-svg-icon" />
          </div>
        </div>
      </div>

      {/* State Status Tag */}
      <div className="ai-state-badge">
        <span className="state-badge-dot" />
        <span className="state-badge-text">{current.label}</span>
      </div>
    </div>
  );
}

