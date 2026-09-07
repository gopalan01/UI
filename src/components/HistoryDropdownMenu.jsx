import React, { useState, useEffect, useRef } from 'react';
import { 
  Pin, 
  PinOff, 
  Edit3, 
  Trash2, 
  MessageSquare, 
  Plus, 
  Check, 
  X, 
  MoreVertical
} from 'lucide-react';
import { 
  getSavedConversations, 
  togglePinConversation, 
  renameConversation, 
  deleteConversation 
} from '../services/conversationHistoryService';

export default function HistoryDropdownMenu({
  isOpen,
  onClose,
  currentConversationId,
  onSelectConversation,
  onNewConversation
}) {
  const [conversations, setConversations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitleText, setEditTitleText] = useState('');
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);
  const editInputRef = useRef(null);

  // Reload history whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setConversations(getSavedConversations());
      setEditingId(null);
      setActiveMenuId(null);
    }
  }, [isOpen]);

  // Focus and select input text when editing starts
  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  // Click outside to close open 3-dot dropdowns or the main modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeMenuId && !e.target.closest('.history-more-menu-container')) {
        setActiveMenuId(null);
      }
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, activeMenuId, onClose]);

  if (!isOpen) return null;

  // Start Inline Rename
  const handleStartRename = (e, item) => {
    e.stopPropagation();
    setActiveMenuId(null);
    setEditingId(item.id);
    setEditTitleText(item.title);
  };

  // Save Rename on Enter or Check button
  const handleSaveRename = (e, id) => {
    if (e) e.stopPropagation();
    if (editTitleText && editTitleText.trim()) {
      const updated = renameConversation(id, editTitleText.trim());
      setConversations(updated);
    }
    setEditingId(null);
  };

  // Cancel Rename on Escape or X button
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

  // Delete ONLY selected conversation
  const handleDeleteItem = (e, id) => {
    e.stopPropagation();
    setActiveMenuId(null);
    const updated = deleteConversation(id);
    setConversations(updated);
    if (editingId === id) setEditingId(null);
  };

  const formatItemTime = (isoString) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (_e) {
      return '';
    }
  };

  const pinnedConversations = conversations.filter((c) => c.pinned);
  const unpinnedConversations = conversations.filter((c) => !c.pinned);

  // Render a single conversation row
  const renderConversationRow = (item) => {
    const isActive = item.id === currentConversationId;
    const isEditing = editingId === item.id;
    const isMenuOpen = activeMenuId === item.id;

    return (
      <div
        key={item.id}
        className={`history-item-row ${isActive ? 'history-item-active' : ''} ${item.pinned ? 'history-item-pinned' : ''}`}
        onClick={() => {
          if (!isEditing) {
            onSelectConversation(item);
            onClose();
          }
        }}
      >
        {/* Main Content / Inline Rename Input */}
        <div className="history-item-content">
          {isEditing ? (
            <div className="history-inline-edit-box" onClick={(e) => e.stopPropagation()}>
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
                className="history-edit-input"
                maxLength={60}
                placeholder="Enter conversation name..."
              />
              <button
                type="button"
                className="history-edit-action-btn btn-save"
                onClick={(e) => handleSaveRename(e, item.id)}
                title="Save (Press Enter)"
              >
                <Check size={13} />
              </button>
              <button
                type="button"
                className="history-edit-action-btn btn-cancel"
                onClick={handleCancelRename}
                title="Cancel"
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <>
              <div className="history-title-row">
                {item.pinned && (
                  <Pin size={12} className="text-amber inline-block mr-1 flex-shrink-0" />
                )}
                <span className="history-item-title" title={item.title}>
                  {item.title}
                </span>
              </div>

              <div className="history-item-meta">
                <span className="history-meta-tag">
                  {item.messages ? item.messages.length : 0} msgs
                </span>
                <span className="history-meta-bullet">•</span>
                <span className="history-meta-lang capitalize">
                  {item.style ? item.style.replace(/_/g, ' ') : (item.slang ? item.slang.replace(/_/g, ' ') : item.language || 'Tamil')}
                </span>
                <span className="history-meta-bullet">•</span>
                <span className="history-meta-time">
                  {formatItemTime(item.updatedAt || item.createdAt)}
                </span>
              </div>
            </>
          )}
        </div>

        {/* THREE-DOT MENU (⋮) FOR EVERY CONVERSATION */}
        {!isEditing && (
          <div className="history-more-menu-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={`history-more-btn ${isMenuOpen ? 'history-more-btn-active' : ''}`}
              onClick={() => setActiveMenuId(isMenuOpen ? null : item.id)}
              title="Options (Pin, Rename, Delete)"
              aria-label="Conversation Options"
            >
              <MoreVertical size={15} />
            </button>

            {/* Contextual Popup Menu with 3 options: 📌 Pin, ✏️ Rename, 🗑️ Delete */}
            {isMenuOpen && (
              <div className="history-item-dropdown-menu animate-fade-in" onClick={(e) => e.stopPropagation()}>
                {/* 📌 Pin / Unpin Option */}
                <button
                  type="button"
                  className={`dropdown-action-item ${item.pinned ? 'item-pinned' : ''}`}
                  onClick={(e) => handleTogglePin(e, item.id)}
                >
                  {item.pinned ? (
                    <>
                      <PinOff size={13} className="action-icon text-amber" />
                      <span>📌 Unpin</span>
                    </>
                  ) : (
                    <>
                      <Pin size={13} className="action-icon text-amber" />
                      <span>📌 Pin</span>
                    </>
                  )}
                </button>

                {/* ✏️ Rename Option */}
                <button
                  type="button"
                  className="dropdown-action-item"
                  onClick={(e) => handleStartRename(e, item)}
                >
                  <Edit3 size={13} className="action-icon text-cyan" />
                  <span>✏️ Rename</span>
                </button>

                {/* 🗑️ Delete Option */}
                <button
                  type="button"
                  className="dropdown-action-item item-delete"
                  onClick={(e) => handleDeleteItem(e, item.id)}
                >
                  <Trash2 size={13} className="action-icon text-danger" />
                  <span>🗑️ Delete</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="history-menu-overlay" onClick={onClose}>
      <div 
        ref={menuRef}
        className="history-menu-card animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Conversation History"
      >
        {/* Header: AI Audio Generator / HISTORY */}
        <div className="history-menu-header">
          <div className="history-brand-wrap">
            <span className="history-platform-tag">AI Audio Generator</span>
            <h3 className="history-main-heading">HISTORY</h3>
          </div>
          <button 
            type="button" 
            className="history-menu-close-btn"
            onClick={onClose}
            aria-label="Close History Menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Action: Start New Conversation */}
        <div className="history-actions-bar">
          <button
            type="button"
            className="history-new-chat-btn"
            onClick={() => {
              onNewConversation();
              onClose();
            }}
          >
            <Plus size={14} />
            <span>New Conversation</span>
          </button>
        </div>

        {/* Saved Conversations List */}
        <div className="history-list-scroll">
          {conversations.length === 0 ? (
            <div className="history-empty-placeholder">
              <div className="empty-icon-circle">
                <MessageSquare size={20} className="text-muted" />
              </div>
              <p className="empty-title">No conversations saved yet</p>
              <p className="empty-desc">Your voice sessions will be automatically saved here.</p>
            </div>
          ) : (
            <div className="history-sections-wrapper">
              {/* 📌 PINNED SECTION AT TOP */}
              {pinnedConversations.length > 0 && (
                <div className="history-section-group">
                  <div className="history-section-header">
                    <span className="history-section-title">📌 PINNED</span>
                  </div>
                  <div className="history-items-container">
                    {pinnedConversations.map(renderConversationRow)}
                  </div>
                </div>
              )}

              {/* HISTORY / UNPINNED SECTION */}
              <div className="history-section-group">
                <div className="history-section-header">
                  <span className="history-section-title">HISTORY</span>
                </div>
                <div className="history-items-container">
                  {unpinnedConversations.map(renderConversationRow)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
