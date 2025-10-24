/**
 * AI CREATIVE SUITE - MAIN COMPONENT
 *
 * Three tools in one app:
 * 1. Book Cover Generator
 * 2. Image Creator (illustrations, chapter art)
 * 3. Video Trailer Maker
 *
 * TECHNOLOGY:
 * - DALL-E 3 / Stable Diffusion for images
 * - Runway ML for video generation
 * - Canvas API for text overlays
 */

import React, { useState } from 'react';
import './CreativeSuite.css';

// Sub-components
import CoverGenerator from './CoverGenerator';
import ImageCreator from './ImageCreator';
import VideoMaker from './VideoMaker';

function CreativeSuite() {
  const [activeTool, setActiveTool] = useState('cover'); // cover, image, video

  return (
    <div className="creative-suite-app">

      {/* HEADER */}
      <header className="app-header">
        <h1>🎨 AI Creative Suite</h1>
        <p>Book covers, images, and videos in minutes</p>
      </header>

      {/* TOOL SELECTOR */}
      <nav className="tool-selector">
        <button
          className={`tool-btn ${activeTool === 'cover' ? 'active' : ''}`}
          onClick={() => setActiveTool('cover')}
        >
          📚 Cover Generator
        </button>
        <button
          className={`tool-btn ${activeTool === 'image' ? 'active' : ''}`}
          onClick={() => setActiveTool('image')}
        >
          🖼️ Image Creator
        </button>
        <button
          className={`tool-btn ${activeTool === 'video' ? 'active' : ''}`}
          onClick={() => setActiveTool('video')}
        >
          🎬 Video Maker
        </button>
      </nav>

      {/* ACTIVE TOOL */}
      <main className="tool-content">
        {activeTool === 'cover' && <CoverGenerator />}
        {activeTool === 'image' && <ImageCreator />}
        {activeTool === 'video' && <VideoMaker />}
      </main>

    </div>
  );
}

export default CreativeSuite;
