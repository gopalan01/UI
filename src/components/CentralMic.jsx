import React from 'react';
import { Mic, Square, Volume2 } from 'lucide-react';

export default function CentralMic({
  isListening,
  isSpeaking,
  state = 'idle',
  onMicClick,
  onStopSpeech
}) {
  const getButtonClass = () => {
    if (isListening) return 'mic-listening';
    if (isSpeaking) return 'mic-speaking';
    if (state === 'thinking') return 'mic-thinking';
    return 'mic-idle';
  };

  const getStatusText = () => {
    if (isListening) return 'LISTENING LIVE';
    if (isSpeaking) return 'SPEAKING OUTPUT';
    if (state === 'thinking') return 'PROCESSING INTENT';
    return 'TAP TO RECORD';
  };

  return (
    <div 
      className={`central-mic-container mic-state-${state} ${isListening ? 'is-listening' : ''} ${isSpeaking ? 'is-speaking' : ''}`} 
      aria-label="Interactive Microphone Stage"
    >
      {/* Clean Acoustic Wave Ripple (Subtle & Elegant Echo on Idle / Active) */}
      <div className="mic-clean-echo-container">
        <div className={`mic-echo-wave wave-1 ${isListening ? 'echo-listening' : isSpeaking ? 'echo-speaking' : 'echo-idle'}`} />
        <div className={`mic-echo-wave wave-2 ${isListening ? 'echo-listening' : isSpeaking ? 'echo-speaking' : 'echo-idle'}`} />
      </div>

      {/* Main Mic Interactive Stage */}
      <div className="mic-interactive-stage">
        {/* Soft Fluid Background Aura */}
        <div className={`mic-backdrop-glow ${isListening ? 'glow-listening' : isSpeaking ? 'glow-speaking' : state === 'thinking' ? 'glow-thinking' : 'glow-idle'}`} />

        {/* Clean Luminous Orbit Ring (Ultra-crisp, elegant, non-cluttered) */}
        <div className="mic-luminous-orbit">
          <div className="mic-orbit-arc" />
          <div className="mic-orbit-node" />
        </div>

        {/* Premium Central Glass Mic Capsule Button */}
        <button
          id="central-microphone-btn"
          className={`central-mic-button ${getButtonClass()}`}
          onClick={isSpeaking ? onStopSpeech : onMicClick}
          aria-label={isListening ? 'Stop Listening' : isSpeaking ? 'Mute AI Voice' : 'Tap to Speak'}
          title={isListening ? 'Click to stop listening' : isSpeaking ? 'Click to mute AI output' : 'Click to speak to THAMILI AI'}
        >
          {/* Subtle Inner Glass Sheen */}
          <div className="mic-btn-inner-glow" />
          <div className="mic-conic-border-glow" />

          {isListening ? (
            <div className="mic-active-content">
              {/* Clean Modern Equalizer Bars inside mic button when listening */}
              <div className="mic-inner-equalizer">
                <span className="eq-bar bar-1" />
                <span className="eq-bar bar-2" />
                <span className="eq-bar bar-3" />
                <span className="eq-bar bar-4" />
                <span className="eq-bar bar-5" />
              </div>
              <Square size={26} className="mic-stop-icon" />
              <span className="mic-action-caption">Stop</span>
            </div>
          ) : isSpeaking ? (
            <div className="mic-active-content" onClick={(e) => { e.stopPropagation(); onStopSpeech(); }}>
              <Volume2 size={30} className="mic-speaking-icon" />
              <span className="mic-action-caption">Mute</span>
            </div>
          ) : (
            <div className="mic-idle-content">
              <div className="mic-icon-wrapper">
                <Mic size={36} className="mic-svg-icon" />
                <span className="mic-sparkle-ping" />
              </div>
              <span className="mic-action-caption">Tap to Speak</span>
            </div>
          )}
        </button>
      </div>

      {/* Mic State Badge for Symmetrical Balance with AI Character */}
      <div className={`mic-state-badge ${isListening ? 'badge-listening' : isSpeaking ? 'badge-speaking' : state === 'thinking' ? 'badge-thinking' : 'badge-idle'}`}>
        <span className="mic-badge-dot" />
        <span className="mic-badge-text">{getStatusText()}</span>
      </div>
    </div>
  );
}



