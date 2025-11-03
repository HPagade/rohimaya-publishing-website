'use client'

import { useState } from 'react'
import { BookOpen, Plus, Trash2, Download, Wand2, Upload } from 'lucide-react'

interface Recipe {
  id: string
  title: string
  servings: string
  prepTime: string
  cookTime: string
  ingredients: string[]
  instructions: string[]
  tags: string[]
  notes: string
}

const LAYOUT_STYLES = [
  { id: 'classic', name: 'Classic', description: 'Traditional cookbook layout' },
  { id: 'modern', name: 'Modern', description: 'Clean, contemporary design' },
  { id: 'minimal', name: 'Minimalist', description: 'Simple and elegant' },
]

const DIETARY_TAGS = [
  'Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo',
  'Low-Carb', 'High-Protein', 'Nut-Free', 'Soy-Free'
]

export default function CookbookPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([{
    id: '1',
    title: '',
    servings: '4',
    prepTime: '15 min',
    cookTime: '30 min',
    ingredients: [''],
    instructions: [''],
    tags: [],
    notes: '',
  }])
  const [cookbookTitle, setCookbookTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [layoutStyle, setLayoutStyle] = useState('modern')
  const [generating, setGenerating] = useState(false)
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0)

  const addRecipe = () => {
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      title: '',
      servings: '4',
      prepTime: '15 min',
      cookTime: '30 min',
      ingredients: [''],
      instructions: [''],
      tags: [],
      notes: '',
    }
    setRecipes([...recipes, newRecipe])
    setCurrentRecipeIndex(recipes.length)
  }

  const removeRecipe = (index: number) => {
    if (recipes.length > 1) {
      setRecipes(recipes.filter((_, i) => i !== index))
      if (currentRecipeIndex >= recipes.length - 1) {
        setCurrentRecipeIndex(Math.max(0, currentRecipeIndex - 1))
      }
    }
  }

  const updateRecipe = (index: number, field: keyof Recipe, value: any) => {
    setRecipes(recipes.map((r, i) => i === index ? { ...r, [field]: value } : r))
  }

  const addIngredient = (recipeIndex: number) => {
    const recipe = recipes[recipeIndex]
    updateRecipe(recipeIndex, 'ingredients', [...recipe.ingredients, ''])
  }

  const updateIngredient = (recipeIndex: number, ingredientIndex: number, value: string) => {
    const recipe = recipes[recipeIndex]
    const newIngredients = [...recipe.ingredients]
    newIngredients[ingredientIndex] = value
    updateRecipe(recipeIndex, 'ingredients', newIngredients)
  }

  const removeIngredient = (recipeIndex: number, ingredientIndex: number) => {
    const recipe = recipes[recipeIndex]
    if (recipe.ingredients.length > 1) {
      updateRecipe(recipeIndex, 'ingredients', recipe.ingredients.filter((_, i) => i !== ingredientIndex))
    }
  }

  const addInstruction = (recipeIndex: number) => {
    const recipe = recipes[recipeIndex]
    updateRecipe(recipeIndex, 'instructions', [...recipe.instructions, ''])
  }

  const updateInstruction = (recipeIndex: number, instructionIndex: number, value: string) => {
    const recipe = recipes[recipeIndex]
    const newInstructions = [...recipe.instructions]
    newInstructions[instructionIndex] = value
    updateRecipe(recipeIndex, 'instructions', newInstructions)
  }

  const removeInstruction = (recipeIndex: number, instructionIndex: number) => {
    const recipe = recipes[recipeIndex]
    if (recipe.instructions.length > 1) {
      updateRecipe(recipeIndex, 'instructions', recipe.instructions.filter((_, i) => i !== instructionIndex))
    }
  }

  const toggleTag = (recipeIndex: number, tag: string) => {
    const recipe = recipes[recipeIndex]
    const newTags = recipe.tags.includes(tag)
      ? recipe.tags.filter(t => t !== tag)
      : [...recipe.tags, tag]
    updateRecipe(recipeIndex, 'tags', newTags)
  }

  const importFromText = async () => {
    const text = prompt('Paste your recipe text:')
    if (!text) return

    try {
      const response = await fetch('/api/cookbook/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()

      if (response.ok) {
        setRecipes([...recipes, data.recipe])
      } else {
        alert(data.error || 'Failed to parse recipe')
      }
    } catch (error) {
      alert('Failed to import recipe')
    }
  }

  const generateCookbook = async () => {
    if (!cookbookTitle || !author) {
      alert('Please enter cookbook title and author')
      return
    }

    const validRecipes = recipes.filter(r => r.title && r.ingredients[0] && r.instructions[0])

    if (validRecipes.length === 0) {
      alert('Please add at least one complete recipe')
      return
    }

    setGenerating(true)

    try {
      const response = await fetch('/api/cookbook/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: cookbookTitle,
          author,
          recipes: validRecipes,
          layoutStyle,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Download the cookbook
        window.open(data.downloadUrl, '_blank')
      } else {
        alert(data.error || 'Generation failed')
      }
    } catch (error) {
      alert('Failed to generate cookbook')
    } finally {
      setGenerating(false)
    }
  }

  const currentRecipe = recipes[currentRecipeIndex]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Cookbook Formatter
          </h1>
          <p className="text-gray-600">
            Create beautifully formatted cookbooks with professional layouts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Cookbook Settings */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen size={24} className="text-green-600" />
                Cookbook Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cookbook Title *
                  </label>
                  <input
                    type="text"
                    value={cookbookTitle}
                    onChange={(e) => setCookbookTitle(e.target.value)}
                    className="input-field"
                    placeholder="My Recipe Collection"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="input-field"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Layout Style
                  </label>
                  <div className="space-y-2">
                    {LAYOUT_STYLES.map(style => (
                      <button
                        key={style.id}
                        onClick={() => setLayoutStyle(style.id)}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                          layoutStyle === style.id
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="font-semibold text-sm">{style.name}</div>
                        <div className="text-xs text-gray-600">{style.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recipe List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recipes ({recipes.length})</h3>
                <button
                  onClick={addRecipe}
                  className="text-sm bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 flex items-center gap-1"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {recipes.map((recipe, index) => (
                  <button
                    key={recipe.id}
                    onClick={() => setCurrentRecipeIndex(index)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      index === currentRecipeIndex
                        ? 'bg-green-100 border-2 border-green-600'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-sm">
                      {recipe.title || `Recipe #${index + 1}`}
                    </div>
                    <div className="text-xs text-gray-600">
                      {recipe.ingredients.filter(i => i).length} ingredients
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={importFromText}
                className="w-full mt-4 text-sm text-green-600 hover:text-green-700 flex items-center justify-center gap-1"
              >
                <Upload size={16} />
                Import from Text
              </button>
            </div>
          </div>

          {/* Right: Recipe Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  Recipe #{currentRecipeIndex + 1}
                </h2>
                {recipes.length > 1 && (
                  <button
                    onClick={() => removeRecipe(currentRecipeIndex)}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash2 size={18} />
                    Delete Recipe
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipe Title *
                  </label>
                  <input
                    type="text"
                    value={currentRecipe.title}
                    onChange={(e) => updateRecipe(currentRecipeIndex, 'title', e.target.value)}
                    className="input-field"
                    placeholder="Delicious Chocolate Chip Cookies"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Servings
                    </label>
                    <input
                      type="text"
                      value={currentRecipe.servings}
                      onChange={(e) => updateRecipe(currentRecipeIndex, 'servings', e.target.value)}
                      className="input-field"
                      placeholder="4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prep Time
                    </label>
                    <input
                      type="text"
                      value={currentRecipe.prepTime}
                      onChange={(e) => updateRecipe(currentRecipeIndex, 'prepTime', e.target.value)}
                      className="input-field"
                      placeholder="15 min"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cook Time
                    </label>
                    <input
                      type="text"
                      value={currentRecipe.cookTime}
                      onChange={(e) => updateRecipe(currentRecipeIndex, 'cookTime', e.target.value)}
                      className="input-field"
                      placeholder="30 min"
                    />
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Ingredients *
                    </label>
                    <button
                      onClick={() => addIngredient(currentRecipeIndex)}
                      className="text-sm text-green-600 hover:text-green-700"
                    >
                      + Add Ingredient
                    </button>
                  </div>
                  <div className="space-y-2">
                    {currentRecipe.ingredients.map((ingredient, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={ingredient}
                          onChange={(e) => updateIngredient(currentRecipeIndex, idx, e.target.value)}
                          className="input-field flex-1"
                          placeholder="1 cup flour"
                        />
                        {currentRecipe.ingredients.length > 1 && (
                          <button
                            onClick={() => removeIngredient(currentRecipeIndex, idx)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Instructions *
                    </label>
                    <button
                      onClick={() => addInstruction(currentRecipeIndex)}
                      className="text-sm text-green-600 hover:text-green-700"
                    >
                      + Add Step
                    </button>
                  </div>
                  <div className="space-y-2">
                    {currentRecipe.instructions.map((instruction, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="font-semibold text-gray-600 mt-2">{idx + 1}.</span>
                        <textarea
                          value={instruction}
                          onChange={(e) => updateInstruction(currentRecipeIndex, idx, e.target.value)}
                          rows={2}
                          className="input-field flex-1"
                          placeholder="Preheat oven to 350°F..."
                        />
                        {currentRecipe.instructions.length > 1 && (
                          <button
                            onClick={() => removeInstruction(currentRecipeIndex, idx)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dietary Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DIETARY_TAGS.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(currentRecipeIndex, tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          currentRecipe.tags.includes(tag)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chef's Notes
                  </label>
                  <textarea
                    value={currentRecipe.notes}
                    onChange={(e) => updateRecipe(currentRecipeIndex, 'notes', e.target.value)}
                    rows={3}
                    className="input-field"
                    placeholder="Tips, variations, or substitutions..."
                  />
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-6">
              <button
                onClick={generateCookbook}
                disabled={generating || !cookbookTitle || !author}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <Wand2 size={24} className="animate-spin" />
                    Generating Cookbook...
                  </>
                ) : (
                  <>
                    <Download size={24} />
                    Generate & Download Cookbook
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
