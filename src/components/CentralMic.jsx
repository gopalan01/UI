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
      {/* Main Mic Interactive Stage */}
      <div className="mic-interactive-stage">
        {/* Clean Soft Ambient Back-Glow (No harsh outer circle rings or ripple animations) */}
        <div className={`mic-backdrop-glow ${isListening ? 'glow-listening' : isSpeaking ? 'glow-speaking' : state === 'thinking' ? 'glow-thinking' : 'glow-idle'}`} />

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

          {isListening ? (
            <div className="mic-active-content">
              <Square size={28} className="mic-stop-icon" />
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



