// THAMILI AI AUDIO PLATFORM - HIGH-RELIABILITY SPEECH SYNTHESIS ENGINE
// Seamless Multi-Language Voice Synthesis for all 14 Languages (Tamil, Hindi, Telugu, Malayalam, etc.)

class SpeechAudioEngine {
  constructor() {
    this.voices = [];
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.keepAliveTimer = null;
    this.speechQueue = [];
    this.sessionId = 0;

    this.initVoices();
    this.setupUserGestureUnlock();
  }

  initVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) {
          this.voices = v;
        }
      };
      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
  }

  setupUserGestureUnlock() {
    if (typeof window !== 'undefined') {
      const unlock = () => {
        if ('speechSynthesis' in window) {
          try {
            window.speechSynthesis.resume();
          } catch (_e) {
            // Safe ignore
          }
        }
      };
      window.addEventListener('click', unlock, { passive: true });
      window.addEventListener('touchstart', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
    }
  }

  getVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const live = window.speechSynthesis.getVoices();
      if (live && live.length > 0) {
        this.voices = live;
      }
    }
    return this.voices;
  }

  // Detect language tag from text content and default language
  detectTextLanguage(text = '', defaultLang = 'ta-IN') {
    // Unicode script checks
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta-IN'; // Tamil
    if (/[\u0D00-\u0D7F]/.test(text)) return 'ml-IN'; // Malayalam
    if (/[\u0C80-\u0CFF]/.test(text)) return 'kn-IN'; // Kannada
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te-IN'; // Telugu
    if (/[\u0980-\u09FF]/.test(text)) return 'bn-IN'; // Bengali
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu-IN'; // Gujarati
    if (/[\u0600-\u06FF]/.test(text)) return 'ar-SA'; // Arabic
    if (/[\u3040-\u30FF\u4E00-\u9FAF]/.test(text)) return 'ja-JP'; // Japanese

    // Check Devanagari (Hindi vs Marathi)
    if (/[\u0900-\u097F]/.test(text)) {
      const dl = (defaultLang || '').toLowerCase();
      if (dl.startsWith('mr') || dl === 'marathi') return 'mr-IN';
      return 'hi-IN';
    }

    if (defaultLang) {
      const dl = defaultLang.toLowerCase();
      const langNameMap = {
        tamil: 'ta-IN',
        hindi: 'hi-IN',
        telugu: 'te-IN',
        malayalam: 'ml-IN',
        kannada: 'kn-IN',
        bengali: 'bn-IN',
        marathi: 'mr-IN',
        gujarati: 'gu-IN',
        spanish: 'es-ES',
        french: 'fr-FR',
        german: 'de-DE',
        japanese: 'ja-JP',
        arabic: 'ar-SA',
        english: 'en-US'
      };

      if (langNameMap[dl]) return langNameMap[dl];

      const prefix = dl.split('-')[0].toLowerCase();
      const bcpMap = {
        ta: 'ta-IN',
        hi: 'hi-IN',
        te: 'te-IN',
        ml: 'ml-IN',
        kn: 'kn-IN',
        bn: 'bn-IN',
        mr: 'mr-IN',
        gu: 'gu-IN',
        es: 'es-ES',
        fr: 'fr-FR',
        de: 'de-DE',
        ja: 'ja-JP',
        ar: 'ar-SA',
        en: 'en-US'
      };
      if (bcpMap[prefix]) return bcpMap[prefix];
      return defaultLang;
    }

    return 'en-US';
  }

  // Get best voice matching the target language and gender preference
  getBestVoice(languageCode = 'ta-IN', isMale = false) {
    const voices = this.getVoices();
    if (!voices || voices.length === 0) return null;

    const langPrefix = languageCode.split('-')[0].toLowerCase();

    const maleKeywords = [
      'male', 'man', 'boy', 'guy', 'baritone', 'bass', 'david', 'mark', 'george', 'alex', 'daniel', 'fred',
      'valluvar', 'karthik', 'ravi', 'kumar', 'saravanan', 'suresh', 'murugan', 'madhur', 'hemant', 'amit',
      'rishi', 'kabir', 'rohan', 'mohan', 'ramesh', 'krishna', 'midhun', 'anoop', 'gagan', 'raghu',
      'bashkar', 'manohar', 'niranjan', 'alvaro', 'jorge', 'henri', 'conrad', 'keita', 'hamed'
    ];

    const femaleKeywords = [
      'female', 'woman', 'girl', 'lady', 'zira', 'samantha', 'victoria', 'karen', 'veena', 'susan', 'leena',
      'heera', 'pallavi', 'kavya', 'vani', 'swara', 'kalpana', 'geeta', 'hazel', 'siri', 'alice', 'anna',
      'emma', 'jenny', 'olivia', 'maria', 'claire', 'shruti', 'ananya', 'fatima'
    ];

    if (isMale) {
      // 1. First priority: Target language + explicit male voice (e.g. Microsoft Valluvar in Tamil, Microsoft Madhur in Hindi)
      let match = voices.find((v) => {
        const vLang = v.lang.replace('_', '-').toLowerCase();
        const vName = v.name.toLowerCase();
        return vLang.startsWith(langPrefix) && maleKeywords.some((k) => vName.includes(k)) && !femaleKeywords.some((k) => vName.includes(k));
      });

      // 2. Second priority: Target language voice (e.g. Google தமிழ், Google हिन्दी)
      if (!match) {
        match = voices.find((v) => v.lang.replace('_', '-').toLowerCase().startsWith(langPrefix));
      }

      // 3. For English ONLY: match general system male voice
      if (!match && langPrefix === 'en') {
        match = voices.find((v) => maleKeywords.some((k) => v.name.toLowerCase().includes(k)));
      }

      return match || null;
    } else {
      // 1. Female voice in target language
      let match = voices.find((v) => {
        const vLang = v.lang.replace('_', '-').toLowerCase();
        const vName = v.name.toLowerCase();
        return vLang.startsWith(langPrefix) && femaleKeywords.some((k) => vName.includes(k)) && !maleKeywords.some((k) => vName.includes(k));
      });

      // 2. Any voice in target language
      if (!match) {
        match = voices.find((v) => v.lang.replace('_', '-').toLowerCase().startsWith(langPrefix));
      }

      return match || null;
    }
  }

  // Emotion Pitch & Rate Modifiers
  getEmotionModifiers(emotion = 'default') {
    const table = {
      default: { pitch: 1.0, rate: 1.0 },
      happy: { pitch: 1.12, rate: 1.05 },
      sad: { pitch: 0.88, rate: 0.82 },
      husky: { pitch: 0.76, rate: 0.88 },
      excitement: { pitch: 1.18, rate: 1.12 },
      calm: { pitch: 0.94, rate: 0.88 },
      romantic: { pitch: 0.95, rate: 0.86 },
      bold: { pitch: 0.85, rate: 1.04 }
    };
    return table[emotion] || table.default;
  }

  // Split text into natural, digestible sentences for zero-stall synthesis
  splitIntoSentences(text) {
    const clean = (text || '').replace(/[*_#`~[\]()]/g, '').trim();
    if (!clean) return [];

    const raw = clean.split(/(?<=[.?!:\n])\s+/);
    const result = [];

    for (const s of raw) {
      const trimmed = s.trim();
      if (!trimmed) continue;
      if (trimmed.length <= 160) {
        result.push(trimmed);
      } else {
        const parts = trimmed.split(/(?<=[,;])\s+/);
        let cur = '';
        for (const p of parts) {
          if ((cur + ' ' + p).length <= 160) {
            cur = cur ? `${cur} ${p}` : p;
          } else {
            if (cur) result.push(cur);
            cur = p;
          }
        }
        if (cur) result.push(cur);
      }
    }

    return result.length > 0 ? result : [clean];
  }

  // Unified Speak Function
  speak(text, { languageCode = 'ta-IN', voicePreference = 'female', emotion = 'default', rate = 1.0, pitch = 1.0, speechSpeed = 'normal', onStart, onEnd, onError } = {}) {
    this.stop();

    if (!text || text.trim() === '') {
      if (onEnd) onEnd();
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onError) onError('Speech synthesis is not supported on this browser.');
      return;
    }

    const currentSession = ++this.sessionId;
    this.isSpeaking = true;
    if (onStart) onStart();

    const targetLangCode = this.detectTextLanguage(text, languageCode);
    const voiceId = (typeof voicePreference === 'string' ? voicePreference : voicePreference?.id || 'female').toLowerCase();
    const maleVoiceIds = ['male', 'karthik', 'valluvar', 'alex', 'ryan', 'rohan', 'kabir', 'ramesh', 'krishna', 'deep', 'boy', 'man'];
    const isMale = maleVoiceIds.includes(voiceId);
    const isUser = voiceId === 'user';

    // Speed multiplier calculation
    let speedMultiplier = 1.0;
    if (speechSpeed === 'slow') speedMultiplier = 0.60;
    else if (speechSpeed === 'fast') speedMultiplier = 1.45;
    else if (speechSpeed === 'normal') speedMultiplier = 1.0;
    else if (typeof speechSpeed === 'number') speedMultiplier = speechSpeed;

    const baseRate = (Number(rate) || 1.0) * speedMultiplier;
    const emMod = this.getEmotionModifiers(emotion);

    // Audio Pitch calculation:
    // When isMale is true: Deep low pitch 0.38 - 0.45 for rich masculine depth
    // When isMale is false (female): Bright natural pitch 1.15
    let calculatedPitch;
    let calculatedRate;

    if (isMale) {
      calculatedPitch = 0.40 * emMod.pitch;
      calculatedRate = baseRate * 0.95 * emMod.rate;
    } else if (isUser) {
      calculatedPitch = 0.96 * emMod.pitch;
      calculatedRate = baseRate * 1.0 * emMod.rate;
    } else {
      calculatedPitch = 1.15 * emMod.pitch;
      calculatedRate = baseRate * 1.0 * emMod.rate;
    }

    calculatedPitch = Math.max(0.2, Math.min(2.0, calculatedPitch));
    calculatedRate = Math.max(0.35, Math.min(2.5, calculatedRate));

    const selectedVoice = this.getBestVoice(targetLangCode, isMale);
    const sentences = this.splitIntoSentences(text);

    let sentenceIndex = 0;

    const speakNextSentence = () => {
      if (!this.isSpeaking || this.sessionId !== currentSession) return;

      if (sentenceIndex >= sentences.length) {
        this.isSpeaking = false;
        this.clearKeepAlive();
        this.currentUtterance = null;
        if (onEnd) onEnd();
        return;
      }

      const sentence = sentences[sentenceIndex];
      sentenceIndex++;

      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = targetLangCode;
      utterance.pitch = calculatedPitch;
      utterance.rate = calculatedRate;
      utterance.volume = 1.0;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onend = () => {
        speakNextSentence();
      };

      utterance.onerror = (e) => {
        console.warn('Speech chunk notice:', e);
        speakNextSentence();
      };

      this.currentUtterance = utterance;

      try {
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis speak error:', err);
        this.isSpeaking = false;
        this.clearKeepAlive();
        if (onError) onError(err);
      }
    };

    this.clearKeepAlive();
    this.keepAliveTimer = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.resume();
        } else if (!this.isSpeaking) {
          this.clearKeepAlive();
        }
      }
    }, 2000);

    // Initial trigger
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
    } catch (_e) {
      // Safe ignore
    }

    setTimeout(() => {
      speakNextSentence();
    }, 50);
  }

  clearKeepAlive() {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  stop() {
    this.clearKeepAlive();
    this.sessionId++;
    this.isSpeaking = false;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (_e) {
        // Safe ignore
      }
    }

    this.currentUtterance = null;
  }
}

export const speechAudioEngine = new SpeechAudioEngine();
