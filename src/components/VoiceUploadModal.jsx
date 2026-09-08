import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileAudio, 
  Trash2, 
  Play, 
  Pause, 
  CheckCircle2, 
  X, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const LOCALIZED_UPLOAD_TEXTS = {
  tamil: {
    heading: 'உங்கள் குரல் மாதிரியை இழுத்து விடவும்',
    sub: 'அல்லது கணினியிலிருந்து தேர்ந்தெடுக்க கிளிக் செய்யவும்',
    limit: 'அதிகபட்ச அளவு: 25MB • 10-60 வினாடிகள் பரிந்துரைக்கப்படுகிறது',
    title: 'உங்கள் சொந்த குரலை பதிவேற்றவும்',
    subtitle: 'ஏஐ குரல் உருவாக்கத்திற்கு உங்கள் குரல் மாதிரியை பதிவேற்றவும்'
  },
  malayalam: {
    heading: 'നിങ്ങളുടെ ശബ്ദ സാമ്പിൾ ഇവിടെ ഡ്രാഗ് ചെയ്യുക',
    sub: 'അല്ലെങ്കിൽ കമ്പ്യൂട്ടറിൽ നിന്ന് തിരഞ്ഞെടുക്കാൻ ക്ലിക്ക് ചെയ്യുക',
    limit: 'പരമാവധി വലുപ്പം: 25MB • 10-60 സെക്കൻഡ് ശുപാർശ ചെയ്യുന്നു',
    title: 'നിങ്ങളുടെ സ്വന്തം ശബ്ദം അപ്‌ലോഡ് ചെയ്യുക',
    subtitle: 'എഐ ശബ്ദ നിർമ്മാണത്തിനായി നിങ്ങളുടെ ശബ്ദ സാമ്പിൾ നൽകുക'
  },
  hindi: {
    heading: 'अपना वॉइस सैंपल यहाँ खींचें और छोड़ें',
    sub: 'या अपने कंप्यूटर से चुनने के लिए क्लिक करें',
    limit: 'अधिकतम आकार: 25MB • 10-60 सेकंड अनुशंसित',
    title: 'अपनी खुद की आवाज़ अपलोड करें',
    subtitle: 'एआई वॉयस सिंथेसिस के लिए अपने ऑडियो का सैंपल दें'
  },
  telugu: {
    heading: 'మీ వాయిస్ నమూనాను ఇక్కడ లాగి వదలండి',
    sub: 'లేదా కంప్యూటర్ నుండి ఎంచుకోవడానికి క్లిక్ చేయండి',
    limit: 'గరిష్ట పరిమాణం: 25MB • 10-60 సెకన్లు సిఫార్సు చేయబడింది',
    title: 'మీ స్వంత వాయిస్ అప్‌లోడ్ చేయండి',
    subtitle: 'ఏఐ వాయిస్ సంశ్లేషణ కోసం మీ వాయిస్ నమూనాను అందించండి'
  },
  kannada: {
    heading: 'ನಿಮ್ಮ ಧ್ವನಿ ಮಾದರಿಯನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಮತ್ತು ಬಿಡಿ',
    sub: 'ಅಥವಾ ಕಂಪ್ಯೂಟರ್‌ನಿಂದ ಆಯ್ಕೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
    limit: 'ಗರಿಷ್ಠ ಗಾತ್ರ: 25MB • 10-60 ಸೆಕೆಂಡುಗಳು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ',
    title: 'ನಿಮ್ಮ ಸ್ವಂತ ಧ್ವನಿಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    subtitle: 'ಎಐ ಧ್ವನಿ ಸಂಶ್ಲೇಷಣೆಗಾಗಿ ನಿಮ್ಮ ಧ್ವನಿ ಮಾದರಿಯನ್ನು ಒದಗಿಸಿ'
  },
  bengali: {
    heading: 'আপনার ভয়েস নমুনা এখানে টেনে এনে ফেলুন',
    sub: 'অথবা কম্পিউটার থেকে বেছে নিতে ক্লিক করুন',
    limit: 'সর্বোচ্চ সাইজ: 25MB • ১০-৬০ সেকেন্ড প্রস্তাবিত',
    title: 'আপনার নিজস্ব কণ্ঠস্বর আপলোড করুন',
    subtitle: 'এআই ভয়েস সংশ্লেষণের জন্য আপনার অডিও নমুনা দিন'
  },
  marathi: {
    heading: 'तुमचा व्हॉइस सॅम्पल येथे ड्रॅग आणि ड्रॉप करा',
    sub: 'किंवा कॉम्प्युटरवरून निवडण्यासाठी क्लिक करा',
    limit: 'कमाल आकार: 25MB • 10-60 सेकंद शिफारस केलेले',
    title: 'तुमचा स्वतःचा आवाज अपलोड करा',
    subtitle: 'एआय व्हॉइससाठी तुमचा ऑडिओ नमुना द्या'
  },
  gujarati: {
    heading: 'તમારો વૉઇસ નમૂનો અહીં ખેંચો અને મૂકો',
    sub: 'અથવા તમારા કમ્પ્યુટરમાંથી પસંદ કરવા ક્લિક કરો',
    limit: 'મહત્તમ કદ: 25MB • 10-60 સેકન્ડ ભલામણ કરેલ',
    title: 'તમારો પોતાનો અવાજ અપલોડ કરો',
    subtitle: 'એઆઈ વૉઇસ સંશ્લેષણ માટે ઑડિયો નમૂનો આપો'
  },
  spanish: {
    heading: 'Arrastra y suelta tu muestra de voz aquí',
    sub: 'o haz clic para explorar desde tu computadora',
    limit: 'Tamaño máximo: 25MB • 10-60 segundos recomendado',
    title: 'SUBE TU PROPIA VOZ',
    subtitle: 'Sube una muestra de voz para la síntesis de IA'
  },
  french: {
    heading: 'Glissez et déposez votre échantillon vocal ici',
    sub: 'ou cliquez pour parcourir depuis votre ordinateur',
    limit: 'Taille maximale : 25Mo • 10-60 secondes recommandé',
    title: 'TÉLÉVEREZ VOTRE PROPRE VOIX',
    subtitle: 'Téléversez un échantillon pour la synthèse IA'
  },
  german: {
    heading: 'Ziehen Sie Ihre Sprachprobe hierher',
    sub: 'oder klicken Sie, um vom Computer auszuwählen',
    limit: 'Maximale Größe: 25MB • 10-60 Sekunden empfohlen',
    title: 'EIGENE STIMME HOCHLADEN',
    subtitle: 'Laden Sie ein Sprachbeispiel für die KI-Synthese hoch'
  },
  japanese: {
    heading: '音声サンプルをここにドラッグ＆ドロップ',
    sub: 'またはクリックしてコンピューターから選択',
    limit: '最大サイズ: 25MB • 10-60秒を推奨',
    title: 'カスタム音声をアップロード',
    subtitle: 'AI音声合成用のサンプルをアップロードしてください'
  },
  arabic: {
    heading: 'اسحب عينة صوتك وأفلتها هنا',
    sub: 'أو انقر للتصفح من جهاز الكمبيوتر الخاص بك',
    limit: 'الحد الأقصى للحجم: 25 ميجابايت • يوصى بـ 10-60 ثانية',
    title: 'تحميل صوتك الخاص',
    subtitle: 'قم بتحميل عينة صوتية لتوليد صوت الذكاء الاصطناعي'
  },
  english: {
    heading: 'Drag & drop your voice sample here',
    sub: 'or click to browse from your computer',
    limit: 'Maximum size: 25MB • 10-60 seconds recommended',
    title: 'UPLOAD YOUR VOICE',
    subtitle: 'Upload a short audio sample of your voice for AI synthesis'
  }
};

export default function VoiceUploadModal({
  isOpen,
  onClose,
  uploadedFile,
  onSaveVoiceSample,
  onRemoveVoiceSample,
  currentLanguage = 'tamil'
}) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(uploadedFile || null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef(null);
  const audioRef = useRef(null);

  if (!isOpen) return null;

  const acceptedFormats = ['.mp3', '.wav', '.m4a', '.webm', '.ogg'];
  const acceptedTypes = ['audio/mpeg', 'audio/wav', 'audio/x-m4a', 'audio/webm', 'audio/ogg', 'audio/mp4'];

  const validateAndSetFile = (file) => {
    setErrorMsg('');
    if (!file) return;

    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    const isValidFormat = acceptedFormats.includes(fileExtension) || acceptedTypes.includes(file.type);

    if (!isValidFormat) {
      setErrorMsg('Invalid format. Please upload an MP3, WAV, M4A, WebM, or OGG audio file.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setErrorMsg('File size too large. Maximum allowed size is 25MB.');
      return;
    }

    // UPLOADED USER VOICE FILE AVAILABLE HERE
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setSelectedFile(null);
    setAudioUrl(null);
    setIsPlaying(false);
    setErrorMsg('');
    if (onRemoveVoiceSample) {
      onRemoveVoiceSample();
    }
  };

  const handleTogglePlay = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleConfirmUpload = () => {
    if (!selectedFile) {
      setErrorMsg('Please select an audio file first.');
      return;
    }

    setIsProcessing(true);

    // Simulate voice feature extraction and model registration
    setTimeout(() => {
      setIsProcessing(false);

      // UPLOADED USER VOICE FILE AVAILABLE HERE
      // SEND USER VOICE SAMPLE TO REAL VOICE CLONING SERVICE HERE
      // RECEIVE CLONED USER VOICE AUDIO HERE
      // PLAY AI RESPONSE USING CLONED USER VOICE HERE

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (_err) {
        // Safe ignore
      }

      onSaveVoiceSample(selectedFile);
      onClose();
    }, 1200);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const uploadTexts = LOCALIZED_UPLOAD_TEXTS[currentLanguage] || LOCALIZED_UPLOAD_TEXTS.english;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="voice-upload-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <UploadCloud size={20} />
            </div>
            <div>
              <h3 className="modal-title">{uploadTexts.title}</h3>
              <p className="modal-subtitle">{uploadTexts.subtitle}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {errorMsg && (
            <div className="upload-error-alert">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {!selectedFile ? (
            <div
              className={`upload-dropzone ${dragActive ? 'dropzone-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".mp3,.wav,.m4a,.webm,.ogg,audio/*"
                onChange={handleChange}
                style={{ display: 'none' }}
              />

              <div className="dropzone-icon-orb">
                <UploadCloud size={34} />
              </div>
              <h4 className="dropzone-heading">{uploadTexts.heading}</h4>
              <p className="dropzone-sub">{uploadTexts.sub}</p>
              
              <div className="format-pills">
                {acceptedFormats.map((fmt) => (
                  <span key={fmt} className="format-tag">
                    {fmt.replace('.', '').toUpperCase()}
                  </span>
                ))}
              </div>
              <span className="file-size-limit">{uploadTexts.limit}</span>
            </div>
          ) : (
            <div className="uploaded-file-preview-card">
              <div className="file-info-header">
                <div className="file-icon-box">
                  <FileAudio size={24} />
                </div>
                <div className="file-meta">
                  <span className="file-name" title={selectedFile.name}>{selectedFile.name}</span>
                  <div className="file-sub-details">
                    <span className="file-badge">{selectedFile.type || 'audio/wav'}</span>
                    <span className="file-size">{formatFileSize(selectedFile.size)}</span>
                  </div>
                </div>
                <button
                  className="file-remove-btn"
                  onClick={handleRemove}
                  title="Remove uploaded voice sample"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Audio Playback Preview */}
              {audioUrl && (
                <div className="audio-player-bar">
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={() => setIsPlaying(false)}
                    style={{ display: 'none' }}
                  />
                  <button
                    className="player-control-btn"
                    onClick={handleTogglePlay}
                    title={isPlaying ? 'Pause' : 'Play audio preview'}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <div className="player-waveform-visual">
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                    <span className="wave-bar" />
                  </div>
                  <span className="player-label">
                    {isPlaying ? 'Playing preview...' : 'Test sample audio'}
                  </span>
                </div>
              )}

              <div className="voice-analysis-ready">
                <CheckCircle2 size={16} className="text-success" />
                <span>Voice sample ready for cloning synthesis</span>
              </div>
            </div>
          )}

          {/* Architecture integration notice */}
          <div className="cloning-notice-box">
            <Sparkles size={14} className="notice-icon text-purple" />
            <p className="notice-text">
              <strong>Voice Engine Status:</strong> Audio file is securely mapped to your session. Browser speech synthesis acts as immediate fallback until custom voice weights are trained.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="modal-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            id="save-voice-sample-btn"
            className="modal-btn-primary"
            onClick={handleConfirmUpload}
            disabled={!selectedFile || isProcessing}
          >
            {isProcessing ? 'Processing Voice Sample...' : 'Save & Use Voice'}
          </button>
        </div>
      </div>
    </div>
  );
}
