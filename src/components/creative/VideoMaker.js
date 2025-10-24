/**
 * VIDEO MAKER
 * Create book trailers and promo videos
 */

import React, { useState } from 'react';

function VideoMaker() {
  const [videoType, setVideoType] = useState('trailer');
  const [script, setScript] = useState('');

  const videoTypes = [
    { value: 'trailer', label: 'Book Trailer (30s)', price: '$49' },
    { value: 'extended', label: 'Extended Trailer (60s)', price: '$79' },
    { value: 'teaser', label: 'Social Media Teaser (15s)', price: '$29' }
  ];

  const createVideo = async () => {
    alert('Video creation coming soon! Will use Runway ML + AI voiceover');
  };

  return (
    <div className="video-maker">
      <h2>AI Video Maker</h2>
      <p>Create professional book trailers in minutes</p>

      <div className="video-type-selector">
        {videoTypes.map(type => (
          <div
            key={type.value}
            className={`video-type-card ${videoType === type.value ? 'active' : ''}`}
            onClick={() => setVideoType(type.value)}
          >
            <h4>{type.label}</h4>
            <p className="price">{type.price}</p>
          </div>
        ))}
      </div>

      <div className="form-group">
        <label>Video Script / Book Description</label>
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Enter your book description or script. AI will generate visuals and voiceover..."
          rows="6"
        />
      </div>

      <button className="btn btn-primary" onClick={createVideo}>
        Create Video 🎬
      </button>

      <div className="video-features">
        <h3>What's Included:</h3>
        <ul>
          <li>✓ AI-generated scenes from your description</li>
          <li>✓ Professional AI voiceover</li>
          <li>✓ Background music</li>
          <li>✓ Text overlays and title cards</li>
          <li>✓ Optimized for social media</li>
          <li>✓ Commercial license included</li>
        </ul>
      </div>

      <div className="coming-soon-note">
        <p>🚧 Full feature launching soon!</p>
      </div>
    </div>
  );
}

export default VideoMaker;
