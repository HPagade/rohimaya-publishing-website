/**
 * COVER GENERATOR
 *
 * Generate professional book covers using AI
 */

import React, { useState } from 'react';
import './CoverGenerator.css';

function CoverGenerator() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: 'fantasy-romance',
    style: 'dramatic',
    elements: '',
    colors: 'purple-gold'
  });

  const [generating, setGenerating] = useState(false);
  const [covers, setCovers] = useState([]);

  const genres = [
    { value: 'fantasy-romance', label: 'Fantasy Romance' },
    { value: 'cookbook', label: 'Cookbook' },
    { value: 'mystery', label: 'Cozy Mystery' },
    { value: 'contemporary', label: 'Contemporary Romance' },
    { value: 'ya-fantasy', label: 'YA Fantasy' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'literary', label: 'Literary Fiction' }
  ];

  const styles = [
    { value: 'dramatic', label: 'Dramatic & Epic', emoji: '⚡' },
    { value: 'minimalist', label: 'Clean & Minimalist', emoji: '✨' },
    { value: 'whimsical', label: 'Whimsical & Fun', emoji: '🎨' },
    { value: 'elegant', label: 'Elegant & Classic', emoji: '👑' },
    { value: 'dark', label: 'Dark & Moody', emoji: '🌙' }
  ];

  const colorSchemes = [
    { value: 'purple-gold', label: 'Purple & Gold', colors: ['#764ba2', '#ffd700'] },
    { value: 'fire-coral', label: 'Fire & Coral', colors: ['#ff6b6b', '#ffb88c'] },
    { value: 'teal-ocean', label: 'Teal & Ocean', colors: ['#4ecdc4', '#556270'] },
    { value: 'rose-blush', label: 'Rose & Blush', colors: ['#ff6b9d', '#ffc6d9'] },
    { value: 'forest-sage', label: 'Forest & Sage', colors: ['#2d6a4f', '#95d5b2'] }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateCovers = async () => {
    if (!formData.title || !formData.author) {
      alert('Please enter book title and author name');
      return;
    }

    setGenerating(true);

    try {
      // TODO: Call backend API to generate with DALL-E 3
      // For now, simulate generation
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Mock covers
      const mockCovers = [
        {
          id: 1,
          url: 'https://via.placeholder.com/400x600/764ba2/ffffff?text=Cover+Option+1',
          prompt: `${formData.genre} book cover with ${formData.elements}`
        },
        {
          id: 2,
          url: 'https://via.placeholder.com/400x600/ff6b6b/ffffff?text=Cover+Option+2',
          prompt: `${formData.style} style, ${formData.colors} colors`
        },
        {
          id: 3,
          url: 'https://via.placeholder.com/400x600/4ecdc4/ffffff?text=Cover+Option+3',
          prompt: `Alternative composition`
        },
        {
          id: 4,
          url: 'https://via.placeholder.com/400x600/ffd700/333333?text=Cover+Option+4',
          prompt: `Bold typography version`
        }
      ];

      setCovers(mockCovers);
    } catch (error) {
      alert('Generation failed: ' + error.message);
    } finally {
      setGenerating(false);
    }
  };

  const downloadCover = (coverId) => {
    alert(`Downloading cover ${coverId} - Feature coming soon!`);
  };

  return (
    <div className="cover-generator">

      {/* INPUT FORM */}
      <div className="generator-form">
        <h2>Create Your Book Cover</h2>

        <div className="form-group">
          <label>Book Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Eclipse of Fire & Wings"
            required
          />
        </div>

        <div className="form-group">
          <label>Author Name *</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Hannah Pagade"
            required
          />
        </div>

        <div className="form-group">
          <label>Genre</label>
          <select name="genre" value={formData.genre} onChange={handleChange}>
            {genres.map(g => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Style</label>
          <div className="style-grid">
            {styles.map(s => (
              <button
                key={s.value}
                className={`style-btn ${formData.style === s.value ? 'active' : ''}`}
                onClick={() => setFormData({...formData, style: s.value})}
              >
                <span className="style-emoji">{s.emoji}</span>
                <span className="style-label">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Key Elements (optional)</label>
          <input
            type="text"
            name="elements"
            value={formData.elements}
            onChange={handleChange}
            placeholder="phoenix, flames, silhouette couple, castle"
          />
          <small>Separate with commas</small>
        </div>

        <div className="form-group">
          <label>Color Scheme</label>
          <div className="color-schemes">
            {colorSchemes.map(scheme => (
              <button
                key={scheme.value}
                className={`color-scheme-btn ${formData.colors === scheme.value ? 'active' : ''}`}
                onClick={() => setFormData({...formData, colors: scheme.value})}
              >
                <div className="color-preview">
                  {scheme.colors.map((color, i) => (
                    <div key={i} style={{ background: color }} className="color-swatch"></div>
                  ))}
                </div>
                <span>{scheme.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          className="btn btn-primary btn-large generate-btn"
          onClick={generateCovers}
          disabled={generating}
        >
          {generating ? 'Generating...' : 'Generate Covers 🎨'}
        </button>

        <p className="cost-note">
          💡 Generates 4 unique cover options • $15 credits
        </p>
      </div>

      {/* GENERATED COVERS */}
      {generating && (
        <div className="generating-state">
          <div className="spinner"></div>
          <h3>AI is creating your covers...</h3>
          <p>This takes about 30-60 seconds</p>
        </div>
      )}

      {!generating && covers.length > 0 && (
        <div className="covers-grid">
          <h2>Your Generated Covers</h2>
          <p className="covers-subtitle">Click to download high-resolution version</p>

          <div className="covers-gallery">
            {covers.map(cover => (
              <div key={cover.id} className="cover-card">
                <img src={cover.url} alt={`Cover option ${cover.id}`} />
                <div className="cover-actions">
                  <button
                    className="btn btn-primary btn-small"
                    onClick={() => downloadCover(cover.id)}
                  >
                    Download
                  </button>
                  <button className="btn btn-outline btn-small">
                    Customize
                  </button>
                </div>
                <p className="cover-prompt">{cover.prompt}</p>
              </div>
            ))}
          </div>

          <div className="regenerate-options">
            <button className="btn btn-outline" onClick={generateCovers}>
              Generate More Variations
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default CoverGenerator;
