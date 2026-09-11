// THAMILI AI AUDIO PLATFORM - AUDIO RECORDER SERVICE
// Clean microphone capture using MediaRecorder API producing standard audio Blobs

class AudioRecorderService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.stream = null;
    this.isRecording = false;
  }

  isSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
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

  async startRecording() {
    if (!this.isSupported()) {
      throw new Error('Microphone audio recording is not supported in this browser.');
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

      const mimeType = this.getMimeType();
      const options = mimeType ? { mimeType } : {};

      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(this.stream, options);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(100); // 100ms chunks
      this.isRecording = true;
      return true;
    } catch (err) {
      this.isRecording = false;
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
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        try {
          const mimeType = this.mediaRecorder.mimeType || 'audio/webm';
          const audioBlob = new Blob(this.audioChunks, { type: mimeType });
          this.isRecording = false;
          this.cleanupStream();
          resolve({
            blob: audioBlob,
            mimeType: mimeType,
            size: audioBlob.size
          });
        } catch (err) {
          this.isRecording = false;
          this.cleanupStream();
          reject(err);
        }
      };

      try {
        this.mediaRecorder.stop();
      } catch (err) {
        this.isRecording = false;
        this.cleanupStream();
        reject(err);
      }
    });
  }

  cancelRecording() {
    if (this.mediaRecorder && this.isRecording) {
      try {
        this.mediaRecorder.stop();
      } catch (_e) {
        // Safe ignore
      }
    }
    this.isRecording = false;
    this.audioChunks = [];
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
