/**
 * IMAGE CREATOR
 * Generate illustrations, chapter art, character portraits, etc.
 */

import React, { useState } from 'react';

function ImageCreator() {
  const [prompt, setPrompt] = useState('');
  const [imageType, setImageType] = useState('illustration');
  const [images, setImages] = useState([]);

  const imageTypes = [
    { value: 'illustration', label: 'Scene Illustration', emoji: '🎨' },
    { value: 'character', label: 'Character Portrait', emoji: '👤' },
    { value: 'chapter-art', label: 'Chapter Header', emoji: '📖' },
    { value: 'marketing', label: 'Marketing Graphic', emoji: '📱' }
  ];

  const generateImages = async () => {
    alert('Image generation coming soon! Will use DALL-E 3 / Stable Diffusion');
  };

  return (
    <div className="image-creator">
      <h2>AI Image Creator</h2>
      <p>Generate custom illustrations for your book</p>

      <div className="image-type-selector">
        {imageTypes.map(type => (
          <button
            key={type.value}
            className={`type-btn ${imageType === type.value ? 'active' : ''}`}
            onClick={() => setImageType(type.value)}
          >
            {type.emoji} {type.label}
          </button>
        ))}
      </div>

      <div className="form-group">
        <label>Describe what you want to create</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A fierce phoenix warrior with flames surrounding her, Indian-inspired armor, dramatic lighting..."
          rows="4"
        />
      </div>

      <button className="btn btn-primary" onClick={generateImages}>
        Generate Images ($3 per image)
      </button>

      <div className="coming-soon-note">
        <p>🚧 Full feature coming soon! Will include:</p>
        <ul>
          <li>Multiple style options</li>
          <li>Batch generation</li>
          <li>Consistent character generation</li>
          <li>High-resolution exports</li>
        </ul>
      </div>
    </div>
  );
}

export default ImageCreator;
