/**
 * AI Images - Book Content Image Generation App
 * Generates images for cookbooks, children's books, and custom needs
 */

import React, { useState } from 'react';
import axios from 'axios';
import './AIImages.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AIImages = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState('cookbook'); // cookbook, kidsbook, custom

  // Cookbook state
  const [recipes, setRecipes] = useState([{ name: '', description: '' }]);
  const [cookbookStyle, setCookbookStyle] = useState('professional');

  // Kids book state
  const [scenes, setScenes] = useState([{ description: '' }]);
  const [artStyle, setArtStyle] = useState('watercolor');
  const [characterConsistency, setCharacterConsistency] = useState(true);
  const [characterDescription, setCharacterDescription] = useState('');

  // Custom image state
  const [customPrompt, setCustomPrompt] = useState('');
  const [customSize, setCustomSize] = useState('1024x1024');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);

  // Cookbook functions
  const addRecipe = () => {
    setRecipes([...recipes, { name: '', description: '' }]);
  };

  const updateRecipe = (index, field, value) => {
    const newRecipes = [...recipes];
    newRecipes[index][field] = value;
    setRecipes(newRecipes);
  };

  const removeRecipe = (index) => {
    if (recipes.length > 1) {
      setRecipes(recipes.filter((_, i) => i !== index));
    }
  };

  const handleGenerateCookbook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedImages([]);

    try {
      const validRecipes = recipes.filter(r => r.name && r.description);
      if (validRecipes.length === 0) {
        setError('Please add at least one recipe with name and description');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/api/images/cookbook`, {
        recipes: validRecipes,
        options: {
          style: cookbookStyle,
          lighting: 'natural',
          angle: 'overhead'
        }
      });

      if (response.data.success) {
        setGeneratedImages(response.data.data.images);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate cookbook images');
      console.error('Cookbook image error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Kids book functions
  const addScene = () => {
    setScenes([...scenes, { description: '' }]);
  };

  const updateScene = (index, value) => {
    const newScenes = [...scenes];
    newScenes[index].description = value;
    setScenes(newScenes);
  };

  const removeScene = (index) => {
    if (scenes.length > 1) {
      setScenes(scenes.filter((_, i) => i !== index));
    }
  };

  const handleGenerateKidsbook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedImages([]);

    try {
      const validScenes = scenes.filter(s => s.description);
      if (validScenes.length === 0) {
        setError('Please add at least one scene description');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/api/images/kidsbook`, {
        scenes: validScenes,
        options: {
          artStyle,
          characterConsistency,
          characterDescription: characterConsistency ? characterDescription : undefined,
          colorPalette: 'vibrant'
        }
      });

      if (response.data.success) {
        setGeneratedImages(response.data.data.images);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate children\'s book illustrations');
      console.error('Kids book image error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Custom image function
  const handleGenerateCustom = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedImages([]);

    try {
      if (!customPrompt) {
        setError('Please provide an image description');
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/api/images/custom`, {
        prompt: customPrompt,
        options: {
          size: customSize,
          quality: 'hd'
        }
      });

      if (response.data.success) {
        setGeneratedImages([response.data.data.image]);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate custom image');
      console.error('Custom image error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (imageUrl, filename) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <div className="ai-images-app">
      <div className="images-container">
        {/* Header */}
        <header className="images-header">
          <div className="header-content">
            <h1>🖼️ PhoenixForge Images</h1>
            <p className="subtitle">AI-Powered Book Content Image Generation</p>
          </div>
          <button
            className="close-btn"
            onClick={() => window.location.href = '/'}
          >
            ← Back to Home
          </button>
        </header>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'cookbook' ? 'active' : ''}`}
            onClick={() => setActiveTab('cookbook')}
          >
            📚 Cookbook Images
          </button>
          <button
            className={`tab ${activeTab === 'kidsbook' ? 'active' : ''}`}
            onClick={() => setActiveTab('kidsbook')}
          >
            🎨 Children's Book Illustrations
          </button>
          <button
            className={`tab ${activeTab === 'custom' ? 'active' : ''}`}
            onClick={() => setActiveTab('custom')}
          >
            ✨ Custom Images
          </button>
        </div>

        <div className="images-main">
          {/* Left Panel - Form */}
          <div className="images-sidebar">
            {/* Cookbook Tab */}
            {activeTab === 'cookbook' && (
              <form onSubmit={handleGenerateCookbook} className="image-form">
                <h2>Cookbook Recipe Images</h2>
                <p className="tab-description">Generate professional food photography for your recipes</p>

                <div className="form-group">
                  <label>Photography Style</label>
                  <select
                    value={cookbookStyle}
                    onChange={(e) => setCookbookStyle(e.target.value)}
                  >
                    <option value="professional">Professional Food Photography</option>
                    <option value="rustic">Rustic/Homestyle</option>
                    <option value="modern">Modern Minimalist</option>
                    <option value="magazine">Magazine Editorial</option>
                  </select>
                </div>

                <div className="recipes-list">
                  <h3>Recipes ({recipes.length})</h3>
                  {recipes.map((recipe, index) => (
                    <div key={index} className="recipe-item">
                      <div className="item-header">
                        <span>Recipe {index + 1}</span>
                        {recipes.length > 1 && (
                          <button
                            type="button"
                            className="btn-remove"
                            onClick={() => removeRecipe(index)}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Recipe name (e.g., 'Chocolate Chip Cookies')"
                        value={recipe.name}
                        onChange={(e) => updateRecipe(index, 'name', e.target.value)}
                      />
                      <textarea
                        placeholder="Brief description of the dish for better image generation"
                        value={recipe.description}
                        onChange={(e) => updateRecipe(index, 'description', e.target.value)}
                        rows="3"
                      />
                    </div>
                  ))}
                  <button type="button" className="btn-secondary" onClick={addRecipe}>
                    + Add Recipe
                  </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? '📸 Generating Images...' : '📸 Generate Cookbook Images'}
                </button>
              </form>
            )}

            {/* Kids Book Tab */}
            {activeTab === 'kidsbook' && (
              <form onSubmit={handleGenerateKidsbook} className="image-form">
                <h2>Children's Book Illustrations</h2>
                <p className="tab-description">Create consistent, beautiful illustrations for your children's book</p>

                <div className="form-group">
                  <label>Art Style</label>
                  <select
                    value={artStyle}
                    onChange={(e) => setArtStyle(e.target.value)}
                  >
                    <option value="watercolor">Watercolor</option>
                    <option value="digital">Digital Art</option>
                    <option value="cartoon">Cartoon</option>
                    <option value="storybook">Classic Storybook</option>
                    <option value="handdrawn">Hand-drawn</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={characterConsistency}
                      onChange={(e) => setCharacterConsistency(e.target.checked)}
                    />
                    <span>Maintain Character Consistency</span>
                  </label>
                </div>

                {characterConsistency && (
                  <div className="form-group">
                    <label>Main Character Description</label>
                    <textarea
                      placeholder="Describe your main character in detail (e.g., 'A small brown rabbit with a red scarf and blue backpack')"
                      value={characterDescription}
                      onChange={(e) => setCharacterDescription(e.target.value)}
                      rows="3"
                    />
                  </div>
                )}

                <div className="scenes-list">
                  <h3>Scenes ({scenes.length})</h3>
                  {scenes.map((scene, index) => (
                    <div key={index} className="scene-item">
                      <div className="item-header">
                        <span>Scene {index + 1}</span>
                        {scenes.length > 1 && (
                          <button
                            type="button"
                            className="btn-remove"
                            onClick={() => removeScene(index)}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <textarea
                        placeholder="Describe this scene in detail..."
                        value={scene.description}
                        onChange={(e) => updateScene(index, e.target.value)}
                        rows="4"
                      />
                    </div>
                  ))}
                  <button type="button" className="btn-secondary" onClick={addScene}>
                    + Add Scene
                  </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? '🎨 Creating Illustrations...' : '🎨 Generate Illustrations'}
                </button>
              </form>
            )}

            {/* Custom Tab */}
            {activeTab === 'custom' && (
              <form onSubmit={handleGenerateCustom} className="image-form">
                <h2>Custom Image Generation</h2>
                <p className="tab-description">Generate any image you need for your book</p>

                <div className="form-group">
                  <label>Image Description</label>
                  <textarea
                    placeholder="Describe the image you want to generate in detail..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows="6"
                  />
                </div>

                <div className="form-group">
                  <label>Image Size</label>
                  <select
                    value={customSize}
                    onChange={(e) => setCustomSize(e.target.value)}
                  >
                    <option value="1024x1024">Square (1024x1024)</option>
                    <option value="1024x1792">Portrait (1024x1792)</option>
                    <option value="1792x1024">Landscape (1792x1024)</option>
                  </select>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? '✨ Generating Image...' : '✨ Generate Custom Image'}
                </button>

                <div className="info-box">
                  <p><strong>💡 Tips:</strong></p>
                  <ul>
                    <li>Be specific and descriptive</li>
                    <li>Mention lighting, mood, and setting</li>
                    <li>Include important details</li>
                  </ul>
                </div>
              </form>
            )}
          </div>

          {/* Right Panel - Results */}
          <div className="images-content">
            {loading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <h3>Generating Your Images...</h3>
                <p>This may take 30-60 seconds</p>
              </div>
            )}

            {!loading && generatedImages.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🖼️</div>
                <h3>No Images Generated Yet</h3>
                <p>Choose a tab and fill in the details to generate AI-powered images for your book.</p>
              </div>
            )}

            {!loading && generatedImages.length > 0 && (
              <div className="images-results">
                <div className="results-header">
                  <h2>Generated Images ({generatedImages.length})</h2>
                </div>

                <div className="images-grid">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="image-card">
                      <div className="image-wrapper">
                        <img src={image.url} alt={image.description || `Image ${index + 1}`} />
                      </div>
                      <div className="image-info">
                        <p className="image-description">
                          {image.recipeName || image.sceneNumber || image.description || `Image ${index + 1}`}
                        </p>
                        <button
                          className="btn-secondary small"
                          onClick={() => handleDownload(image.url, `image-${index + 1}.png`)}
                        >
                          📥 Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIImages;
