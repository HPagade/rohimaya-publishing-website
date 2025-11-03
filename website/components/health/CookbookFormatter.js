import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import './CookbookFormatter.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const CookbookFormatter = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    servings: '',
    prepTime: '',
    cookTime: '',
    dietType: 'general'
  });
  const [nutritionFacts, setNutritionFacts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const dietTypes = [
    'general', 'vegan', 'vegetarian', 'keto', 'paleo',
    'gluten-free', 'dairy-free', 'low-carb', 'mediterranean'
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleInputChange = (e) => {
    setCurrentRecipe({
      ...currentRecipe,
      [e.target.name]: e.target.value
    });
  };

  const uploadAndAnalyzeCookbook = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('dietType', currentRecipe.dietType);

      const token = await user.getToken();
      const response = await axios.post(
        `${API_BASE_URL}/api/health/cookbook/analyze`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setRecipes(response.data.data.recipes);
      setSuccess(`Successfully extracted ${response.data.data.recipes.length} recipes!`);
      setActiveTab('recipes');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze cookbook');
    } finally {
      setLoading(false);
    }
  };

  const addRecipe = async () => {
    if (!currentRecipe.title || !currentRecipe.ingredients || !currentRecipe.instructions) {
      setError('Please fill in title, ingredients, and instructions');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = await user.getToken();
      const response = await axios.post(
        `${API_BASE_URL}/api/health/cookbook/recipe`,
        currentRecipe,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setRecipes([...recipes, response.data.data.recipe]);
      setCurrentRecipe({
        title: '',
        ingredients: '',
        instructions: '',
        servings: '',
        prepTime: '',
        cookTime: '',
        dietType: 'general'
      });
      setSuccess('Recipe added successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add recipe');
    } finally {
      setLoading(false);
    }
  };

  const generateNutrition = async (recipe) => {
    setLoading(true);
    setError('');

    try {
      const token = await user.getToken();
      const response = await axios.post(
        `${API_BASE_URL}/api/health/nutrition/analyze`,
        {
          ingredients: recipe.ingredients,
          servings: recipe.servings
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setNutritionFacts(response.data.data.nutrition);
      setSuccess('Nutrition facts generated!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate nutrition facts');
    } finally {
      setLoading(false);
    }
  };

  const exportCookbook = async (format) => {
    setLoading(true);
    setError('');

    try {
      const token = await user.getToken();
      const response = await axios.post(
        `${API_BASE_URL}/api/health/cookbook/export`,
        {
          recipes,
          format,
          dietType: currentRecipe.dietType
        },
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
      link.setAttribute('download', `cookbook.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSuccess(`Cookbook exported as ${format.toUpperCase()}!`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to export cookbook');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cookbook-formatter">
      <div className="cookbook-header">
        <h1>🍳 Cookbook Formatter</h1>
        <p>Professional cookbook formatting with AI-powered nutrition analysis</p>
      </div>

      <div className="cookbook-tabs">
        <button
          className={activeTab === 'upload' ? 'active' : ''}
          onClick={() => setActiveTab('upload')}
        >
          Upload Cookbook
        </button>
        <button
          className={activeTab === 'add' ? 'active' : ''}
          onClick={() => setActiveTab('add')}
        >
          Add Recipe
        </button>
        <button
          className={activeTab === 'recipes' ? 'active' : ''}
          onClick={() => setActiveTab('recipes')}
        >
          Recipes ({recipes.length})
        </button>
        <button
          className={activeTab === 'export' ? 'active' : ''}
          onClick={() => setActiveTab('export')}
        >
          Export
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {activeTab === 'upload' && (
        <div className="tab-content">
          <div className="upload-section">
            <h3>Upload Cookbook Manuscript</h3>
            <p>Upload your cookbook in DOCX, PDF, or TXT format</p>

            <div className="form-group">
              <label>Diet Type</label>
              <select
                name="dietType"
                value={currentRecipe.dietType}
                onChange={handleInputChange}
              >
                {dietTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="file-upload">
              <input
                type="file"
                accept=".docx,.pdf,.txt"
                onChange={handleFileChange}
              />
              {file && <p className="file-name">Selected: {file.name}</p>}
            </div>

            <button
              onClick={uploadAndAnalyzeCookbook}
              disabled={loading || !file}
              className="primary-btn"
            >
              {loading ? 'Analyzing...' : 'Analyze Cookbook'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'add' && (
        <div className="tab-content">
          <div className="add-recipe-section">
            <h3>Add New Recipe</h3>

            <div className="form-group">
              <label>Recipe Title *</label>
              <input
                type="text"
                name="title"
                value={currentRecipe.title}
                onChange={handleInputChange}
                placeholder="e.g., Classic Chocolate Chip Cookies"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Servings</label>
                <input
                  type="text"
                  name="servings"
                  value={currentRecipe.servings}
                  onChange={handleInputChange}
                  placeholder="e.g., 12 cookies"
                />
              </div>

              <div className="form-group">
                <label>Prep Time</label>
                <input
                  type="text"
                  name="prepTime"
                  value={currentRecipe.prepTime}
                  onChange={handleInputChange}
                  placeholder="e.g., 15 minutes"
                />
              </div>

              <div className="form-group">
                <label>Cook Time</label>
                <input
                  type="text"
                  name="cookTime"
                  value={currentRecipe.cookTime}
                  onChange={handleInputChange}
                  placeholder="e.g., 12 minutes"
                />
              </div>

              <div className="form-group">
                <label>Diet Type</label>
                <select
                  name="dietType"
                  value={currentRecipe.dietType}
                  onChange={handleInputChange}
                >
                  {dietTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Ingredients * (one per line)</label>
              <textarea
                name="ingredients"
                value={currentRecipe.ingredients}
                onChange={handleInputChange}
                placeholder="1 cup all-purpose flour&#10;1/2 cup butter, softened&#10;1 cup chocolate chips&#10;..."
                rows="8"
              />
            </div>

            <div className="form-group">
              <label>Instructions * (one step per line)</label>
              <textarea
                name="instructions"
                value={currentRecipe.instructions}
                onChange={handleInputChange}
                placeholder="Preheat oven to 350°F&#10;Mix butter and sugar until creamy&#10;Add flour and mix well&#10;..."
                rows="8"
              />
            </div>

            <button
              onClick={addRecipe}
              disabled={loading}
              className="primary-btn"
            >
              {loading ? 'Adding...' : 'Add Recipe'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'recipes' && (
        <div className="tab-content">
          <div className="recipes-list">
            <h3>Your Recipes</h3>
            {recipes.length === 0 ? (
              <p className="empty-state">No recipes yet. Upload a cookbook or add recipes manually.</p>
            ) : (
              <div className="recipe-cards">
                {recipes.map((recipe, index) => (
                  <div key={index} className="recipe-card">
                    <h4>{recipe.title}</h4>
                    <div className="recipe-meta">
                      {recipe.servings && <span>🍽️ {recipe.servings}</span>}
                      {recipe.prepTime && <span>⏱️ Prep: {recipe.prepTime}</span>}
                      {recipe.cookTime && <span>🔥 Cook: {recipe.cookTime}</span>}
                      <span className="diet-badge">{recipe.dietType}</span>
                    </div>
                    <button
                      onClick={() => generateNutrition(recipe)}
                      className="secondary-btn"
                      disabled={loading}
                    >
                      Generate Nutrition Facts
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {nutritionFacts && (
            <div className="nutrition-panel">
              <h3>Nutrition Facts</h3>
              <div className="nutrition-label">
                <div className="nutrition-row">
                  <span>Serving Size</span>
                  <span>{nutritionFacts.servingSize}</span>
                </div>
                <div className="nutrition-row bold">
                  <span>Calories</span>
                  <span>{nutritionFacts.calories}</span>
                </div>
                <div className="nutrition-row">
                  <span>Total Fat</span>
                  <span>{nutritionFacts.totalFat}g</span>
                </div>
                <div className="nutrition-row indent">
                  <span>Saturated Fat</span>
                  <span>{nutritionFacts.saturatedFat}g</span>
                </div>
                <div className="nutrition-row">
                  <span>Cholesterol</span>
                  <span>{nutritionFacts.cholesterol}mg</span>
                </div>
                <div className="nutrition-row">
                  <span>Sodium</span>
                  <span>{nutritionFacts.sodium}mg</span>
                </div>
                <div className="nutrition-row">
                  <span>Total Carbohydrates</span>
                  <span>{nutritionFacts.totalCarbs}g</span>
                </div>
                <div className="nutrition-row indent">
                  <span>Dietary Fiber</span>
                  <span>{nutritionFacts.dietaryFiber}g</span>
                </div>
                <div className="nutrition-row indent">
                  <span>Total Sugars</span>
                  <span>{nutritionFacts.sugars}g</span>
                </div>
                <div className="nutrition-row">
                  <span>Protein</span>
                  <span>{nutritionFacts.protein}g</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'export' && (
        <div className="tab-content">
          <div className="export-section">
            <h3>Export Your Cookbook</h3>
            <p>Download your professionally formatted cookbook</p>

            <div className="export-options">
              <div className="export-card">
                <h4>PDF Format</h4>
                <p>Print-ready with nutrition facts and professional layout</p>
                <button
                  onClick={() => exportCookbook('pdf')}
                  disabled={loading || recipes.length === 0}
                  className="primary-btn"
                >
                  Export as PDF
                </button>
              </div>

              <div className="export-card">
                <h4>EPUB Format</h4>
                <p>Perfect for e-readers and digital distribution</p>
                <button
                  onClick={() => exportCookbook('epub')}
                  disabled={loading || recipes.length === 0}
                  className="primary-btn"
                >
                  Export as EPUB
                </button>
              </div>

              <div className="export-card">
                <h4>DOCX Format</h4>
                <p>Editable format for further customization</p>
                <button
                  onClick={() => exportCookbook('docx')}
                  disabled={loading || recipes.length === 0}
                  className="primary-btn"
                >
                  Export as DOCX
                </button>
              </div>
            </div>

            {recipes.length === 0 && (
              <p className="warning-message">Add some recipes before exporting!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CookbookFormatter;
