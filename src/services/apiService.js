// THAMILI AI AUDIO PLATFORM - FASTAPI BACKEND API SERVICE
// Manages communication with FastAPI backend endpoints (/health, /conversation)

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

class ApiService {
  constructor(baseUrl = BACKEND_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Health Check: Verifies if FastAPI backend is accessible
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.warn('Backend health check error:', err.message);
      return { status: 'offline', error: err.message };
    }
  }

  /**
   * Send Recorded Voice Audio + Settings to FastAPI /conversation
   */
  async sendConversation(audioBlob, settings = {}) {
    if (!audioBlob || audioBlob.size === 0) {
      throw new Error('No audio recorded. Please record audio before sending.');
    }

    const formData = new FormData();

    // Determine extension based on blob type
    const mimeType = audioBlob.type || 'audio/webm';
    let ext = 'webm';
    if (mimeType.includes('wav')) ext = 'wav';
    else if (mimeType.includes('mp4') || mimeType.includes('m4a')) ext = 'm4a';
    else if (mimeType.includes('mp3') || mimeType.includes('mpeg')) ext = 'mp3';
    else if (mimeType.includes('ogg')) ext = 'ogg';

    formData.append('audio', audioBlob, `microphone_recording.${ext}`);
    formData.append('language', settings.language || 'tamil');
    formData.append('country', settings.region || settings.country || 'tamil_nadu');
    formData.append('slang', settings.slang || 'kongu_tamil');
    formData.append('voice_type', settings.voice || 'female');
    formData.append('tone', settings.emotion || 'default');
    formData.append('speech_speed', settings.speechSpeed || 'normal');

    const response = await fetch(`${this.baseUrl}/conversation`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      let errorDetail = `Server returned status ${response.status}`;
      try {
        const errorJson = await response.json();
        if (errorJson && errorJson.message) {
          errorDetail = errorJson.message;
        } else if (errorJson && errorJson.detail) {
          errorDetail = errorJson.detail;
        }
      } catch (_e) {
        // Safe fallback
      }
      throw new Error(errorDetail);
    }

    return await response.json();
  }

  /**
   * Transcribe Audio using FastAPI /transcribe (Groq Whisper)
   */
  async transcribeAudio(audioBlob, language = 'auto') {
    if (!audioBlob || audioBlob.size === 0) {
      throw new Error('No audio recorded to transcribe.');
    }

    const formData = new FormData();
    const mimeType = audioBlob.type || 'audio/webm';
    let ext = 'webm';
    if (mimeType.includes('wav')) ext = 'wav';
    else if (mimeType.includes('mp4') || mimeType.includes('m4a')) ext = 'm4a';
    else if (mimeType.includes('mp3') || mimeType.includes('mpeg')) ext = 'mp3';
    else if (mimeType.includes('ogg')) ext = 'ogg';

    formData.append('audio', audioBlob, `recording.${ext}`);
    formData.append('language', language || 'auto');

    const response = await fetch(`${this.baseUrl}/transcribe`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      let errorDetail = `Transcription failed (${response.status})`;
      try {
        const errorJson = await response.json();
        if (errorJson && (errorJson.message || errorJson.detail)) {
          errorDetail = errorJson.message || errorJson.detail;
        }
      } catch (_e) {}
      throw new Error(errorDetail);
    }

    return await response.json();
  }

  /**
   * Synthesize Speech using FastAPI /synthesize (Edge-TTS)
   */
  async synthesizeSpeech(text, { language = 'tamil', voice = 'female', emotion = 'default', speechSpeed = 'normal' } = {}) {
    if (!text || !text.trim()) {
      throw new Error('Empty text provided for synthesis.');
    }

    const formData = new FormData();
    formData.append('text', text.trim());
    formData.append('language', language || 'tamil');
    formData.append('voice_type', voice || 'female');
    formData.append('tone', emotion || 'default');
    formData.append('speech_speed', speechSpeed || 'normal');

    const response = await fetch(`${this.baseUrl}/synthesize`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      let errorDetail = `Synthesis failed (${response.status})`;
      try {
        const errorJson = await response.json();
        if (errorJson && (errorJson.message || errorJson.detail)) {
          errorDetail = errorJson.message || errorJson.detail;
        }
      } catch (_e) {}
      throw new Error(errorDetail);
    }

    return await response.json();
  }
}

export const apiService = new ApiService();
