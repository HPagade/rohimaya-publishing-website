/**
 * AI Videos - Book Trailer Creation App
 * Generates video trailers for books using AI
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AIVideos.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AIVideos = () => {
  // Form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('fiction');
  const [synopsis, setSynopsis] = useState('');
  const [duration, setDuration] = useState(60);
  const [tone, setTone] = useState('dramatic');

  // Voiceover state
  const [voice, setVoice] = useState('alloy');
  const [availableVoices, setAvailableVoices] = useState([]);

  // Workflow state
  const [step, setStep] = useState(1); // 1: Generate Script, 2: Review Script, 3: Generate Voiceover, 4: Final Video
  const [generatedScript, setGeneratedScript] = useState('');
  const [voiceoverUrl, setVoiceoverUrl] = useState('');
  const [finalVideoUrl, setFinalVideoUrl] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const genres = [
    'fiction', 'nonfiction', 'fantasy', 'scifi', 'romance',
    'mystery', 'thriller', 'horror', 'cookbook', 'childrens'
  ];

  const tones = [
    { value: 'dramatic', label: 'Dramatic' },
    { value: 'exciting', label: 'Exciting' },
    { value: 'mysterious', label: 'Mysterious' },
    { value: 'romantic', label: 'Romantic' },
    { value: 'lighthearted', label: 'Lighthearted' },
    { value: 'suspenseful', label: 'Suspenseful' }
  ];

  useEffect(() => {
    fetchVoices();
  }, []);

  const fetchVoices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/videos/voices`);
      if (response.data.success) {
        setAvailableVoices(response.data.data.voices);
      }
    } catch (err) {
      console.error('Failed to fetch voices:', err);
    }
  };

  const handleGenerateScript = async (e) => {
    e.preventDefault();

    if (!title || !synopsis) {
      setError('Please provide at least a title and synopsis');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/videos/script`, {
        title,
        author,
        genre,
        synopsis,
        duration,
        tone
      });

      if (response.data.success) {
        setGeneratedScript(response.data.data.script);
        setStep(2);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate script');
      console.error('Script generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVoiceover = async () => {
    if (!generatedScript) {
      setError('No script available');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/videos/voiceover`, {
        script: generatedScript,
        options: {
          voice,
          speed: 1.0
        }
      });

      if (response.data.success) {
        setVoiceoverUrl(response.data.data.audioUrl);
        setStep(3);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate voiceover');
      console.error('Voiceover generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVideo = async () => {
    if (!generatedScript || !voiceoverUrl) {
      setError('Script and voiceover required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/videos/compile`, {
        script: generatedScript,
        audioUrl: voiceoverUrl,
        title,
        author,
        genre
      });

      if (response.data.success) {
        setFinalVideoUrl(response.data.data.videoUrl);
        setStep(4);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create video');
      console.error('Video creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setGeneratedScript('');
    setVoiceoverUrl('');
    setFinalVideoUrl('');
    setError('');
  };

  return (
    <div className="ai-videos-app">
      <div className="videos-container">
        {/* Header */}
        <header className="videos-header">
          <div className="header-content">
            <h1>🎬 PhoenixForge Videos</h1>
            <p className="subtitle">AI-Powered Book Trailer Creation</p>
          </div>
          <button
            className="close-btn"
            onClick={() => window.location.href = '/'}
          >
            ← Back to Home
          </button>
        </header>

        {/* Progress Steps */}
        <div className="progress-steps">
          <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Book Details</div>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Review Script</div>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Voiceover</div>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 4 ? 'active' : ''}`}>
            <div className="step-number">4</div>
            <div className="step-label">Final Video</div>
          </div>
        </div>

        <div className="videos-main">
          {/* Step 1: Book Details */}
          {step === 1 && (
            <div className="step-content">
              <div className="content-card">
                <h2>📖 Tell Us About Your Book</h2>
                <form onSubmit={handleGenerateScript} className="video-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="title">Book Title *</label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your book title"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="author">Author Name</label>
                      <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Enter author name"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="genre">Genre</label>
                      <select
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                      >
                        {genres.map(g => (
                          <option key={g} value={g}>
                            {g.charAt(0).toUpperCase() + g.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="duration">Video Duration (seconds)</label>
                      <input
                        type="number"
                        id="duration"
                        min="30"
                        max="180"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                      <small>Between 30 and 180 seconds</small>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="tone">Tone</label>
                    <select
                      id="tone"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                    >
                      {tones.map(t => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="synopsis">Book Synopsis *</label>
                    <textarea
                      id="synopsis"
                      value={synopsis}
                      onChange={(e) => setSynopsis(e.target.value)}
                      placeholder="Provide a brief synopsis of your book (2-3 paragraphs). The more detail, the better the script!"
                      rows="8"
                      required
                    />
                  </div>

                  {error && <div className="error-message">{error}</div>}

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading || !title || !synopsis}
                  >
                    {loading ? '✍️ Generating Script...' : '✍️ Generate Video Script'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Step 2: Review Script */}
          {step === 2 && (
            <div className="step-content">
              <div className="content-card">
                <h2>📝 Review Your Video Script</h2>
                <div className="script-viewer">
                  <textarea
                    value={generatedScript}
                    onChange={(e) => setGeneratedScript(e.target.value)}
                    rows="15"
                    className="script-textarea"
                  />
                  <p className="help-text">
                    Feel free to edit the script above before generating the voiceover.
                  </p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                  <label htmlFor="voice-select">Select Voice</label>
                  <select
                    id="voice-select"
                    value={voice}
                    onChange={(e) => setVoice(e.target.value)}
                  >
                    {availableVoices.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.name} - {v.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="button-group">
                  <button
                    className="btn-secondary"
                    onClick={handleReset}
                  >
                    ← Start Over
                  </button>
                  <button
                    className="btn-primary"
                    onClick={handleGenerateVoiceover}
                    disabled={loading}
                  >
                    {loading ? '🎙️ Generating Voiceover...' : '🎙️ Generate Voiceover'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Voiceover */}
          {step === 3 && (
            <div className="step-content">
              <div className="content-card">
                <h2>🎙️ Voiceover Generated!</h2>
                <div className="preview-section">
                  <audio controls src={voiceoverUrl} className="audio-player">
                    Your browser does not support the audio element.
                  </audio>
                  <p className="help-text">
                    Listen to your voiceover above. If you're happy with it, proceed to create the final video.
                  </p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="button-group">
                  <button
                    className="btn-secondary"
                    onClick={() => setStep(2)}
                  >
                    ← Back to Script
                  </button>
                  <button
                    className="btn-primary"
                    onClick={handleCreateVideo}
                    disabled={loading}
                  >
                    {loading ? '🎬 Creating Video...' : '🎬 Create Final Video'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Final Video */}
          {step === 4 && (
            <div className="step-content">
              <div className="content-card">
                <h2>🎉 Your Book Trailer is Ready!</h2>
                <div className="preview-section">
                  <video controls src={finalVideoUrl} className="video-player">
                    Your browser does not support the video element.
                  </video>
                  <p className="help-text">
                    Your video trailer is ready! Download it and share it on social media.
                  </p>
                </div>

                <div className="button-group">
                  <button
                    className="btn-secondary"
                    onClick={handleReset}
                  >
                    Create Another Trailer
                  </button>
                  <a
                    href={finalVideoUrl}
                    download={`${title}-trailer.mp4`}
                    className="btn-primary"
                  >
                    📥 Download Video
                  </a>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <p>Processing...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIVideos;
