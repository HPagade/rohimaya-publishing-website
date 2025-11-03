'use client'

import { useState } from 'react'
import { Heart, Dumbbell, Utensils, FileText, Download } from 'lucide-react'

const CONTENT_TYPES = [
  { id: 'workout', name: 'Workout Plan', icon: Dumbbell, description: 'Custom exercise routines' },
  { id: 'meal', name: 'Meal Plan', icon: Utensils, description: 'Nutrition and diet plans' },
  { id: 'article', name: 'Health Article', icon: FileText, description: 'Wellness content' },
]

const WORKOUT_LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const WORKOUT_TYPES = ['Weight Loss', 'Muscle Gain', 'General Fitness', 'Strength Training']
const MEAL_GOALS = ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Keto', 'Vegan']

export default function HealthPage() {
  const [contentType, setContentType] = useState('workout')
  const [workoutLevel, setWorkoutLevel] = useState('Beginner')
  const [workoutType, setWorkoutType] = useState('Weight Loss')
  const [mealGoal, setMealGoal] = useState('Weight Loss')
  const [calories, setCalories] = useState('2000')
  const [articleTopic, setArticleTopic] = useState('')
  const [articleLength, setArticleLength] = useState('1000')
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)

  const generateContent = async () => {
    setGenerating(true)
    setResult(null)

    try {
      const response = await fetch('/api/health/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType,
          workoutLevel,
          workoutType,
          mealGoal,
          calories,
          articleTopic,
          articleLength,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
      } else {
        alert(data.error || 'Generation failed')
      }
    } catch (error) {
      alert('Failed to generate content')
    } finally {
      setGenerating(false)
    }
  }

  const downloadContent = () => {
    if (!result) return

    const blob = new Blob([result.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${contentType}-${Date.now()}.txt`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Health Content Generator
          </h1>
          <p className="text-gray-600">
            Create workout plans, meal plans, and wellness articles with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Settings */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Heart size={24} className="text-red-600" />
                Content Type
              </h2>

              <div className="grid grid-cols-1 gap-3 mb-6">
                {CONTENT_TYPES.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => setContentType(type.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        contentType === type.id
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={24} className="text-red-600" />
                        <div>
                          <div className="font-semibold">{type.name}</div>
                          <div className="text-sm text-gray-600">{type.description}</div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Workout Options */}
              {contentType === 'workout' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fitness Level
                    </label>
                    <select value={workoutLevel} onChange={(e) => setWorkoutLevel(e.target.value)} className="input-field">
                      {WORKOUT_LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Workout Goal
                    </label>
                    <select value={workoutType} onChange={(e) => setWorkoutType(e.target.value)} className="input-field">
                      {WORKOUT_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Meal Plan Options */}
              {contentType === 'meal' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Diet Goal
                    </label>
                    <select value={mealGoal} onChange={(e) => setMealGoal(e.target.value)} className="input-field">
                      {MEAL_GOALS.map(goal => (
                        <option key={goal} value={goal}>{goal}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Calories
                    </label>
                    <input
                      type="number"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                      className="input-field"
                      placeholder="2000"
                    />
                  </div>
                </div>
              )}

              {/* Article Options */}
              {contentType === 'article' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Topic
                    </label>
                    <input
                      type="text"
                      value={articleTopic}
                      onChange={(e) => setArticleTopic(e.target.value)}
                      className="input-field"
                      placeholder="e.g., Benefits of Morning Exercise"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Word Count
                    </label>
                    <select value={articleLength} onChange={(e) => setArticleLength(e.target.value)} className="input-field">
                      <option value="500">500 words</option>
                      <option value="1000">1000 words</option>
                      <option value="1500">1500 words</option>
                      <option value="2000">2000 words</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                onClick={generateContent}
                disabled={generating || (contentType === 'article' && !articleTopic)}
                className="btn-primary w-full mt-6"
              >
                {generating ? 'Generating...' : 'Generate Content'}
              </button>
            </div>
          </div>

          {/* Right: Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Generated Content</h2>
              {result && (
                <button onClick={downloadContent} className="btn-secondary text-sm flex items-center gap-1">
                  <Download size={16} />
                  Download
                </button>
              )}
            </div>

            {!result ? (
              <div className="text-center py-20 text-gray-500">
                <Heart size={64} className="mx-auto mb-4 text-gray-400" />
                <p>Your generated content will appear here</p>
              </div>
            ) : (
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg">{result.content}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
