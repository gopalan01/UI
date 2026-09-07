import React, { useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  RotateCcw, 
  Trash2, 
  Volume2, 
  User, 
  Sparkles, 
  Radio, 
  CheckCheck,
  Mic,
  Globe,
  X
} from 'lucide-react';

export default function ConversationPanel({
  messages = [],
  onClearHistory,
  onRestartConversation,
  onReplayAudio,
  activePlayingIndex,
  isDrawerMode = false,
  onCloseDrawer,
  currentLanguage = 'tamil',
  currentSlang = 'Kongu Tamil',
  onOpenChangeLanguage
}) {
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  return (
    <div className={`aurqo-chat-panel ${isDrawerMode ? 'drawer-mode' : ''}`}>
      {/* Fixed Chat Header */}
      <div className="chat-panel-header">
        <div className="chat-header-title-group">
          <div className="chat-header-icon-box">
            <MessageSquare size={18} />
          </div>
          <div>
            <h2 className="chat-header-heading">Voice Conversation</h2>
            <div className="chat-header-meta-row">
              <span className="chat-header-sub">
                {messages.length} {messages.length === 1 ? 'exchange' : 'exchanges'}
              </span>
              <span className="chat-header-bullet">•</span>
              <span className="chat-header-slang-badge">
                <Radio size={10} className="text-cyan inline-block mr-1" />
                {currentSlang}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="chat-header-actions">
          <button
            id="restart-conversation-btn"
            className="chat-action-btn restart-btn"
            onClick={onRestartConversation}
            title="Restart Selection from Step 1"
            aria-label="Restart Conversation"
          >
            <RotateCcw size={14} />
            <span className="action-btn-text">Restart</span>
          </button>

          <button
            id="clear-history-btn"
            className="chat-action-btn clear-btn"
            onClick={onClearHistory}
            title="Clear Chat Messages"
            aria-label="Clear History"
          >
            <Trash2 size={14} />
            <span className="action-btn-text">Clear</span>
          </button>

          {isDrawerMode && (
            <button
              className="chat-action-btn close-drawer-btn"
              onClick={onCloseDrawer}
              aria-label="Close Chat Drawer"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Message History Area */}
      <div className="chat-messages-container voice-only-mode" ref={scrollContainerRef}>
        {messages.length === 0 ? (
          <div className="chat-empty-state">
            <div className="empty-state-icon">
              <Sparkles size={32} />
            </div>
            <h3 className="empty-state-title">Voice Conversation Ready</h3>
            <p className="empty-state-text">
              Tap the central microphone to speak. Responses are synthesized in real-time in {currentSlang}.
            </p>
            <div className="voice-guide-hint">
              <Mic size={14} className="text-cyan" />
              <span>Voice-first interaction enabled</span>
            </div>
          </div>
        ) : (
          <div className="chat-messages-list">
            {messages.map((msg, index) => {
              const isAI = msg.sender === 'ai';
              const isPlaying = activePlayingIndex === index;

              return (
                <div
                  key={msg.id || index}
                  className={`chat-message-row ${isAI ? 'message-ai' : 'message-user'}`}
                >
                  <div className="message-bubble">
                    {/* Message Header info */}
                    <div className="message-meta-row">
                      <div className="sender-tag">
                        {isAI ? (
                          <>
                            <Sparkles size={12} className="sender-icon-ai" />
                            <span className="sender-name">THAMILI AI</span>
                          </>
                        ) : (
                          <>
                            <User size={12} className="sender-icon-user" />
                            <span className="sender-name">You</span>
                          </>
                        )}
                      </div>

                      <div className="message-time-status">
                        <span className="message-timestamp">{msg.timestamp || 'Just now'}</span>
                        {!isAI && <CheckCheck size={14} className="message-check-icon text-cyan" />}
                      </div>
                    </div>

                    {/* Message Body Text */}
                    <div className="message-body-text">{msg.text}</div>

                    {/* Regional / Slang Tag for AI responses */}
                    {isAI && msg.slangName && (
                      <div className="message-slang-tag">
                        <Radio size={10} />
                        <span>Style: {msg.slangName}</span>
                      </div>
                    )}

                    {/* Play Audio Button for AI messages */}
                    {isAI && (
                      <div className="message-audio-controls">
                        <button
                          className={`replay-voice-btn ${isPlaying ? 'btn-playing' : ''}`}
                          onClick={() => onReplayAudio(msg.text, index, msg.language || currentLanguage)}
                          title="Replay Voice Audio"
                        >
                          <Volume2 size={13} className={isPlaying ? 'animate-pulse' : ''} />
                          <span>{isPlaying ? 'Playing...' : 'Play Voice'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} className="messages-bottom-anchor" />
          </div>
        )}
      </div>

      {/* Elegant Single-Line "🌐 Change Language" Control */}
      <div className="chat-change-language-row">
        <button
          type="button"
          id="conversation-change-language-btn"
          className="single-line-change-lang-btn"
          onClick={onOpenChangeLanguage}
          title="Change conversation language & style"
        >
          <div className="change-lang-btn-left">
            <Globe size={14} className="text-cyan change-lang-globe-icon" />
            <span className="change-lang-main-text">🌐 Change Language</span>
          </div>
          <span className="change-lang-current-tag capitalize">
            Current: {currentLanguage}
          </span>
        </button>
      </div>

      {/* Voice Status Footer Badge */}
      <div className="chat-voice-footer-bar">
        <div className="voice-footer-pill">
          <Mic size={12} className="text-cyan animate-pulse" />
          <span>Active Dialect: <strong>{currentSlang}</strong></span>
        </div>
      </div>
    </div>
  );
}
