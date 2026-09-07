import React from 'react';
import { 
  Sparkles, 
  Mic, 
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
      icon: Mic,
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
      {/* Outer Quantum Wave Energy Rings */}
      <div className="quantum-energy-aura">
        <div className="energy-ring ring-1" />
        <div className="energy-ring ring-2" />
      </div>

      {/* Main 3D Quantum Neural AI Orb */}
      <div className="ai-character-orb">
        {/* Ambient Neural Back Glow */}
        <div className="orb-backdrop-glow" />

        {/* 3D Quantum Wireframe Latitude & Longitude Gyro Spheres (Distinct from Mic) */}
        <div className="quantum-gyro-frame">
          <div className="quantum-axis-ring axis-lat" />
          <div className="quantum-axis-ring axis-long" />
          <div className="quantum-axis-ring axis-diagonal" />
        </div>

        {/* Orbiting Prismatic Diamond Shards */}
        <div className="prismatic-shards-layer">
          <div className="prismatic-shard shard-1" />
          <div className="prismatic-shard shard-2" />
          <div className="prismatic-shard shard-3" />
          <div className="prismatic-shard shard-4" />
        </div>

        {/* Glassmorphic Cyber Quantum Core */}
        <div className="orb-core">
          <div className="orb-inner-gradient" />
          <div className="orb-hologram-mesh" />
          <div className="orb-quantum-lattice" />

          {/* Equalizer Frequency Bars (Speaking & Listening) */}
          {(state === 'speaking' || state === 'listening') && (
            <div className="audio-bars-container">
              <span className="audio-bar bar-1" />
              <span className="audio-bar bar-2" />
              <span className="audio-bar bar-3" />
              <span className="audio-bar bar-4" />
              <span className="audio-bar bar-5" />
              <span className="audio-bar bar-6" />
              <span className="audio-bar bar-7" />
            </div>
          )}

          {/* Central AI State Icon */}
          <div className="orb-center-icon">
            <StateIcon size={28} className="center-svg-icon" />
          </div>

          {/* Core Sparkle Points */}
          <div className="orb-sparkle-dot dot-1" />
          <div className="orb-sparkle-dot dot-2" />
          <div className="orb-sparkle-dot dot-3" />
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

