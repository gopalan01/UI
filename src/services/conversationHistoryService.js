// AURQO AI AUDIO PLATFORM - CONVERSATION HISTORY SERVICE
// LocalStorage-based persistence with sequential naming ("Voice Conversation N"), pinning, renaming, and auto-save

const STORAGE_KEY = 'aurqo_conversation_history';

/**
 * Fetch all saved conversations from LocalStorage
 * Sorted: pinned items first (pinned = true), then newest first (updatedAt/createdAt descending)
 * @returns {Array} - Array of conversations
 */
export function getSavedConversations() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return [];

    // Sort: pinned first (true > false), then updatedAt/createdAt descending
    return list.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      return timeB - timeA;
    });
  } catch (err) {
    console.warn('Failed to load conversation history from localStorage:', err);
    return [];
  }
}

// Dispatch custom event to notify all components (Sidebar, etc.) in real time
function notifyConversationChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('aurqo_conversations_updated'));
  }
}

/**
 * Get next sequential title: "Conversation 1", "Conversation 2", etc.
 * Finds the highest number in existing titles and increments by 1.
 * @returns {string} - Sequential title
 */
export function getNextSequentialTitle() {
  const list = getSavedConversations();
  if (!list || list.length === 0) {
    return 'Conversation 1';
  }

  let maxNum = 0;
  list.forEach((item) => {
    if (item && item.title) {
      const match = item.title.match(/^(?:Voice\s+)?Conversation\s+(\d+)$/i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    }
  });

  const nextNumber = maxNum > 0 ? maxNum + 1 : (list.length + 1);
  return `Conversation ${nextNumber}`;
}

/**
 * Save or update a conversation session in LocalStorage
 * @param {Object} conversationData - Complete conversation data object
 * @returns {Object|null} - Saved conversation object
 */
export function saveConversationSession({
  id,
  title,
  messages = [],
  pinned = false,
  language = 'tamil',
  country = 'tamil_nadu',
  region = 'tamil_nadu',
  style = 'kongu_tamil',
  slang = 'kongu_tamil',
  voice = 'female',
  emotion = 'default',
  speechSpeed = 'normal',
  createdAt = null,
  forceSave = false
}) {
  if (typeof window === 'undefined') return null;

  // Don't save completely empty conversations with 0 messages
  if (!messages || messages.length === 0) return null;

  // Unless forceSave is true, skip sessions that only have 1 AI greeting and no user messages
  const hasUserMessage = messages.some((m) => m.sender === 'user');
  if (!forceSave && !hasUserMessage && messages.length <= 1) {
    return null;
  }

  const existing = getSavedConversations();
  const existingIndex = id ? existing.findIndex((c) => c.id === id) : -1;

  const now = new Date().toISOString();
  const effectiveCountry = country || region || 'tamil_nadu';
  const effectiveStyle = style || slang || 'kongu_tamil';

  let convId = id;
  let convTitle = title;
  let convPinned = Boolean(pinned);
  let convCreatedAt = createdAt;

  if (existingIndex >= 0) {
    const existingEntry = existing[existingIndex];
    convId = existingEntry.id;
    // Preserve existing title unless a new explicit non-empty title is provided
    convTitle = title || existingEntry.title || getNextSequentialTitle();
    convPinned = pinned !== undefined ? Boolean(pinned) : Boolean(existingEntry.pinned);
    convCreatedAt = existingEntry.createdAt || createdAt || now;
  } else {
    convId = id || `conv_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    if (!convTitle) {
      convTitle = getNextSequentialTitle();
    }
    convCreatedAt = createdAt || now;
  }

  const newEntry = {
    id: convId,
    title: convTitle,
    messages: messages.map((m) => ({
      id: m.id || Date.now() + Math.random(),
      sender: m.sender,
      text: m.text,
      slangName: m.slangName || '',
      language: m.language || language,
      timestamp: m.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })),
    pinned: convPinned,
    createdAt: convCreatedAt,
    updatedAt: now,
    language: language || 'tamil',
    country: effectiveCountry,
    region: effectiveCountry,
    style: effectiveStyle,
    slang: effectiveStyle,
    voice: voice || 'female',
    emotion: emotion || 'default',
    speechSpeed: speechSpeed || 'normal'
  };

  try {
    let updatedList;
    if (existingIndex >= 0) {
      updatedList = existing.map((c) => (c.id === convId ? newEntry : c));
    } else {
      updatedList = [newEntry, ...existing];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    notifyConversationChange();
    return newEntry;
  } catch (err) {
    console.warn('Failed to save conversation to localStorage:', err);
    return newEntry;
  }
}

/**
 * Toggle pinned status for a saved conversation
 * @param {string} id - Conversation ID
 * @returns {Array} - Updated conversations list
 */
export function togglePinConversation(id) {
  if (typeof window === 'undefined' || !id) return [];
  try {
    const list = getSavedConversations();
    const updated = list.map((c) => (c.id === id ? { ...c, pinned: !c.pinned, updatedAt: new Date().toISOString() } : c));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    notifyConversationChange();
    return getSavedConversations();
  } catch (err) {
    console.warn('Failed to toggle pin:', err);
    return [];
  }
}

/**
 * Rename a specific saved conversation
 * @param {string} id - Conversation ID
 * @param {string} newTitle - New title string
 * @returns {Array} - Updated conversations list
 */
export function renameConversation(id, newTitle) {
  if (typeof window === 'undefined' || !id || !newTitle || !newTitle.trim()) return getSavedConversations();
  try {
    const list = getSavedConversations();
    const updated = list.map((c) => (c.id === id ? { ...c, title: newTitle.trim(), updatedAt: new Date().toISOString() } : c));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    notifyConversationChange();
    return getSavedConversations();
  } catch (err) {
    console.warn('Failed to rename conversation:', err);
    return [];
  }
}

/**
 * Delete ONLY the selected conversation from LocalStorage
 * @param {string} id - Conversation ID
 * @returns {Array} - Updated conversations list
 */
export function deleteConversation(id) {
  if (typeof window === 'undefined' || !id) return [];
  try {
    const list = getSavedConversations();
    const updated = list.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    notifyConversationChange();
    return getSavedConversations();
  } catch (err) {
    console.warn('Failed to delete conversation:', err);
    return [];
  }
}
