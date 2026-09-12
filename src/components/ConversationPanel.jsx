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
  X,
  CheckCircle2,
  Play,
  Pause
} from 'lucide-react';
import SetupQuestionCard from './SetupQuestionCard';
import SetupOptionGuide from './SetupOptionGuide';

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
  voiceControls = null,
  currentStep = 'completed',
  config = {},
  speechSpeed = 'normal',
  onSelectLanguage,
  onSelectRegion,
  onSelectSlang,
  onSelectVoice,
  onSelectEmotion,
  onSelectSpeed
}) {
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current && (!isCollapsed || isDrawerMode)) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, isCollapsed, isDrawerMode]);

  // Active setup state and index of latest AI message to embed setup interactive options
  const isSetupActive = currentStep !== 'completed' && currentStep !== 'welcome';
  const lastAIMsgIndex = messages.map((m) => m.sender).lastIndexOf('ai');

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
            {/* 1. When Setup is completed: Active Setup Badge */}
            {currentStep === 'completed' && (
              <div className="chat-completed-setup-pill-bar">
                <span className="setup-badge-item">
                  <Globe size={11} className="text-cyan" />
                  <span className="capitalize">{config.language || currentLanguage}</span>
                </span>
                <span className="setup-badge-sep">•</span>
                <span className="setup-badge-item">
                  <span className="capitalize">{currentSlang}</span>
                </span>
                <span className="setup-badge-sep">•</span>
                <span className="setup-badge-item">
                  <span>{config.voice === 'male' ? 'Male Voice' : config.voice === 'user' ? 'Own Voice' : 'Female Voice'}</span>
                </span>
                <span className="setup-badge-sep">•</span>
                <span className="setup-badge-item">
                  <span className="capitalize">{config.emotion || 'Default'}</span>
                </span>
                <span className="setup-badge-sep">•</span>
                <span className="setup-badge-item">
                  <span className="uppercase text-cyan">{speechSpeed}</span>
                </span>
              </div>
            )}

            {messages.length === 0 && (currentStep === 'completed' || currentStep === 'welcome') ? (
              <div className="chat-empty-state">
                <div className="empty-state-icon">
                  <Sparkles size={32} />
                </div>
                <h3 className="empty-state-title">
                  {currentStep === 'welcome' ? 'Welcome to THAMILI' : 'Voice Conversation Ready'}
                </h3>
                <p className="empty-state-text">
                  {currentStep === 'welcome'
                    ? 'AI is starting with a friendly welcome message...'
                    : `Tap the central microphone to speak. Responses are synthesized in real-time in ${currentSlang}.`}
                </p>
                <div className="voice-guide-hint">
                  <Mic size={14} className="text-cyan" />
                  <span>{currentStep === 'welcome' ? 'Initializing Voice...' : 'Voice-first interaction enabled'}</span>
                </div>
              </div>
            ) : (
              <div className="chat-messages-list">
                {messages.map((msg, index) => {
                  const isAI = msg.sender === 'ai';
                  const isPlaying = activePlayingIndex === index;
                  const isCurrentActiveSetupMsg = isAI && isSetupActive && index === lastAIMsgIndex;

                  return (
                    <div
                      key={msg.id || index}
                      className={`chat-message-row ${isAI ? 'message-ai' : 'message-user'} ${isCurrentActiveSetupMsg ? 'has-setup-content' : ''}`}
                    >
                      <div className={`message-bubble ${isCurrentActiveSetupMsg ? 'has-setup-content' : ''}`}>
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

                        {/* Setup Options Content INSIDE THE SAME THAMILI AI BUBBLE */}
                        {isCurrentActiveSetupMsg && (
                          <SetupQuestionCard
                            currentStep={currentStep}
                            config={config}
                            speechSpeed={speechSpeed}
                            onSelectLanguage={onSelectLanguage}
                            onSelectRegion={onSelectRegion}
                            onSelectSlang={onSelectSlang}
                            onSelectVoice={onSelectVoice}
                            onSelectEmotion={onSelectEmotion}
                            onSelectSpeed={onSelectSpeed}
                          />
                        )}

                        {/* Regional / Slang Tag for AI responses */}
                        {isAI && msg.slangName && !isCurrentActiveSetupMsg && (
                          <div className="message-slang-tag">
                            <Radio size={10} />
                            <span>Style: {msg.slangName}</span>
                          </div>
                        )}

                        {/* Play Audio Button for AI messages */}
                        {isAI && (
                          <div className="message-audio-action-row">
                            <button
                              type="button"
                              className={`message-audio-play-btn ${isPlaying ? 'is-playing' : ''}`}
                              onClick={() => onReplayAudio && onReplayAudio(msg.text, index, msg.language)}
                              title={isPlaying ? 'Pause Audio' : 'Play Audio'}
                            >
                              {isPlaying ? (
                                <>
                                  <Pause size={13} className="play-icon animate-pulse text-cyan" />
                                  <span>Playing Audio...</span>
                                </>
                              ) : (
                                <>
                                  <Play size={13} className="play-icon" />
                                  <span>Play Audio</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Fallback Active Setup Question: If active setup is running and no AI message has been rendered */}
                {isSetupActive && lastAIMsgIndex === -1 && (
                  <div className="chat-message-row message-ai has-setup-content animate-fade-in-up">
                    <div className="message-bubble has-setup-content">
                      <div className="message-meta-row">
                        <div className="sender-tag">
                          <Sparkles size={12} className="sender-icon-ai" />
                          <span className="sender-name">THAMILI AI</span>
                        </div>
                        <div className="message-time-status">
                          <span className="message-timestamp">Just now</span>
                        </div>
                      </div>

                      <div className="message-body-text">
                        {config.language === 'tamil'
                          ? 'நீங்கள் எந்த மொழியில் உரையாட விரும்புகிறீர்கள்?'
                          : 'Which language would you like to use for the conversation?'}
                      </div>

                      <SetupQuestionCard
                        currentStep={currentStep}
                        config={config}
                        speechSpeed={speechSpeed}
                        onSelectLanguage={onSelectLanguage}
                        onSelectRegion={onSelectRegion}
                        onSelectSlang={onSelectSlang}
                        onSelectVoice={onSelectVoice}
                        onSelectEmotion={onSelectEmotion}
                        onSelectSpeed={onSelectSpeed}
                      />

                      {onReplayAudio && (
                        <div className="message-audio-action-row">
                          <button
                            type="button"
                            className="message-audio-play-btn"
                            onClick={() =>
                              onReplayAudio(
                                config.language === 'tamil'
                                  ? 'நீங்கள் எந்த மொழியில் உரையாட விரும்புகிறீர்கள்?'
                                  : 'Which language would you like to use for the conversation?',
                                999,
                                config.language
                              )
                            }
                            title="Play Audio"
                          >
                            <Play size={13} className="play-icon" />
                            <span>Play Audio</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} className="messages-bottom-anchor" />
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
