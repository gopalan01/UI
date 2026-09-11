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
  Sliders,
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
  onOpenChangeLanguage,
  isCollapsed = true,
  onToggleCollapse,
  onSwitchToHero,
  voiceControls = null
}) {
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current && (!isCollapsed || isDrawerMode)) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, isCollapsed, isDrawerMode]);

  return (
    <div className={`aurqo-chat-panel ${isDrawerMode ? 'drawer-mode' : ''} is-expanded`}>
      {/* Fixed Chat Header (Permanently Open, Non-collapsing) */}
      <div className="chat-panel-header is-expanded">
        <div className="chat-header-title-group">
          <div className="chat-header-icon-box">
            <MessageSquare size={17} />
          </div>
          <div className="chat-header-info">
            <h2 className="chat-header-heading">Voice Conversation</h2>
            <div className="chat-header-meta-row">
              <span className="chat-header-sub">
                {messages.length} {messages.length === 1 ? 'exchange' : 'exchanges'}
              </span>
            </div>
          </div>
        </div>

        {/* Right side controls: Action Buttons (Restart, Clear) */}
        <div className="chat-header-right-slot">
          <div className="chat-header-actions">
            {onSwitchToHero && (
              <button
                id="switch-to-hero-btn"
                type="button"
                className="chat-action-btn studio-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onSwitchToHero();
                }}
                title="Switch to Hero / Voice Studio View"
                aria-label="Studio Mode"
              >
                <Sliders size={13} />
                <span className="action-btn-text">Studio</span>
              </button>
            )}

            <button
              id="restart-conversation-btn"
              type="button"
              className="chat-action-btn restart-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (onRestartConversation) onRestartConversation();
              }}
              title="Restart Selection from Step 1"
              aria-label="Restart Conversation"
            >
              <RotateCcw size={13} />
              <span className="action-btn-text">Restart</span>
            </button>

            <button
              id="clear-history-btn"
              type="button"
              className="chat-action-btn clear-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (onClearHistory) onClearHistory();
              }}
              title="Clear Chat Messages"
              aria-label="Clear History"
            >
              <Trash2 size={13} />
              <span className="action-btn-text">Clear</span>
            </button>
          </div>

          {isDrawerMode && (
            <button
              type="button"
              className="chat-action-btn close-drawer-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (onCloseDrawer) onCloseDrawer();
              }}
              aria-label="Close Chat Drawer"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Permanently Fixed Content Area */}
      <div className="chat-panel-collapsible-wrapper is-expanded">
        <div className="chat-panel-collapsible-inner">
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

          {/* Integrated Voice Interaction Controls (Inside the Voice Conversation Card itself) */}
          {voiceControls ? (
            <div className="chat-integrated-voice-dock">
              {voiceControls}
            </div>
          ) : (
            /* Fallback Voice Status Footer Badge */
            <div className="chat-voice-footer-bar">
              <div className="voice-footer-pill">
                <Mic size={12} className="text-cyan animate-pulse" />
                <span>Active Dialect: <strong>{currentSlang}</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
