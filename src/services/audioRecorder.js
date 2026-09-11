// THAMILI AI AUDIO PLATFORM - AUDIO RECORDER SERVICE
// Clean microphone capture using MediaRecorder API + Web Audio API AnalyserNode
// Continuously measures microphone audio levels and reliably detects real speech vs silence/background noise

class AudioRecorderService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.stream = null;
    this.isRecording = false;

    // Web Audio API AnalyserNode members
    this.audioContext = null;
    this.analyser = null;
    this.sourceNode = null;
    this.monitorInterval = null;

    // Configurable silence & speech thresholds
    // Typical ambient room noise / fan hum: 0.008 - 0.025 RMS
    // Real speech: 0.050 - 0.350+ RMS
    this.silenceThreshold = 0.040; // Configurable RMS threshold
    this.minSpeechFrames = 3; // ~150ms of sustained audio above threshold to ignore transient clicks
    this.speechDetected = false;
    this.consecutiveSpeechFrames = 0;
    this.totalSpeechFrames = 0;
    this.maxAudioLevel = 0;
    this.currentAudioLevel = 0;
    this.lastLogTime = 0;
  }

  isSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  }

  setSilenceThreshold(threshold) {
    if (typeof threshold === 'number' && threshold >= 0) {
      this.silenceThreshold = threshold;
    }
  }

  getSilenceThreshold() {
    return this.silenceThreshold;
  }

  hasSpeechBeenDetected() {
    return this.speechDetected;
  }

  getMimeType() {
    if (typeof MediaRecorder === 'undefined') return 'audio/webm';

    const candidates = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/wav',
      'audio/mp4'
    ];

    for (const candidate of candidates) {
      if (MediaRecorder.isTypeSupported(candidate)) {
        return candidate;
      }
    }

    return '';
  }

  calculateAudioLevel() {
    if (!this.analyser) return 0;
    const bufferLength = this.analyser.fftSize;
    const timeData = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(timeData);

    let sumSquares = 0;
    for (let i = 0; i < bufferLength; i++) {
      // Convert 8-bit unsigned PCM sample (0..255, 128 is center silence) to normalized [-1.0, 1.0]
      const normalized = (timeData[i] - 128) / 128;
      sumSquares += normalized * normalized;
    }
    return Math.sqrt(sumSquares / bufferLength);
  }

  startAudioLevelMonitoring() {
    this.stopAudioLevelMonitoring();
    this.speechDetected = false;
    this.consecutiveSpeechFrames = 0;
    this.totalSpeechFrames = 0;
    this.maxAudioLevel = 0;
    this.currentAudioLevel = 0;
    this.lastLogTime = 0;

    // Run level measurement every 50ms
    this.monitorInterval = setInterval(() => {
      if (!this.isRecording || !this.analyser) return;

      const level = this.calculateAudioLevel();
      this.currentAudioLevel = level;
      if (level > this.maxAudioLevel) {
        this.maxAudioLevel = level;
      }

      const isAboveThreshold = level >= this.silenceThreshold;
      if (isAboveThreshold) {
        this.consecutiveSpeechFrames += 1;
        this.totalSpeechFrames += 1;
        // Require at least 3 consecutive frames (~150ms) or 5 total frames (~250ms) above threshold
        // to filter out single transient clicks, pops, or typing taps
        if (this.consecutiveSpeechFrames >= this.minSpeechFrames || this.totalSpeechFrames >= 5) {
          if (!this.speechDetected) {
            this.speechDetected = true;
            console.log(
              `[AudioRecorder] 🎤 Speech detected: true | Level: ${level.toFixed(4)} >= Threshold: ${this.silenceThreshold.toFixed(4)}`
            );
          }
        }
      } else {
        this.consecutiveSpeechFrames = 0;
      }

      // Periodic live console log (~every 500ms) showing microphone audio level, speech detected, silence detected
      const now = Date.now();
      if (now - this.lastLogTime >= 500) {
        this.lastLogTime = now;
        console.log(
          `[AudioRecorder] Mic audio level: ${level.toFixed(4)} | Threshold: ${this.silenceThreshold.toFixed(4)} | Speech detected: ${this.speechDetected} | Silence detected: ${!this.speechDetected}`
        );
      }
    }, 50);
  }

  stopAudioLevelMonitoring() {
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
      this.monitorInterval = null;
    }
  }

  cleanupAudioContext() {
    this.stopAudioLevelMonitoring();
    if (this.sourceNode) {
      try {
        this.sourceNode.disconnect();
      } catch (_e) {
        // Safe ignore
      }
      this.sourceNode = null;
    }
    if (this.analyser) {
      try {
        this.analyser.disconnect();
      } catch (_e) {
        // Safe ignore
      }
      this.analyser = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch (_e) {
        // Safe ignore
      }
      this.audioContext = null;
    }
  }

  async startRecording(options = {}) {
    if (!this.isSupported()) {
      throw new Error('Microphone audio recording is not supported in this browser.');
    }

    if (typeof options.silenceThreshold === 'number') {
      this.silenceThreshold = options.silenceThreshold;
    }

    // Stop any existing stream
    this.cancelRecording();

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Initialize Web Audio API AnalyserNode for real-time audio level and silence detection
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        try {
          this.audioContext = new AudioContextClass();
          if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
          }
          this.sourceNode = this.audioContext.createMediaStreamSource(this.stream);
          this.analyser = this.audioContext.createAnalyser();
          this.analyser.fftSize = 512;
          this.analyser.smoothingTimeConstant = 0.2;
          this.sourceNode.connect(this.analyser);
          // Note: We do NOT connect analyser to destination to prevent audio feedback loop
          this.startAudioLevelMonitoring();
        } catch (audioCtxErr) {
          console.warn('[AudioRecorder] Web Audio AnalyserNode setup warning:', audioCtxErr);
        }
      }

      const mimeType = this.getMimeType();
      const recorderOptions = mimeType ? { mimeType } : {};

      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(this.stream, recorderOptions);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(100); // 100ms chunks
      this.isRecording = true;
      console.log(`[AudioRecorder] Recording started. Silence threshold: ${this.silenceThreshold.toFixed(4)}`);
      return true;
    } catch (err) {
      this.isRecording = false;
      this.cleanupAudioContext();
      this.cleanupStream();

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        throw new Error('Microphone permission denied. Please allow microphone access to speak.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        throw new Error('No microphone hardware detected on your device.');
      } else {
        throw new Error(`Microphone initialization error: ${err.message}`);
      }
    }
  }

  stopRecording() {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || !this.isRecording) {
        this.cleanupAudioContext();
        resolve(null);
        return;
      }

      this.stopAudioLevelMonitoring();
      console.log(
        `[AudioRecorder] Recording stopped. Speech detected: ${this.speechDetected} | Silence detected: ${!this.speechDetected} | Max audio level: ${this.maxAudioLevel.toFixed(4)}`
      );

      this.mediaRecorder.onstop = () => {
        try {
          const mimeType = this.mediaRecorder.mimeType || 'audio/webm';
          const audioBlob = new Blob(this.audioChunks, { type: mimeType });
          const speechDetected = this.speechDetected;
          const maxAudioLevel = this.maxAudioLevel;
          const currentAudioLevel = this.currentAudioLevel;

          this.isRecording = false;
          this.cleanupAudioContext();
          this.cleanupStream();

          resolve({
            blob: audioBlob,
            mimeType: mimeType,
            size: audioBlob.size,
            speechDetected: speechDetected,
            maxAudioLevel: maxAudioLevel,
            currentAudioLevel: currentAudioLevel
          });
        } catch (err) {
          this.isRecording = false;
          this.cleanupAudioContext();
          this.cleanupStream();
          reject(err);
        }
      };

      try {
        this.mediaRecorder.stop();
      } catch (err) {
        this.isRecording = false;
        this.cleanupAudioContext();
        this.cleanupStream();
        reject(err);
      }
    });
  }

  cancelRecording() {
    this.stopAudioLevelMonitoring();
    this.cleanupAudioContext();
    if (this.mediaRecorder && this.isRecording) {
      try {
        this.mediaRecorder.stop();
      } catch (_e) {
        // Safe ignore
      }
    }
    this.isRecording = false;
    this.audioChunks = [];
    this.speechDetected = false;
    this.cleanupStream();
  }

  cleanupStream() {
    if (this.stream) {
      try {
        this.stream.getTracks().forEach((track) => track.stop());
      } catch (_e) {
        // Safe ignore
      }
      this.stream = null;
    }
  }
}

export const audioRecorder = new AudioRecorderService();
