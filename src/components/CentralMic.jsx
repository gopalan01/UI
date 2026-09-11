import React from 'react';
import { Mic, Square, Volume2 } from 'lucide-react';

export default function CentralMic({
  isListening,
  isSpeaking,
  state = 'idle',
  notice = '',
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
    if (notice) return notice;
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
        {/* Soft, minimal ambient glow */}
        <div className={`mic-backdrop-glow ${isListening ? 'glow-listening' : isSpeaking ? 'glow-speaking' : state === 'thinking' ? 'glow-thinking' : 'glow-idle'}`} />

        {/* Clean, Professional Central Mic Button */}
        <button
          id="central-microphone-btn"
          className={`central-mic-button ${getButtonClass()}`}
          onClick={isSpeaking ? onStopSpeech : onMicClick}
          aria-label={isListening ? 'Stop Listening' : isSpeaking ? 'Mute AI Voice' : 'Tap to Speak'}
          title={isListening ? 'Click to stop listening' : isSpeaking ? 'Click to mute AI output' : 'Click to speak to THAMILI AI'}
        >
          {isListening ? (
            <div className="mic-active-content">
              <Square size={26} className="mic-stop-icon" />
              <span className="mic-action-caption">Stop</span>
            </div>
          ) : isSpeaking ? (
            <div className="mic-active-content" onClick={(e) => { e.stopPropagation(); onStopSpeech(); }}>
              <Volume2 size={26} className="mic-speaking-icon" />
              <span className="mic-action-caption">Mute</span>
            </div>
          ) : (
            <div className="mic-idle-content">
              <Mic size={32} className="mic-svg-icon" />
              <span className="mic-action-caption">Tap to Speak</span>
            </div>
          )}
        </button>
      </div>

      {/* Symmetrical Mic State Badge */}
      <div className={`mic-state-badge ${isListening ? 'badge-listening' : isSpeaking ? 'badge-speaking' : state === 'thinking' ? 'badge-thinking' : 'badge-idle'}`}>
        <span className="mic-badge-dot" />
        <span className="mic-badge-text">{getStatusText()}</span>
      </div>
    </div>
  );
}



