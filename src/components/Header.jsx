import React from 'react';
import { 
  Sun, 
  Volume2, 
  VolumeX, 
  Radio,
  ChevronDown,
  MoreVertical,
  Menu
} from 'lucide-react';
import { 
  SUPPORTED_LANGUAGES, 
  getVoicePreference,
  getEmotionPreference 
} from '../constants/languageConfig';

export default function Header({
  theme,
  onToggleTheme,
  onToggleSidebar,
  onToggleChatDrawer,
  isChatDrawerOpen,
  config,
  isMuted,
  onToggleMute,
  onOpenDialectModal,
  userName = 'Gopi',
  onOpenProfileModal,
  onOpenHistoryMenu,
  messagesCount = 0
}) {
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === config.language);
  const currentSlang = currentLang?.slangs.find((s) => s.id === config.slang);
  const currentVoice = getVoicePreference(config.language, config.voice);
  const currentEmotion = getEmotionPreference(config.emotion || 'default');
  const userInitials = userName.slice(0, 2).toUpperCase() || 'GP';

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

      {/* Center: Live Profile Status Bar (Language / Slang / Voice / Emotion) */}
      <div className="header-center-pills">
        <button 
          type="button"
          className="profile-pill-item pill-interactive" 
          onClick={onOpenDialectModal}
          title="Click to change Language or Dialect / Slang"
        >
          <span className="pill-flag">{currentLang?.flag || '🌐'}</span>
          <span className="pill-text">{currentLang?.name || 'Tamil'}</span>
          <ChevronDown size={12} className="pill-chevron" />
        </button>

        <div className="profile-pill-divider">/</div>

        <button 
          type="button"
          className="profile-pill-item pill-interactive" 
          onClick={onOpenDialectModal}
          title="Click to change Dialect / Slang (e.g. Kongu Tamil, Chennai Tamil)"
        >
          <Radio size={12} className="pill-icon text-cyan" />
          <span className="pill-text slang-pill-text">{currentSlang?.name || 'Kongu Tamil'}</span>
          <ChevronDown size={12} className="pill-chevron" />
        </button>

        <div className="profile-pill-divider">/</div>

        <div className="profile-pill-item" title={`Voice: ${currentVoice?.name || 'Female'}`}>
          <span className="pill-icon">{currentVoice?.icon || '👩'}</span>
          <span className="pill-text">{currentVoice?.name || 'Female'}</span>
        </div>

        <div className="profile-pill-divider">/</div>

        <button 
          type="button"
          className="profile-pill-item pill-interactive" 
          onClick={onOpenDialectModal}
          title={`Click to change Voice Tone (Current: ${currentEmotion.name})`}
        >
          <span className="pill-icon">{currentEmotion.icon || '😐'}</span>
          <span className="pill-text emotion-pill-text">{currentEmotion.name || 'Default'}</span>
          <ChevronDown size={12} className="pill-chevron" />
        </button>
      </div>

      {/* Right: Theme Toggle, Gopi User Profile, Get Started, Three-Dot Menu */}
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

        {/* Interactive Gopi User Profile Button */}
        <button 
          id="header-user-profile-btn"
          className="header-user-btn"
          onClick={onOpenProfileModal}
          title="Click to view Gopi Profile & Account Settings"
          aria-label="User Profile Gopi"
        >
          <div className="header-user-avatar">
            <span>{userInitials}</span>
          </div>
          <span className="header-user-name">{userName}</span>
          <span className="header-user-pro-badge">PRO</span>
        </button>

        {/* Get Started / Account Button */}
        <button 
          className="header-get-started-btn"
          onClick={onOpenProfileModal}
          title="Account Overview"
        >
          Account
        </button>

        {/* Three-Dot Menu (⋮) on the Right Side for Voice Conversation */}
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
