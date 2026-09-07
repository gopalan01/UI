import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Radio, 
  Volume2, 
  Settings, 
  LogOut, 
  Edit3, 
  Check, 
  RotateCcw 
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, getVoicePreference, getEmotionPreference } from '../constants/languageConfig';

export default function UserProfileModal({
  isOpen,
  onClose,
  userName = 'Gopi',
  onUpdateUserName,
  config,
  onOpenDialectModal,
  onRestartConversation,
  totalMessagesCount = 0
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(userName);
  const [toastMessage, setToastMessage] = useState('');

  if (!isOpen) return null;

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === config.language);
  const currentSlang = currentLang?.slangs.find((s) => s.id === config.slang);
  const currentVoice = getVoicePreference(config.language, config.voice);
  const currentEmotion = getEmotionPreference(config.emotion || 'default');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  const handleSaveName = (e) => {
    e.preventDefault();
    if (nameInput.trim()) {
      if (onUpdateUserName) {
        onUpdateUserName(nameInput.trim());
      }
      setIsEditing(false);
      showToast(`Profile name updated to "${nameInput.trim()}"!`);
    }
  };

  return (
    <div className="profile-modal-backdrop" onClick={onClose}>
      <div 
        className="profile-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
      >
        {/* Modal Header */}
        <div className="profile-modal-header">
          <div className="profile-header-badge-row">
            <span className="profile-badge-pro">
              <Sparkles size={13} className="sparkle-gold" /> THAMILI PRO
            </span>
            <span className="profile-status-live">
              <span className="pulse-green-dot" /> ACTIVE SESSION
            </span>
          </div>
          <button 
            id="close-profile-modal-btn"
            className="profile-close-btn" 
            onClick={onClose}
            aria-label="Close Profile"
          >
            <X size={19} />
          </button>
        </div>

        {/* User Hero Banner */}
        <div className="profile-hero-section">
          <div className="profile-avatar-container">
            <div className="profile-avatar-large">
              <span>{nameInput.slice(0, 2).toUpperCase() || 'GP'}</span>
            </div>
            <span className="profile-online-badge" title="Online" />
          </div>

          <div className="profile-user-details">
            {isEditing ? (
              <form onSubmit={handleSaveName} className="profile-edit-form">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="profile-name-input"
                  autoFocus
                  placeholder="Enter your name"
                  maxLength={30}
                />
                <button type="submit" className="profile-save-btn" title="Save Name">
                  <Check size={16} />
                </button>
              </form>
            ) : (
              <div className="profile-name-row">
                <h2 id="profile-title" className="profile-display-name">{userName}</h2>
                <button 
                  type="button" 
                  className="profile-edit-trigger-btn"
                  onClick={() => setIsEditing(true)}
                  title="Edit Name"
                >
                  <Edit3 size={15} />
                </button>
              </div>
            )}
            <p className="profile-user-email">
              <Mail size={13} /> {userName.toLowerCase().replace(/\s+/g, '')}@thamili.ai
            </p>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="profile-toast-banner">
            <Check size={14} /> {toastMessage}
          </div>
        )}

        {/* Voice AI Statistics & Preferences Overview */}
        <div className="profile-stats-grid">
          <div className="profile-stat-box">
            <span className="stat-label">Active Language</span>
            <div className="stat-val-row">
              <span className="stat-flag">{currentLang?.flag || '🌐'}</span>
              <span className="stat-value">{currentLang?.name || 'Tamil'}</span>
            </div>
          </div>

          <div className="profile-stat-box">
            <span className="stat-label">Dialect / Slang</span>
            <div className="stat-val-row">
              <Radio size={14} className="text-cyan" />
              <span className="stat-value text-ellipsis">{currentSlang?.name || 'Kongu Tamil'}</span>
            </div>
          </div>

          <div className="profile-stat-box">
            <span className="stat-label">Voice Preference</span>
            <div className="stat-val-row">
              <Volume2 size={14} className="text-purple" />
              <span className="stat-value">{currentVoice?.name || 'Female'}</span>
            </div>
          </div>

          <div className="profile-stat-box">
            <span className="stat-label">Voice Tone</span>
            <div className="stat-val-row">
              <span className="stat-flag">{currentEmotion?.icon || '😐'}</span>
              <span className="stat-value">{currentEmotion?.name || 'Default'}</span>
            </div>
          </div>

          <div className="profile-stat-box">
            <span className="stat-label">Total Messages</span>
            <div className="stat-val-row">
              <span className="stat-value stat-highlight">{totalMessagesCount} Queries</span>
            </div>
          </div>
        </div>

        {/* Account Info Details */}
        <div className="profile-meta-list">
          <div className="meta-item">
            <ShieldCheck size={16} className="meta-icon text-emerald" />
            <div className="meta-info">
              <span className="meta-title">Plan Status</span>
              <span className="meta-sub">THAMILI Ultimate Voice Pro (Unlimited Access)</span>
            </div>
          </div>

          <div className="meta-item">
            <Calendar size={16} className="meta-icon text-blue" />
            <div className="meta-info">
              <span className="meta-title">Member Since</span>
              <span className="meta-sub">August 2026</span>
            </div>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="profile-modal-actions">
          <button 
            type="button" 
            className="profile-action-btn btn-secondary"
            onClick={() => {
              onClose();
              if (onOpenDialectModal) onOpenDialectModal();
            }}
          >
            <Settings size={16} /> Change Voice & Dialect
          </button>

          <button 
            type="button" 
            className="profile-action-btn btn-secondary"
            onClick={() => {
              if (onRestartConversation) {
                onRestartConversation();
                showToast('Conversation history reset!');
              }
            }}
          >
            <RotateCcw size={16} /> Reset Conversation
          </button>

          <button 
            type="button" 
            className="profile-action-btn btn-logout"
            onClick={() => {
              showToast(`Logged in as ${userName}. Ready!`);
            }}
          >
            <LogOut size={16} /> Switch Account
          </button>
        </div>
      </div>
    </div>
  );
}
