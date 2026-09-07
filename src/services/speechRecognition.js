// THAMILI AI AUDIO PLATFORM - SPEECH RECOGNITION SERVICE
// Real Web Speech Recognition with dynamic BCP-47 language support & robust error handling

class SpeechRecognitionService {
  constructor() {
    const SpeechRecognitionClass =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      null;

    this.isSupported = !!SpeechRecognitionClass;
    this.recognition = SpeechRecognitionClass ? new SpeechRecognitionClass() : null;
    this.isListening = false;
    this.onStartCallback = null;
    this.onResultCallback = null;
    this.onErrorCallback = null;
    this.onEndCallback = null;

    if (this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        if (this.onStartCallback) this.onStartCallback();
      };

      this.recognition.onresult = (event) => {
        const transcript =
          event.results &&
          event.results[0] &&
          event.results[0][0] &&
          event.results[0][0].transcript;

        if (this.onResultCallback && transcript) {
          this.onResultCallback(transcript.trim());
        }
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        let errorMessage = 'Could not recognize your voice. Please try again.';

        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          errorMessage = 'Microphone permission is required for voice conversation.';
        } else if (event.error === 'no-speech') {
          errorMessage = 'No voice detected. Please tap the microphone and speak again.';
        } else if (event.error === 'audio-capture') {
          errorMessage = 'No microphone hardware found or microphone is in use.';
        } else if (event.error === 'network') {
          errorMessage = 'Network connection issue during speech recognition.';
        }

        if (this.onErrorCallback) {
          this.onErrorCallback(errorMessage, event.error);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.onEndCallback) this.onEndCallback();
      };
    }
  }

  startListening(languageCode = 'en-US', callbacks = {}) {
    this.onStartCallback = callbacks.onStart || null;
    this.onResultCallback = callbacks.onResult || null;
    this.onErrorCallback = callbacks.onError || null;
    this.onEndCallback = callbacks.onEnd || null;

    if (!this.isSupported) {
      if (this.onErrorCallback) {
        this.onErrorCallback('Voice recognition is not supported in this browser.', 'not-supported');
      }
      return false;
    }

    try {
      if (this.isListening) {
        this.recognition.abort();
      }

      this.recognition.lang = languageCode;
      this.recognition.start();
      return true;
    } catch (error) {
      this.isListening = false;
      if (this.onErrorCallback) {
        this.onErrorCallback('Could not access microphone. Please try again.', error);
      }
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (_e) {
        // Safe ignore
      }
      this.isListening = false;
    }
  }

  abortListening() {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch (_e) {
        // Safe ignore
      }
      this.isListening = false;
    }
  }
}

export const speechRecognizer = new SpeechRecognitionService();
