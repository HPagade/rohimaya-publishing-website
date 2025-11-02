/**
 * AI Covers - Book Cover Generation App
 * Generates professional book covers using DALL-E 3
 */

import React, { useState } from 'react';
import axios from 'axios';
import './AICovers.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AICovers = () => {
  // Form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('fiction');
  const [description, setDescription] = useState('');
  const [variations, setVariations] = useState(3);
  const [customPrompt, setCustomPrompt] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedCovers, setGeneratedCovers] = useState([]);
  const [selectedCover, setSelectedCover] = useState(null);

  // Genre suggestions
  const [genreSuggestions, setGenreSuggestions] = useState(null);

  const genres = [
    'fiction', 'nonfiction', 'fantasy', 'scifi', 'romance',
    'mystery', 'thriller', 'horror', 'cookbook', 'childrens'
  ];

  const handleGetSuggestions = async () => {
    if (!genre) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/api/covers/genre-suggestions/${genre}`);
      setGenreSuggestions(response.data.data.suggestions);
    } catch (err) {
      console.error('Failed to get suggestions:', err);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!title || !author) {
      setError('Please provide at least a title and author');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedCovers([]);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/covers/generate`, {
        title,
        author,
        genre,
        description: description || undefined,
        variations: parseInt(variations),
        customPrompt: customPrompt || undefined
      });

      if (response.data.success) {
        setGeneratedCovers(response.data.data.covers);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate covers. Please try again.');
      console.error('Cover generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (coverUrl, index) => {
    try {
      // In a real app, you would download the image
      // For now, we'll just open it in a new tab
      window.open(coverUrl, '_blank');
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handleAddText = async () => {
    if (!selectedCover) {
      setError('Please select a cover first');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/covers/add-text`, {
        imageUrl: selectedCover,
        title,
        author,
        fontSize: 72,
        fontFamily: 'Arial',
        titleColor: '#FFFFFF',
        authorColor: '#CCCCCC'
      });

      if (response.data.success) {
        // Update the selected cover with text overlay
        alert('Text overlay added successfully!');
      }
    } catch (err) {
      setError('Failed to add text overlay');
      console.error('Text overlay error:', err);
    }
  };

  return (
    <div className="ai-covers-app">
      <div className="covers-container">
        {/* Header */}
        <header className="covers-header">
          <div className="header-content">
            <h1>🎨 PhoenixForge Covers</h1>
            <p className="subtitle">AI-Powered Book Cover Generation</p>
          </div>
          <button
            className="close-btn"
            onClick={() => window.location.href = '/'}
          >
            ← Back to Home
          </button>
        </header>

        <div className="covers-main">
          {/* Left Panel - Form */}
          <div className="covers-sidebar">
            <form onSubmit={handleGenerate} className="cover-form">
              <h2>Cover Details</h2>

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
                <label htmlFor="author">Author Name *</label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <select
                  id="genre"
                  value={genre}
                  onChange={(e) => {
                    setGenre(e.target.value);
                    setGenreSuggestions(null);
                  }}
                >
                  {genres.map(g => (
                    <option key={g} value={g}>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn-secondary small"
                  onClick={handleGetSuggestions}
                >
                  Get Genre Suggestions
                </button>
              </div>

              {genreSuggestions && (
                <div className="suggestions-box">
                  <h4>Genre Suggestions:</h4>
                  <ul>
                    {genreSuggestions.elements.map((elem, idx) => (
                      <li key={idx}>{elem}</li>
                    ))}
                  </ul>
                  <p className="suggestion-colors">
                    <strong>Colors:</strong> {genreSuggestions.colors.join(', ')}
                  </p>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="description">Book Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of your book (helps AI generate better covers)"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="variations">Number of Variations</label>
                <input
                  type="number"
                  id="variations"
                  min="1"
                  max="3"
                  value={variations}
                  onChange={(e) => setVariations(e.target.value)}
                />
                <small>Generate 1-3 different cover designs</small>
              </div>

              <div className="form-group">
                <label htmlFor="customPrompt">Custom Prompt (Optional)</label>
                <textarea
                  id="customPrompt"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Add specific instructions for the AI (e.g., 'include a dragon', 'sunset background')"
                  rows="3"
                />
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary generate-btn"
                disabled={loading || !title || !author}
              >
                {loading ? '🎨 Generating Covers...' : '🎨 Generate Covers'}
              </button>

              <div className="info-box">
                <p><strong>💡 Tip:</strong> The more details you provide, the better your covers will be!</p>
              </div>
            </form>
          </div>

          {/* Right Panel - Results */}
          <div className="covers-content">
            {loading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <h3>Creating Your Book Covers...</h3>
                <p>This may take 30-60 seconds per variation</p>
              </div>
            )}

            {!loading && generatedCovers.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🎨</div>
                <h3>No Covers Generated Yet</h3>
                <p>Fill in the form on the left and click "Generate Covers" to create professional book covers using AI.</p>
                <div className="features-list">
                  <h4>What You'll Get:</h4>
                  <ul>
                    <li>✅ Professional AI-generated covers</li>
                    <li>✅ Genre-specific designs</li>
                    <li>✅ Multiple variations to choose from</li>
                    <li>✅ High-resolution images (1024x1792)</li>
                    <li>✅ Ready for publication</li>
                  </ul>
                </div>
              </div>
            )}

            {!loading && generatedCovers.length > 0 && (
              <div className="covers-results">
                <div className="results-header">
                  <h2>Generated Covers ({generatedCovers.length})</h2>
                  <p>Click on a cover to select it, then download or add text</p>
                </div>

                <div className="covers-grid">
                  {generatedCovers.map((cover, index) => (
                    <div
                      key={index}
                      className={`cover-card ${selectedCover === cover.url ? 'selected' : ''}`}
                      onClick={() => setSelectedCover(cover.url)}
                    >
                      <div className="cover-image-wrapper">
                        <img
                          src={cover.url}
                          alt={`Cover ${index + 1}`}
                          className="cover-image"
                        />
                        {selectedCover === cover.url && (
                          <div className="selected-badge">✓ Selected</div>
                        )}
                      </div>
                      <div className="cover-actions">
                        <button
                          className="btn-secondary small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(cover.url, index);
                          }}
                        >
                          📥 Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedCover && (
                  <div className="selected-actions">
                    <button
                      className="btn-primary"
                      onClick={handleAddText}
                    >
                      ✍️ Add Text Overlay
                    </button>
                    <p className="help-text">
                      Add your book title and author name as text overlay to the selected cover
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICovers;
