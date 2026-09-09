import React from 'react';
import { 
  Sun, 
  Volume2, 
  VolumeX, 
  MoreVertical, 
  Menu 
} from 'lucide-react';

export default function Header({
  theme,
  onToggleTheme,
  onToggleSidebar,
  onToggleChatDrawer,
  isChatDrawerOpen,
  isMuted,
  onToggleMute,
  messagesCount = 0
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
          <h1 className="header-main-title">
            AI Audio / Audio Generator
          </h1>
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
