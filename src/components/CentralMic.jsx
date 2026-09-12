import React from 'react';
import { Mic, Volume2, Brain } from 'lucide-react';

export default function CentralMic({
  isListening,
  isSpeaking,
  state = 'idle',
  notice = '',
  onMicClick,
  onStopSpeech
}) {
  const isCurrentlyListening = isListening || state === 'listening';
  const isCurrentlySpeaking = isSpeaking || state === 'speaking';
  const isCurrentlyThinking = state === 'thinking';

  const getButtonClass = () => {
    if (isCurrentlyListening) return 'mic-listening';
    if (isCurrentlyThinking) return 'mic-thinking';
    if (isCurrentlySpeaking) return 'mic-speaking';
    return 'mic-idle';
  };

  const getStatusText = () => {
    if (notice) return notice;
    if (isCurrentlyListening) return 'Listening...';
    if (isCurrentlyThinking) return 'Processing...';
    if (isCurrentlySpeaking) return 'AI Speaking...';
    return 'Tap to Speak';
  };

  const handleClick = (e) => {
    if (isCurrentlyThinking) {
      // Prevent click while backend is processing
      return;
    }
    if (isCurrentlySpeaking) {
      onStopSpeech?.();
    } else {
      onMicClick?.();
    }
  };

  return (
    <div 
      className={`central-mic-container mic-state-${state} ${isCurrentlyListening ? 'is-listening' : ''} ${isCurrentlySpeaking ? 'is-speaking' : ''} ${isCurrentlyThinking ? 'is-thinking' : ''}`} 
      aria-label="Interactive Microphone Stage"
    >
      {/* Main Mic Interactive Stage */}
      <div className="mic-interactive-stage">
        {/* Soft, minimal ambient glow */}
        <div className={`mic-backdrop-glow ${isCurrentlyListening ? 'glow-listening' : isCurrentlySpeaking ? 'glow-speaking' : isCurrentlyThinking ? 'glow-thinking' : 'glow-idle'}`} />

        {/* Subtle, calm pulsing rings for Listening state */}
        {isCurrentlyListening && (
          <div className="mic-listening-rings-container" aria-hidden="true">
            <span className="mic-listening-pulse-ring ring-1" />
            <span className="mic-listening-pulse-ring ring-2" />
          </div>
        )}

        {/* Clean, Professional Central Mic Button */}
        <button
          id="central-microphone-btn"
          className={`central-mic-button ${getButtonClass()}`}
          onClick={handleClick}
          disabled={isCurrentlyThinking}
          aria-label={
            isCurrentlyListening 
              ? 'Tap to stop recording' 
              : isCurrentlySpeaking 
                ? 'Tap to mute AI voice' 
                : isCurrentlyThinking 
                  ? 'AI is processing audio' 
                  : 'Tap to Speak'
          }
          title={
            isCurrentlyListening 
              ? 'Click to stop listening' 
              : isCurrentlySpeaking 
                ? 'Click to mute AI audio' 
                : isCurrentlyThinking 
                  ? 'AI is processing...' 
                  : 'Click to speak to THAMILI AI'
          }
        >
          {isCurrentlyListening ? (
            <div className="mic-content mic-listening-content">
              <div className="mic-icon-wrapper active-mic-indicator">
                <Mic size={26} className="mic-svg-icon listening-icon" />
                <span className="mic-recording-pulse-dot" />
              </div>
              <span className="mic-action-caption">Tap to Stop</span>
            </div>
          ) : isCurrentlyThinking ? (
            <div className="mic-content mic-thinking-content">
              <Brain size={24} className="mic-thinking-icon" />
              <div className="mic-processing-dots" aria-hidden="true">
                <span className="p-dot dot-1" />
                <span className="p-dot dot-2" />
                <span className="p-dot dot-3" />
              </div>
              <span className="mic-action-caption">Processing...</span>
            </div>
          ) : isCurrentlySpeaking ? (
            <div className="mic-content mic-speaking-content">
              <Volume2 size={24} className="mic-speaking-icon" />
              <div className="mic-speaking-bars" aria-hidden="true">
                <span className="s-bar bar-1" />
                <span className="s-bar bar-2" />
                <span className="s-bar bar-3" />
                <span className="s-bar bar-4" />
              </div>
              <span className="mic-action-caption">AI Speaking...</span>
            </div>
          ) : (
            <div className="mic-content mic-idle-content">
              <Mic size={30} className="mic-svg-icon" />
              <span className="mic-action-caption">Tap to Speak</span>
            </div>
          )}
        </button>
      </div>

      {/* Symmetrical Mic State Badge */}
      <div className={`mic-state-badge ${isCurrentlyListening ? 'badge-listening' : isCurrentlySpeaking ? 'badge-speaking' : isCurrentlyThinking ? 'badge-thinking' : 'badge-idle'}`}>
        <span className="mic-badge-dot" />
        <span className="mic-badge-text">{getStatusText()}</span>
      </div>
    </div>
  );
}



