'use client'

import { useState } from 'react'
import { TrendingUp, Mail, Share2, Megaphone, Copy, Download } from 'lucide-react'

const CONTENT_TYPES = [
  { id: 'social', name: 'Social Media Post', icon: Share2, platforms: ['Twitter', 'Facebook', 'Instagram', 'LinkedIn'] },
  { id: 'email', name: 'Email Campaign', icon: Mail, formats: ['Subject + Body', 'Newsletter', 'Announcement'] },
  { id: 'ad', name: 'Ad Copy', icon: Megaphone, platforms: ['Google Ads', 'Facebook Ads', 'LinkedIn Ads'] },
  { id: 'description', name: 'Book Description', icon: TrendingUp, styles: ['Amazon', 'Goodreads', 'General'] },
]

export default function MarketingPage() {
  const [contentType, setContentType] = useState('social')
  const [platform, setPlatform] = useState('Twitter')
  const [bookTitle, setBookTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('Professional')
  const [generating, setGenerating] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const generateContent = async () => {
    if (!topic && !bookTitle) {
      alert('Please enter a topic or book title')
      return
    }

    setGenerating(true)

    try {
      const response = await fetch('/api/marketing/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType,
          platform,
          bookTitle,
          genre,
          topic,
          tone,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResults(data.variations || [data.content])
      } else {
        alert(data.error || 'Generation failed')
      }
    } catch (error) {
      alert('Failed to generate content')
    } finally {
      setGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const downloadAll = () => {
    const content = results.join('\n\n---\n\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `marketing-content-${Date.now()}.txt`
    a.click()
  }

  const currentType = CONTENT_TYPES.find(t => t.id === contentType)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Marketing Suite
          </h1>
          <p className="text-gray-600">
            Generate social posts, emails, ads, and book descriptions with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Settings */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={24} className="text-orange-600" />
                Content Type
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {CONTENT_TYPES.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        setContentType(type.id)
                        if (type.platforms) setPlatform(type.platforms[0])
                      }}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        contentType === type.id
                          ? 'border-orange-600 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <Icon size={20} className="mb-2 text-orange-600" />
                      <div className="font-semibold text-sm">{type.name}</div>
                    </button>
                  )
                })}
              </div>

              {/* Platform/Format Selection */}
              {currentType?.platforms && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform
                  </label>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="input-field">
                    {currentType.platforms.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              )}

              {currentType?.formats && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format
                  </label>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="input-field">
                    {currentType.formats.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              )}

              {currentType?.styles && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Style
                  </label>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="input-field">
                    {currentType.styles.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Book Details (for description) */}
              {contentType === 'description' && (
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Book Title *
                    </label>
                    <input
                      type="text"
                      value={bookTitle}
                      onChange={(e) => setBookTitle(e.target.value)}
                      className="input-field"
                      placeholder="Your Book Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Genre
                    </label>
                    <input
                      type="text"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      className="input-field"
                      placeholder="e.g., Mystery, Romance, Sci-Fi"
                    />
                  </div>
                </div>
              )}

              {/* Topic (for social, email, ads) */}
              {contentType !== 'description' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic/Message *
                  </label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={3}
                    className="input-field"
                    placeholder="What do you want to communicate?"
                  />
                </div>
              )}

              {/* Tone */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone
                </label>
                <select value={tone} onChange={(e) => setTone(e.target.value)} className="input-field">
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Friendly</option>
                  <option>Inspirational</option>
                  <option>Humorous</option>
                  <option>Urgent</option>
                </select>
              </div>

              <button
                onClick={generateContent}
                disabled={generating || (!topic && !bookTitle)}
                className="btn-primary w-full"
              >
                {generating ? 'Generating...' : 'Generate Content'}
              </button>

              <p className="text-xs text-gray-500 mt-3">
                * We'll create 3 variations for A/B testing
              </p>
            </div>
          </div>

          {/* Right: Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Generated Content</h2>
              {results.length > 0 && (
                <button onClick={downloadAll} className="btn-secondary text-sm flex items-center gap-1">
                  <Download size={16} />
                  Download All
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <TrendingUp size={64} className="mx-auto mb-4 text-gray-400" />
                <p>Your marketing content will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm text-gray-700">
                        Variation {index + 1}
                      </span>
                      <button
                        onClick={() => copyToClipboard(result)}
                        className="text-orange-600 hover:text-orange-700 flex items-center gap-1 text-sm"
                      >
                        <Copy size={14} />
                        Copy
                      </button>
                    </div>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{result}</p>
                    {contentType === 'social' && (
                      <div className="mt-2 text-xs text-gray-500">
                        {result.length} characters
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
