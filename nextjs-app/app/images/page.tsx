'use client'

import { useState } from 'react'
import { Image as ImageIcon, Wand2, Download, Plus, Trash2, Sparkles } from 'lucide-react'

const STYLES = [
  { id: 'realistic', name: 'Photorealistic', description: 'Lifelike, detailed photographs' },
  { id: 'illustration', name: 'Digital Illustration', description: 'Modern digital art style' },
  { id: 'watercolor', name: 'Watercolor', description: 'Soft, artistic watercolor paintings' },
  { id: 'cartoon', name: 'Cartoon', description: 'Fun, animated cartoon style' },
  { id: 'sketch', name: 'Pencil Sketch', description: 'Hand-drawn pencil sketches' },
  { id: 'vintage', name: 'Vintage Art', description: 'Classic, nostalgic artwork' },
]

const SIZES = [
  { id: 'square', name: 'Square', dimensions: '1024x1024', use: 'Social media, icons' },
  { id: 'portrait', name: 'Portrait', dimensions: '1024x1792', use: 'Book illustrations' },
  { id: 'landscape', name: 'Landscape', dimensions: '1792x1024', use: 'Headers, banners' },
]

interface ImagePrompt {
  id: string
  description: string
  style: string
  size: string
  imageUrl?: string
  status: 'pending' | 'generating' | 'completed' | 'failed'
}

export default function ImagesPage() {
  const [prompts, setPrompts] = useState<ImagePrompt[]>([
    { id: '1', description: '', style: 'illustration', size: 'square', status: 'pending' },
  ])
  const [generating, setGenerating] = useState(false)

  const addPrompt = () => {
    setPrompts([
      ...prompts,
      {
        id: Date.now().toString(),
        description: '',
        style: 'illustration',
        size: 'square',
        status: 'pending',
      },
    ])
  }

  const removePrompt = (id: string) => {
    if (prompts.length > 1) {
      setPrompts(prompts.filter((p) => p.id !== id))
    }
  }

  const updatePrompt = (id: string, field: keyof ImagePrompt, value: string) => {
    setPrompts(
      prompts.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    )
  }

  const enhancePrompt = async (id: string) => {
    const prompt = prompts.find((p) => p.id === id)
    if (!prompt || !prompt.description) return

    try {
      const response = await fetch('/api/images/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: prompt.description,
          style: prompt.style,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        updatePrompt(id, 'description', data.enhancedPrompt)
      } else {
        alert(data.error || 'Enhancement failed')
      }
    } catch (error) {
      alert('Failed to enhance prompt')
    }
  }

  const generateImages = async () => {
    const validPrompts = prompts.filter((p) => p.description.trim())

    if (validPrompts.length === 0) {
      alert('Please add at least one image description')
      return
    }

    setGenerating(true)

    for (const prompt of validPrompts) {
      updatePrompt(prompt.id, 'status', 'generating')

      try {
        const response = await fetch('/api/images/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            description: prompt.description,
            style: prompt.style,
            size: prompt.size,
          }),
        })

        const data = await response.json()

        if (response.ok) {
          setPrompts((prev) =>
            prev.map((p) =>
              p.id === prompt.id
                ? { ...p, imageUrl: data.imageUrl, status: 'completed' }
                : p
            )
          )
        } else {
          setPrompts((prev) =>
            prev.map((p) =>
              p.id === prompt.id ? { ...p, status: 'failed' } : p
            )
          )
          alert(data.error || 'Generation failed')
        }
      } catch (error) {
        setPrompts((prev) =>
          prev.map((p) =>
            p.id === prompt.id ? { ...p, status: 'failed' } : p
          )
        )
      }
    }

    setGenerating(false)
  }

  const downloadImage = (url: string, description: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = `${description.substring(0, 30).replace(/\s+/g, '-')}.png`
    a.click()
  }

  const downloadAll = () => {
    prompts
      .filter((p) => p.imageUrl)
      .forEach((p, idx) => {
        setTimeout(() => downloadImage(p.imageUrl!, p.description), idx * 500)
      })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Image Generator
          </h1>
          <p className="text-gray-600">
            Create stunning illustrations and artwork for your books with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Prompts */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles size={24} className="text-indigo-600" />
                  Image Prompts
                </span>
                <button
                  onClick={addPrompt}
                  className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 flex items-center gap-1"
                >
                  <Plus size={16} />
                  Add Image
                </button>
              </h2>

              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {prompts.map((prompt, index) => (
                  <div key={prompt.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-700">Image #{index + 1}</span>
                      {prompts.length > 1 && (
                        <button
                          onClick={() => removePrompt(prompt.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <div className="flex gap-2">
                          <textarea
                            value={prompt.description}
                            onChange={(e) =>
                              updatePrompt(prompt.id, 'description', e.target.value)
                            }
                            rows={3}
                            className="input-field flex-1"
                            placeholder="Describe the image you want to create..."
                          />
                          <button
                            onClick={() => enhancePrompt(prompt.id)}
                            disabled={!prompt.description}
                            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 h-10"
                            title="Enhance with AI"
                          >
                            <Wand2 size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Style
                          </label>
                          <select
                            value={prompt.style}
                            onChange={(e) =>
                              updatePrompt(prompt.id, 'style', e.target.value)
                            }
                            className="input-field"
                          >
                            {STYLES.map((style) => (
                              <option key={style.id} value={style.id}>
                                {style.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Size
                          </label>
                          <select
                            value={prompt.size}
                            onChange={(e) =>
                              updatePrompt(prompt.id, 'size', e.target.value)
                            }
                            className="input-field"
                          >
                            {SIZES.map((size) => (
                              <option key={size.id} value={size.id}>
                                {size.name} ({size.dimensions})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {prompt.status !== 'pending' && (
                        <div className="text-sm">
                          Status:{' '}
                          <span
                            className={`font-semibold ${
                              prompt.status === 'completed'
                                ? 'text-green-600'
                                : prompt.status === 'generating'
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}
                          >
                            {prompt.status}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={generateImages}
                  disabled={generating || prompts.every((p) => !p.description)}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {generating ? (
                    <>
                      <Wand2 size={20} className="animate-spin" />
                      Generating Images...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate {prompts.filter((p) => p.description).length} Image
                      {prompts.filter((p) => p.description).length !== 1 ? 's' : ''}
                    </>
                  )}
                </button>

                {prompts.some((p) => p.imageUrl) && (
                  <button
                    onClick={downloadAll}
                    className="btn-secondary w-full flex items-center justify-center gap-2"
                  >
                    <Download size={20} />
                    Download All Images
                  </button>
                )}
              </div>
            </div>

            {/* Style Guide */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-3">Style Guide</h3>
              <div className="space-y-2 text-sm">
                {STYLES.map((style) => (
                  <div key={style.id}>
                    <span className="font-medium">{style.name}:</span>{' '}
                    <span className="text-gray-600">{style.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Gallery */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ImageIcon size={24} className="text-indigo-600" />
                Generated Images
              </h2>

              {prompts.filter((p) => p.imageUrl).length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <ImageIcon size={64} className="mx-auto mb-4 text-gray-400" />
                  <p>Your generated images will appear here</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {prompts
                    .filter((p) => p.imageUrl)
                    .map((prompt) => (
                      <div key={prompt.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={prompt.imageUrl}
                          alt={prompt.description}
                          className="w-full h-auto"
                        />
                        <div className="p-4">
                          <p className="text-sm text-gray-700 mb-2">{prompt.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="capitalize">{prompt.style}</span>
                            <button
                              onClick={() => downloadImage(prompt.imageUrl!, prompt.description)}
                              className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                            >
                              <Download size={14} />
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Usage Info */}
            <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700">
              <strong>💡 Pro Tips:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Be specific: "A wizard casting a fire spell in a dark forest" vs "wizard"</li>
                <li>Use the AI enhance button to improve your descriptions</li>
                <li>Generate multiple variations for the best results</li>
                <li>Portrait size works best for book illustrations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
