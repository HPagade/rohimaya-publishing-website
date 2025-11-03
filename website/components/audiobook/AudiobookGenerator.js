import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import './AudiobookGenerator.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AudiobookGenerator = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [manuscriptText, setManuscriptText] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('nova');
  const [speed, setSpeed] = useState(1.0);
  const [chapterBreaks, setChapterBreaks] = useState('auto');
  const [backgroundMusic, setBackgroundMusic] = useState(false);
  const [audioFormat, setAudioFormat] = useState('mp3');
  const [jobId, setJobId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [generatedAudio, setGeneratedAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  const voices = [
    { value: 'alloy', label: 'Alloy - Neutral', gender: 'Neutral', description: 'Clear, professional narrator' },
    { value: 'echo', label: 'Echo - Male', gender: 'Male', description: 'Deep, authoritative voice' },
    { value: 'fable', label: 'Fable - Male', gender: 'Male', description: 'Warm, storytelling voice' },
    { value: 'onyx', label: 'Onyx - Male', gender: 'Male', description: 'Rich, deep narrator' },
    { value: 'nova', label: 'Nova - Female', gender: 'Female', description: 'Energetic, engaging voice' },
    { value: 'shimmer', label: 'Shimmer - Female', gender: 'Female', description: 'Soft, soothing narrator' }
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');

      // Auto-populate title from filename
      if (!bookTitle) {
        const name = selectedFile.name.replace(/\.[^/.]+$/, '');
        setBookTitle(name);
      }
    }
  };

  const handleTextInput = (e) => {
    setManuscriptText(e.target.value);
    setError('');
  };

  const generatePreview = async () => {
    if (!manuscriptText && !file) {
      setError('Please provide text or upload a file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = await user.getToken();

      // Get first 500 words for preview
      const previewText = manuscriptText.split(/\s+/).slice(0, 500).join(' ');

      const response = await axios.post(
        `${API_BASE_URL}/api/audiobook/preview`,
        {
          text: previewText,
          voice: selectedVoice,
          speed
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setPreviewUrl(response.data.data.previewUrl);
      setSuccess('Preview generated! Listen below to test the voice.');
      setActiveTab('preview');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate preview');
    } finally {
      setLoading(false);
    }
  };

  const generateAudiobook = async () => {
    if (!manuscriptText && !file) {
      setError('Please provide text or upload a file');
      return;
    }

    if (!bookTitle.trim()) {
      setError('Please enter a book title');
      return;
    }

    setLoading(true);
    setError('');
    setActiveTab('processing');

    try {
      const token = await user.getToken();

      let requestData;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', bookTitle);
        formData.append('voice', selectedVoice);
        formData.append('speed', speed);
        formData.append('chapterBreaks', chapterBreaks);
        formData.append('backgroundMusic', backgroundMusic);
        formData.append('format', audioFormat);

        requestData = formData;
      } else {
        requestData = {
          text: manuscriptText,
          title: bookTitle,
          voice: selectedVoice,
          speed,
          chapterBreaks,
          backgroundMusic,
          format: audioFormat
        };
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/audiobook/generate`,
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': file ? 'multipart/form-data' : 'application/json'
          }
        }
      );

      setJobId(response.data.data.jobId);
      setSuccess('Audiobook generation started!');

      // Start polling for progress
      pollProgress(response.data.data.jobId, token);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate audiobook');
      setLoading(false);
      setActiveTab('upload');
    }
  };

  const pollProgress = async (id, token) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/audiobook/status/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        const { status, progress: currentProgress, audioFiles, error: jobError } = response.data.data;

        setProgress(currentProgress || 0);

        if (status === 'completed') {
          clearInterval(interval);
          setGeneratedAudio(audioFiles);
          setSuccess('Audiobook generated successfully!');
          setLoading(false);
          setActiveTab('download');
        } else if (status === 'failed') {
          clearInterval(interval);
          setError(jobError || 'Audiobook generation failed');
          setLoading(false);
          setActiveTab('upload');
        }
      } catch (err) {
        console.error('Status check error:', err);
      }
    }, 3000);
  };

  const downloadAudiobook = async () => {
    if (!jobId) return;

    try {
      const token = await user.getToken();
      const response = await axios.get(
        `${API_BASE_URL}/api/audiobook/download/${jobId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          responseType: 'blob'
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${bookTitle.replace(/[^a-z0-9]/gi, '_')}_audiobook.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setSuccess('Audiobook downloaded!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to download audiobook');
    }
  };

  const startOver = () => {
    setActiveTab('upload');
    setFile(null);
    setManuscriptText('');
    setBookTitle('');
    setJobId(null);
    setProgress(0);
    setGeneratedAudio(null);
    setPreviewUrl(null);
    setError('');
    setSuccess('');
  };

  return (
    <div className="audiobook-generator">
      <div className="audiobook-header">
        <h1>🎙️ Audiobook Generator</h1>
        <p>Transform your manuscript into professional audiobook with AI voices</p>
      </div>

      <div className="audiobook-tabs">
        <button
          className={activeTab === 'upload' ? 'active' : ''}
          onClick={() => setActiveTab('upload')}
        >
          Upload
        </button>
        <button
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
        <button
          className={activeTab === 'preview' ? 'active' : ''}
          onClick={() => setActiveTab('preview')}
          disabled={!previewUrl}
        >
          Preview
        </button>
        <button
          className={activeTab === 'processing' ? 'active' : ''}
          onClick={() => setActiveTab('processing')}
          disabled={!loading && !jobId}
        >
          Processing
        </button>
        <button
          className={activeTab === 'download' ? 'active' : ''}
          onClick={() => setActiveTab('download')}
          disabled={!generatedAudio}
        >
          Download
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {activeTab === 'upload' && (
        <div className="tab-content">
          <div className="upload-section">
            <h3>Upload Your Manuscript</h3>

            <div className="form-group">
              <label>Book Title *</label>
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Enter your book title"
              />
            </div>

            <div className="upload-options">
              <div className="upload-option">
                <h4>Option 1: Upload File</h4>
                <input
                  type="file"
                  accept=".txt,.docx,.pdf"
                  onChange={handleFileChange}
                />
                {file && <p className="file-name">Selected: {file.name}</p>}
              </div>

              <div className="divider">OR</div>

              <div className="upload-option">
                <h4>Option 2: Paste Text</h4>
                <textarea
                  value={manuscriptText}
                  onChange={handleTextInput}
                  placeholder="Paste your manuscript text here..."
                  rows="10"
                />
                {manuscriptText && (
                  <p className="word-count">
                    {manuscriptText.split(/\s+/).length} words (~
                    {Math.ceil(manuscriptText.split(/\s+/).length / 150)} minutes audio)
                  </p>
                )}
              </div>
            </div>

            <div className="action-buttons">
              <button
                onClick={() => setActiveTab('settings')}
                className="primary-btn"
                disabled={!file && !manuscriptText}
              >
                Next: Choose Voice →
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="tab-content">
          <div className="settings-section">
            <h3>Audiobook Settings</h3>

            <div className="form-group">
              <label>Voice Narrator</label>
              <div className="voice-grid">
                {voices.map((voice) => (
                  <div
                    key={voice.value}
                    className={`voice-card ${selectedVoice === voice.value ? 'selected' : ''}`}
                    onClick={() => setSelectedVoice(voice.value)}
                  >
                    <h4>{voice.label}</h4>
                    <span className="voice-gender">{voice.gender}</span>
                    <p>{voice.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Speed: {speed}x</label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                />
                <div className="speed-labels">
                  <span>Slower</span>
                  <span>Normal</span>
                  <span>Faster</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Chapter Breaks</label>
              <select value={chapterBreaks} onChange={(e) => setChapterBreaks(e.target.value)}>
                <option value="auto">Auto-detect (recommended)</option>
                <option value="manual">I'll specify manually</option>
                <option value="none">No chapter breaks</option>
              </select>
            </div>

            <div className="form-group">
              <label>Audio Format</label>
              <select value={audioFormat} onChange={(e) => setAudioFormat(e.target.value)}>
                <option value="mp3">MP3 (most compatible)</option>
                <option value="m4b">M4B (audiobook format)</option>
                <option value="wav">WAV (highest quality)</option>
              </select>
            </div>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={backgroundMusic}
                  onChange={(e) => setBackgroundMusic(e.target.checked)}
                />
                Add subtle background music (coming soon)
              </label>
            </div>

            <div className="action-buttons">
              <button onClick={() => setActiveTab('upload')} className="secondary-btn">
                ← Back
              </button>
              <button onClick={generatePreview} className="secondary-btn" disabled={loading}>
                Generate Preview (500 words)
              </button>
              <button onClick={generateAudiobook} className="primary-btn" disabled={loading}>
                {loading ? 'Generating...' : 'Generate Full Audiobook →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preview' && previewUrl && (
        <div className="tab-content">
          <div className="preview-section">
            <h3>Voice Preview</h3>
            <p>Listen to the first 500 words with your selected voice:</p>

            <div className="audio-player">
              <audio controls src={previewUrl} style={{ width: '100%' }}>
                Your browser does not support the audio element.
              </audio>
            </div>

            <div className="preview-info">
              <p><strong>Voice:</strong> {voices.find(v => v.value === selectedVoice)?.label}</p>
              <p><strong>Speed:</strong> {speed}x</p>
              <p><strong>Format:</strong> {audioFormat.toUpperCase()}</p>
            </div>

            <div className="action-buttons">
              <button onClick={() => setActiveTab('settings')} className="secondary-btn">
                ← Change Settings
              </button>
              <button onClick={generateAudiobook} className="primary-btn" disabled={loading}>
                Sounds Good! Generate Full Audiobook →
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'processing' && (
        <div className="tab-content">
          <div className="processing-section">
            <div className="processing-animation">
              <div className="spinner"></div>
              <h3>Generating Your Audiobook...</h3>
              <p>This may take several minutes depending on length</p>

              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}>
                  <span>{progress}%</span>
                </div>
              </div>

              <div className="processing-stats">
                <p>Voice: {voices.find(v => v.value === selectedVoice)?.label}</p>
                <p>Speed: {speed}x</p>
                <p>Format: {audioFormat.toUpperCase()}</p>
              </div>

              <p className="processing-tip">
                💡 Tip: You can close this tab. We'll email you when it's ready!
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'download' && generatedAudio && (
        <div className="tab-content">
          <div className="download-section">
            <div className="success-icon">✅</div>
            <h3>Audiobook Ready!</h3>
            <p>Your audiobook has been successfully generated</p>

            <div className="audiobook-details">
              <h4>{bookTitle}</h4>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="label">Voice:</span>
                  <span className="value">{voices.find(v => v.value === selectedVoice)?.label}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Format:</span>
                  <span className="value">{audioFormat.toUpperCase()}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Chapters:</span>
                  <span className="value">{generatedAudio?.chapters || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Duration:</span>
                  <span className="value">{generatedAudio?.duration || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="download-options">
              <button onClick={downloadAudiobook} className="primary-btn large">
                💾 Download Audiobook
              </button>

              <div className="additional-formats">
                <p>Need a different format?</p>
                <button className="secondary-btn">Convert to M4B</button>
                <button className="secondary-btn">Convert to WAV</button>
              </div>
            </div>

            <div className="next-steps">
              <h4>Next Steps:</h4>
              <ul>
                <li>✅ Upload to ACX/Audible</li>
                <li>✅ Distribute via Findaway Voices</li>
                <li>✅ Add to your website/Patreon</li>
                <li>✅ Create social media teasers</li>
              </ul>
            </div>

            <button onClick={startOver} className="secondary-btn">
              Create Another Audiobook
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudiobookGenerator;
