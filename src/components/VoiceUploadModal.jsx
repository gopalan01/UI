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

export default function VoiceUploadModal({
  isOpen,
  onClose,
  uploadedFile,
  onSaveVoiceSample,
  onRemoveVoiceSample
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
              <h3 className="modal-title">UPLOAD YOUR VOICE</h3>
              <p className="modal-subtitle">Upload a short audio sample of your voice for AI synthesis</p>
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
              <h4 className="dropzone-heading">Drag & drop your voice sample here</h4>
              <p className="dropzone-sub">or click to browse from your computer</p>
              
              <div className="format-pills">
                {acceptedFormats.map((fmt) => (
                  <span key={fmt} className="format-tag">
                    {fmt.replace('.', '').toUpperCase()}
                  </span>
                ))}
              </div>
              <span className="file-size-limit">Maximum size: 25MB • 10-60 seconds recommended</span>
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
