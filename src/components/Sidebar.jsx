import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Sparkles, 
  ChevronDown, 
  X,
  History,
  MessageSquare,
  Pin,
  PinOff,
  Edit3,
  Trash2,
  MoreVertical,
  Check
} from 'lucide-react';
import thamiliLogo from '../assets/thamili-logo.png';
import { 
  getSavedConversations, 
  togglePinConversation, 
  renameConversation, 
  deleteConversation 
} from '../services/conversationHistoryService';

export default function Sidebar({ 
  isOpen = false,
  onClose,
  onNavigate,
  userName = 'Gopi',
  onOpenProfileModal,
  currentConversationId,
  onSelectConversation,
  onNewConversation
}) {
  const [conversations, setConversations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitleText, setEditTitleText] = useState('');
  const [activeMenuId, setActiveMenuId] = useState(null);
  const editInputRef = useRef(null);
  const sidebarNavRef = useRef(null);

  const userInitials = userName.slice(0, 2).toUpperCase() || 'GP';

  // Load conversations and subscribe to real-time updates
  useEffect(() => {
    const loadConversations = () => {
      setConversations(getSavedConversations());
    };
    loadConversations();

    window.addEventListener('aurqo_conversations_updated', loadConversations);
    window.addEventListener('storage', loadConversations);

    return () => {
      window.removeEventListener('aurqo_conversations_updated', loadConversations);
      window.removeEventListener('storage', loadConversations);
    };
  }, []);

  // Focus and select input text when editing begins
  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  // Close open 3-dot dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeMenuId && !e.target.closest('.sidebar-history-more-container')) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenuId]);

  // Start inline rename
  const handleStartRename = (e, item) => {
    e.stopPropagation();
    setActiveMenuId(null);
    setEditingId(item.id);
    setEditTitleText(item.title);
  };

  // Save rename
  const handleSaveRename = (e, id) => {
    if (e) e.stopPropagation();
    if (editTitleText && editTitleText.trim()) {
      const updated = renameConversation(id, editTitleText.trim());
      setConversations(updated);
    }
    setEditingId(null);
  };

  // Cancel rename
  const handleCancelRename = (e) => {
    if (e) e.stopPropagation();
    setEditingId(null);
  };

  // Toggle Pin Status (📌 Pin / Unpin)
  const handleTogglePin = (e, id) => {
    e.stopPropagation();
    setActiveMenuId(null);
    const updated = togglePinConversation(id);
    setConversations(updated);
  };

  // Delete specific conversation
  const handleDeleteItem = (e, id) => {
    e.stopPropagation();
    setActiveMenuId(null);
    const updated = deleteConversation(id);
    setConversations(updated);
    if (editingId === id) setEditingId(null);
    if (id === currentConversationId && onNewConversation) {
      onNewConversation();
    }
  };

  const formatItemTime = (isoString) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch (_e) {
      return '';
    }
  };

  const pinnedConversations = conversations.filter((c) => c.pinned);
  const unpinnedConversations = conversations.filter((c) => !c.pinned);

  // Render an individual conversation row inside Sidebar
  const renderSidebarConversationRow = (item) => {
    const isActive = item.id === currentConversationId;
    const isEditing = editingId === item.id;
    const isMenuOpen = activeMenuId === item.id;

    return (
      <div
        key={item.id}
        className={`sidebar-history-item-row ${isActive ? 'active-history-item' : ''} ${item.pinned ? 'pinned-history-item' : ''} ${isMenuOpen ? 'row-menu-open' : ''}`}
        onClick={() => {
          if (!isEditing && onSelectConversation) {
            onSelectConversation(item);
          }
        }}
        title={item.title}
      >
        {/* Main Info / Inline Rename */}
        <div className="sidebar-history-item-content">
          {isEditing ? (
            <div className="sidebar-history-inline-edit" onClick={(e) => e.stopPropagation()}>
              <input
                ref={editInputRef}
                type="text"
                value={editTitleText}
                onChange={(e) => setEditTitleText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSaveRename(e, item.id);
                  } else if (e.key === 'Escape') {
                    e.preventDefault();
                    handleCancelRename(e);
                  }
                }}
                className="sidebar-history-edit-input"
                maxLength={50}
                placeholder="Conversation name..."
              />
              <button
                type="button"
                className="sidebar-history-edit-btn btn-save"
                onClick={(e) => handleSaveRename(e, item.id)}
                title="Save (Enter)"
              >
                <Check size={12} />
              </button>
              <button
                type="button"
                className="sidebar-history-edit-btn btn-cancel"
                onClick={handleCancelRename}
                title="Cancel (Esc)"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <>
              <div className="sidebar-history-title-row">
                {item.pinned ? (
                  <Pin size={12} className="text-amber inline-block mr-1 flex-shrink-0" />
                ) : (
                  <MessageSquare size={12} className="sidebar-conv-icon" />
                )}
                <span className="sidebar-history-title-text">
                  {item.title}
                </span>
              </div>

              <div className="sidebar-history-meta-row">
                <span className="sidebar-meta-badge">
                  {item.messages ? item.messages.length : 0} msgs
                </span>
                <span className="sidebar-meta-bullet">•</span>
                <span className="sidebar-meta-style capitalize">
                  {item.style ? item.style.replace(/_/g, ' ') : (item.slang ? item.slang.replace(/_/g, ' ') : item.language || 'Tamil')}
                </span>
                <span className="sidebar-meta-bullet">•</span>
                <span className="sidebar-meta-time">
                  {formatItemTime(item.updatedAt || item.createdAt)}
                </span>
              </div>
            </>
          )}
        </div>

        {/* THREE-DOT MENU (⋮) FOR CONVERSATION OPTIONS */}
        {!isEditing && (
          <div className="sidebar-history-more-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={`sidebar-history-more-btn ${isMenuOpen ? 'more-btn-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenuId((prev) => (prev === item.id ? null : item.id));
              }}
              title="Options (Pin, Rename, Delete)"
              aria-label="Conversation Options"
            >
              <MoreVertical size={14} />
            </button>

            {/* Contextual Popup Menu with 3 options: 📌 Pin, ✏️ Rename, 🗑️ Delete */}
            {isMenuOpen && (
              <div className="sidebar-history-popup-menu" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className={`sidebar-popup-item ${item.pinned ? 'item-pinned' : ''}`}
                  onClick={(e) => handleTogglePin(e, item.id)}
                  title={item.pinned ? "Unpin conversation" : "Pin conversation to top"}
                >
                  {item.pinned ? (
                    <>
                      <PinOff size={13} className="text-amber flex-shrink-0" />
                      <span>📌 Unpin</span>
                    </>
                  ) : (
                    <>
                      <Pin size={13} className="text-amber flex-shrink-0" />
                      <span>📌 Pin</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="sidebar-popup-item item-rename"
                  onClick={(e) => handleStartRename(e, item)}
                  title="Rename conversation title"
                >
                  <Edit3 size={13} className="text-cyan flex-shrink-0" />
                  <span>✏️ Rename</span>
                </button>

                <button
                  type="button"
                  className="sidebar-popup-item item-delete"
                  onClick={(e) => handleDeleteItem(e, item.id)}
                  title="Delete conversation"
                >
                  <Trash2 size={13} className="text-danger flex-shrink-0" />
                  <span>🗑️ Delete</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const primaryNavItems = [
    {
      id: 'ai_audio',
      label: 'AI Audio',
      icon: Mic,
      isAudio: true
    }
  ];

  return (
    <aside className={`aurqo-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      {/* Brand Header with New THAMILI Logo & Mobile Close */}
      <div className="sidebar-brand">
        <div className="brand-logo-container">
          <img 
            src={thamiliLogo} 
            alt="THAMILI" 
            className="aurqo-brand-logo thamili-brand-logo"
          />
        </div>
        {onClose && (
          <button 
            type="button" 
            className="sidebar-mobile-close-btn" 
            onClick={onClose}
            title="Close Menu"
            aria-label="Close Sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation & History Scroll Area */}
      <div className="sidebar-nav-scroll-area" ref={sidebarNavRef}>
        {/* Primary Nav List (Original Clean AI Audio) */}
        <nav className="sidebar-nav primary-nav">
          {primaryNavItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = item.isAudio;

            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                className={`nav-item ${isActive ? 'active-nav-item' : 'inactive-nav-item'}`}
                onClick={() => {
                  if (onNavigate) onNavigate(item.id);
                }}
                title={item.label}
              >
                <IconComponent size={18} className="nav-icon" />
                <span className="nav-item-title">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Dedicated HISTORY Section Header directly under Audio Generator */}
        <div className="sidebar-history-section-wrapper">
          <div className="sidebar-history-header-row">
            <div className="sidebar-history-heading-left">
              <History size={13} className="text-cyan sidebar-history-icon" />
              <h4 className="sidebar-history-title">HISTORY</h4>
            </div>
            {conversations.length > 0 && (
              <span className="sidebar-history-count-badge">
                {conversations.length}
              </span>
            )}
          </div>

          {/* List of Saved Conversations */}
          <div className="sidebar-history-list">
            {conversations.length === 0 ? (
              <div className="sidebar-history-empty">
                <MessageSquare size={18} className="sidebar-empty-icon" />
                <p className="sidebar-empty-title">No conversations saved yet</p>
                <p className="sidebar-empty-desc">Your voice conversations will start as "Conversation 1" and automatically save here.</p>
              </div>
            ) : (
              <div className="sidebar-history-groups-wrap">
                {/* 📌 PINNED SECTION */}
                {pinnedConversations.length > 0 && (
                  <div className="sidebar-history-subgroup">
                    <div className="sidebar-subgroup-title">
                      <span>📌 PINNED</span>
                    </div>
                    <div className="sidebar-subgroup-items">
                      {pinnedConversations.map(renderSidebarConversationRow)}
                    </div>
                  </div>
                )}

                {/* RECENT / UNPINNED HISTORY SECTION */}
                <div className="sidebar-history-subgroup">
                  {pinnedConversations.length > 0 && (
                    <div className="sidebar-subgroup-title">
                      <span>RECENT</span>
                    </div>
                  )}
                  <div className="sidebar-subgroup-items">
                    {unpinnedConversations.map(renderSidebarConversationRow)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upgrade to Pro Card */}
      <div className="upgrade-pro-card">
        <div className="upgrade-card-header">
          <span className="upgrade-card-title">Upgrade to Pro</span>
          <Sparkles size={14} className="upgrade-sparkle-icon" />
        </div>
        <p className="upgrade-card-desc">
          Unlock more power, more models, and more possibilities.
        </p>
        <button 
          className="upgrade-card-btn" 
          onClick={() => {
            if (onOpenProfileModal) onOpenProfileModal();
          }}
        >
          Upgrade Now
        </button>
      </div>

      {/* Bottom User Profile Section (Interactive Gopi Profile) */}
      <div className="sidebar-user-footer">
        <div 
          id="sidebar-user-profile-row"
          className="user-profile-row user-profile-interactive"
          onClick={() => {
            if (onOpenProfileModal) onOpenProfileModal();
          }}
          title="Click to view Gopi Account & Profile Settings"
        >
          <div className="user-avatar-initials">
            <span>{userInitials}</span>
          </div>
          <div className="user-name-wrapper">
            <span className="user-display-name">{userName}</span>
            <span className="user-role-tag">Pro Member</span>
          </div>
          <ChevronDown size={16} className="user-chevron-icon" />
        </div>
      </div>
    </aside>
  );
}
