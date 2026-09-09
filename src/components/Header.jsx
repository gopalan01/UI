import React from 'react';
import { 
  Sun, 
  Volume2, 
  VolumeX, 
  MoreVertical, 
  Menu,
  Sliders
} from 'lucide-react';

export default function Header({
  theme,
  onToggleTheme,
  onToggleSidebar,
  onToggleChatDrawer,
  isChatDrawerOpen,
  isMuted,
  onToggleMute,
  messagesCount = 0,
  isVoiceSettingsOpen = false,
  onToggleVoiceSettings
}) {
  const handleThreeDotClick = () => {
    if (onToggleChatDrawer) {
      onToggleChatDrawer();
    }
  };

  return (
    <header className="aurqo-header">
      {/* Left: Active Module Info + Mobile Menu Toggle */}
      <div className="header-left">
        <button
          type="button"
          className="mobile-sidebar-toggle-btn"
          onClick={onToggleSidebar}
          title="Open Menu & History"
          aria-label="Toggle Sidebar Menu"
        >
          <Menu size={20} />
        </button>

        <div className="module-title-wrapper">
          <div className="module-tag-row">
            <span className="module-badge-primary">THAMILI MODULE</span>
            <span className="module-status-dot">
              <span className="pulse-circle" /> LIVE AI ENGINE
            </span>
          </div>
          <div className="header-title-and-settings-row">
            <h1 className="header-main-title">
              AI Audio / Audio Generator
            </h1>

            {/* Voice & Language Settings button with 3-line icon right next to Audio */}
            <button
              type="button"
              id="header-voice-language-settings-btn"
              className={`header-voice-language-trigger-btn ${isVoiceSettingsOpen ? 'is-active' : ''}`}
              onClick={onToggleVoiceSettings}
              title={isVoiceSettingsOpen ? "Close Voice & Language Settings" : "Voice & Language Settings (Click 3-line menu to open)"}
              aria-label="Voice & Language Settings"
              aria-expanded={isVoiceSettingsOpen}
            >
              <Sliders size={13} className="trigger-slider-icon" />
              <span className="trigger-text">Voice & Language Settings</span>
              <span className="trigger-three-lines-wrap" aria-hidden="true" title="3 lines">
                <Menu size={14} className="trigger-three-lines-icon" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right: Audio Mute & Theme Toggle */}
      <div className="header-right">
        {/* Mute/Unmute Audio Engine */}
        <button
          className={`header-action-btn ${isMuted ? 'btn-active-danger' : ''}`}
          onClick={onToggleMute}
          title={isMuted ? 'Unmute Audio Engine' : 'Mute Audio Engine'}
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX size={18} className="text-danger" /> : <Volume2 size={18} />}
        </button>

        {/* Theme Toggle Button */}
        <button
          id="theme-toggle-btn"
          className="header-theme-btn"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle Theme"
        >
          <Sun size={19} className="theme-icon sun-icon" />
        </button>

        {/* Three-Dot Menu (⋮) on Mobile for Voice Conversation Drawer */}
        <button
          id="header-voice-conversation-dots-btn"
          className={`header-action-btn header-three-dots-btn ${isChatDrawerOpen ? 'active-dots-btn' : ''}`}
          onClick={handleThreeDotClick}
          title="Voice Conversation (⋮)"
          aria-label="Voice Conversation"
        >
          <MoreVertical size={19} className="three-dots-icon" />
          {messagesCount > 0 && (
            <span className="three-dots-badge" title={`${messagesCount} messages`}>
              {messagesCount > 99 ? '99+' : messagesCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
