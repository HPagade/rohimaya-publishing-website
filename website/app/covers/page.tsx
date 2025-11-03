'use client'

import { useState } from 'react'
import { Wand2, Image as ImageIcon, Download, Sparkles, RefreshCw } from 'lucide-react'

const GENRES = [
  'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy',
  'Thriller', 'Historical', 'Biography', 'Self-Help', 'Business', 'Children'
]

const STYLES = [
  { id: 'minimalist', name: 'Minimalist', description: 'Clean, simple design' },
  { id: 'vintage', name: 'Vintage', description: 'Classic, nostalgic feel' },
  { id: 'modern', name: 'Modern', description: 'Contemporary and bold' },
  { id: 'artistic', name: 'Artistic', description: 'Creative and expressive' },
  { id: 'professional', name: 'Professional', description: 'Business-like and sleek' },
  { id: 'dramatic', name: 'Dramatic', description: 'High-contrast and intense' },
]

const COLOR_SCHEMES = [
  { id: 'vibrant', colors: ['#FF6B6B', '#4ECDC4', '#FFE66D'] },
  { id: 'dark', colors: ['#2D3142', '#4F5D75', '#BFC0C0'] },
  { id: 'pastel', colors: ['#FFD6E8', '#C9E4CA', '#B5E7F0'] },
  { id: 'earth', colors: ['#8B4513', '#CD853F', '#DEB887'] },
  { id: 'ocean', colors: ['#006994', '#13293D', '#16B1E7'] },
  { id: 'sunset', colors: ['#FF6F59', '#254441', '#43AA8B'] },
]

interface CoverData {
  title: string
  subtitle: string
  author: string
  genre: string
  style: string
  colorScheme: string
  blurb: string
  tagline: string
  imageUrl?: string
  frontCoverUrl?: string
  backCoverUrl?: string
  spineUrl?: string
}

export default function CoversPage() {
  const [coverData, setCoverData] = useState<CoverData>({
    title: '',
    subtitle: '',
    author: '',
    genre: 'Fiction',
    style: 'modern',
    colorScheme: 'vibrant',
    blurb: '',
    tagline: '',
  })

  const [optimizing, setOptimizing] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<'front' | 'back' | 'spine'>('front')

  const updateField = (field: keyof CoverData, value: string) => {
    setCoverData({ ...coverData, [field]: value })
  }

  const optimizeText = async (field: 'title' | 'subtitle' | 'tagline' | 'blurb') => {
    setOptimizing(field)

    try {
      const response = await fetch('/api/covers/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          field,
          currentText: coverData[field],
          genre: coverData.genre,
          context: {
            title: coverData.title,
            author: coverData.author,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        updateField(field, data.optimizedText)
      } else {
        alert(data.error || 'Optimization failed')
      }
    } catch (error) {
      alert('Failed to optimize text')
    } finally {
      setOptimizing(null)
    }
  }

  const generateCoverArt = async () => {
    if (!coverData.title) {
      alert('Please enter a book title')
      return
    }

    setGenerating(true)

    try {
      const response = await fetch('/api/covers/generate-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: coverData.title,
          subtitle: coverData.subtitle,
          genre: coverData.genre,
          style: coverData.style,
          colorScheme: coverData.colorScheme,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setCoverData({ ...coverData, imageUrl: data.imageUrl })
      } else {
        alert(data.error || 'Image generation failed')
      }
    } catch (error) {
      alert('Failed to generate cover art')
    } finally {
      setGenerating(false)
    }
  }

  const generateFullCover = async () => {
    if (!coverData.title || !coverData.author) {
      alert('Please enter title and author name')
      return
    }

    setGenerating(true)

    try {
      const response = await fetch('/api/covers/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(coverData),
      })

      const data = await response.json()

      if (response.ok) {
        setCoverData({
          ...coverData,
          frontCoverUrl: data.frontCoverUrl,
          backCoverUrl: data.backCoverUrl,
          spineUrl: data.spineUrl,
        })
      } else {
        alert(data.error || 'Cover generation failed')
      }
    } catch (error) {
      alert('Failed to generate cover')
    } finally {
      setGenerating(false)
    }
  }

  const downloadCover = (type: 'front' | 'back' | 'spine' | 'all') => {
    if (type === 'all') {
      // Download all covers as ZIP
      window.open(`/api/covers/download?jobId=${coverData.frontCoverUrl}`, '_blank')
    } else {
      const url = type === 'front' ? coverData.frontCoverUrl : type === 'back' ? coverData.backCoverUrl : coverData.spineUrl
      if (url) {
        const a = document.createElement('a')
        a.href = url
        a.download = `${coverData.title}-${type}-cover.png`
        a.click()
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Book Cover Generator
          </h1>
          <p className="text-gray-600">
            Create stunning book covers with AI-powered design and text optimization
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            {/* Book Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles size={24} className="text-pink-600" />
                Book Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Book Title *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coverData.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      className="input-field flex-1"
                      placeholder="Enter your book title"
                    />
                    <button
                      onClick={() => optimizeText('title')}
                      disabled={optimizing === 'title' || !coverData.title}
                      className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
                      title="Optimize with AI"
                    >
                      {optimizing === 'title' ? <RefreshCw size={20} className="animate-spin" /> : <Wand2 size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coverData.subtitle}
                      onChange={(e) => updateField('subtitle', e.target.value)}
                      className="input-field flex-1"
                      placeholder="Optional subtitle"
                    />
                    <button
                      onClick={() => optimizeText('subtitle')}
                      disabled={optimizing === 'subtitle' || !coverData.title}
                      className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
                      title="Optimize with AI"
                    >
                      {optimizing === 'subtitle' ? <RefreshCw size={20} className="animate-spin" /> : <Wand2 size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    value={coverData.author}
                    onChange={(e) => updateField('author', e.target.value)}
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genre
                  </label>
                  <select
                    value={coverData.genre}
                    onChange={(e) => updateField('genre', e.target.value)}
                    className="input-field"
                  >
                    {GENRES.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tagline
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coverData.tagline}
                      onChange={(e) => updateField('tagline', e.target.value)}
                      className="input-field flex-1"
                      placeholder="Catchy tagline for front cover"
                    />
                    <button
                      onClick={() => optimizeText('tagline')}
                      disabled={optimizing === 'tagline' || !coverData.title}
                      className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
                      title="Generate with AI"
                    >
                      {optimizing === 'tagline' ? <RefreshCw size={20} className="animate-spin" /> : <Wand2 size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Design Settings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ImageIcon size={24} className="text-pink-600" />
                Design Style
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {STYLES.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => updateField('style', style.id)}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          coverData.style === style.id
                            ? 'border-pink-600 bg-pink-50'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        <div className="font-semibold text-sm">{style.name}</div>
                        <div className="text-xs text-gray-600">{style.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color Scheme
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {COLOR_SCHEMES.map((scheme) => (
                      <button
                        key={scheme.id}
                        onClick={() => updateField('colorScheme', scheme.id)}
                        className={`p-2 rounded-lg border-2 transition-all ${
                          coverData.colorScheme === scheme.id
                            ? 'border-pink-600'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        <div className="flex gap-1 h-8">
                          {scheme.colors.map((color, idx) => (
                            <div key={idx} className="flex-1 rounded" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                        <div className="text-xs text-center mt-1 capitalize">{scheme.id}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateCoverArt}
                  disabled={generating || !coverData.title}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {generating ? (
                    <>
                      <RefreshCw size={20} className="animate-spin" />
                      Generating Cover Art...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Cover Art
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Back Cover Blurb */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Wand2 size={24} className="text-pink-600" />
                Back Cover Blurb
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Book Description
                  </label>
                  <button
                    onClick={() => optimizeText('blurb')}
                    disabled={optimizing === 'blurb' || !coverData.title}
                    className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1 disabled:opacity-50"
                  >
                    {optimizing === 'blurb' ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        Optimizing...
                      </>
                    ) : (
                      <>
                        <Wand2 size={16} />
                        AI Optimize
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  value={coverData.blurb}
                  onChange={(e) => updateField('blurb', e.target.value)}
                  rows={6}
                  className="input-field"
                  placeholder="Enter your book description for the back cover. AI can help optimize it for maximum appeal!"
                />
                <p className="text-xs text-gray-500">
                  Tip: Click AI Optimize to make your blurb more compelling and professionally worded
                </p>
              </div>
            </div>

            {/* Generate Final Cover */}
            <button
              onClick={generateFullCover}
              disabled={generating || !coverData.title || !coverData.author}
              className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <RefreshCw size={24} className="animate-spin" />
                  Generating Complete Cover...
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  Generate Complete Book Cover
                </>
              )}
            </button>
          </div>

          {/* Right Column: Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>

              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                {['front', 'back', 'spine'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2 rounded-lg capitalize ${
                      activeTab === tab
                        ? 'bg-pink-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Preview Area */}
              <div className="bg-gray-100 rounded-lg aspect-[2/3] flex items-center justify-center mb-4">
                {activeTab === 'front' && coverData.frontCoverUrl ? (
                  <img src={coverData.frontCoverUrl} alt="Front Cover" className="w-full h-full object-contain" />
                ) : activeTab === 'back' && coverData.backCoverUrl ? (
                  <img src={coverData.backCoverUrl} alt="Back Cover" className="w-full h-full object-contain" />
                ) : activeTab === 'spine' && coverData.spineUrl ? (
                  <img src={coverData.spineUrl} alt="Spine" className="w-full h-full object-contain" />
                ) : coverData.imageUrl && activeTab === 'front' ? (
                  <img src={coverData.imageUrl} alt="Cover Art" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center text-gray-500 p-8">
                    <ImageIcon size={64} className="mx-auto mb-4 text-gray-400" />
                    <p>Generate a cover to see preview</p>
                  </div>
                )}
              </div>

              {/* Download Buttons */}
              {(coverData.frontCoverUrl || coverData.backCoverUrl || coverData.spineUrl) && (
                <div className="space-y-2">
                  <button
                    onClick={() => downloadCover(activeTab)}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Download size={20} />
                    Download {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Cover
                  </button>
                  <button
                    onClick={() => downloadCover('all')}
                    className="btn-secondary w-full flex items-center justify-center gap-2"
                  >
                    <Download size={20} />
                    Download All (ZIP)
                  </button>
                </div>
              )}

              {/* Info */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
                <strong>Print-Ready Specs:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Front Cover: 6" × 9" @ 300 DPI</li>
                  <li>Back Cover: 6" × 9" @ 300 DPI</li>
                  <li>Spine: Auto-calculated for page count</li>
                  <li>Format: High-res PNG</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
