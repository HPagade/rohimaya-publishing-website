'use client'

import { useState, useRef } from 'react'
import { Upload, Play, Pause, Download, Wand2, Volume2 } from 'lucide-react'

const VOICES = [
  { id: 'alloy', name: 'Alloy', description: 'Neutral, balanced voice' },
  { id: 'echo', name: 'Echo', description: 'Male, clear and direct' },
  { id: 'fable', name: 'Fable', description: 'British male, expressive' },
  { id: 'onyx', name: 'Onyx', description: 'Deep male, authoritative' },
  { id: 'nova', name: 'Nova', description: 'Female, warm and friendly' },
  { id: 'shimmer', name: 'Shimmer', description: 'Female, soft and gentle' },
]

interface Chapter {
  number: number
  title: string
  wordCount: number
  selected: boolean
}

interface AudioJob {
  id: string
  chapter: number
  title: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  audioUrl?: string
  duration?: number
}

export default function AudiobookPage() {
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [selectedVoice, setSelectedVoice] = useState('nova')
  const [speed, setSpeed] = useState(1.0)
  const [analyzing, setAnalyzing] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [audioJobs, setAudioJobs] = useState<AudioJob[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      setText('')
    }
  }

  const analyzeManuscript = async () => {
    if (!file && !text) {
      alert('Please upload a file or paste text')
      return
    }

    setAnalyzing(true)

    try {
      const formData = new FormData()
      if (file) {
        formData.append('file', file)
      } else {
        formData.append('text', text)
      }

      const response = await fetch('/api/audiobook/analyze', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setChapters(
          data.chapters.map((ch: any) => ({
            ...ch,
            selected: true,
          }))
        )
      } else {
        alert(data.error || 'Analysis failed')
      }
    } catch (error) {
      alert('Failed to analyze manuscript')
    } finally {
      setAnalyzing(false)
    }
  }

  const toggleChapter = (chapterNum: number) => {
    setChapters(
      chapters.map((ch) =>
        ch.number === chapterNum ? { ...ch, selected: !ch.selected } : ch
      )
    )
  }

  const toggleAll = () => {
    const allSelected = chapters.every((ch) => ch.selected)
    setChapters(chapters.map((ch) => ({ ...ch, selected: !allSelected })))
  }

  const generatePreview = async () => {
    const previewText = chapters[0]?.title || 'Welcome to your audiobook preview'

    try {
      const response = await fetch('/api/audiobook/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: previewText,
          voice: selectedVoice,
          speed,
        }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setPreviewUrl(url)
        if (audioRef.current) {
          audioRef.current.src = url
          audioRef.current.play()
          setPlaying(true)
        }
      } else {
        alert('Preview generation failed')
      }
    } catch (error) {
      alert('Failed to generate preview')
    }
  }

  const generateAudiobook = async () => {
    const selectedChapters = chapters.filter((ch) => ch.selected)
    if (selectedChapters.length === 0) {
      alert('Please select at least one chapter')
      return
    }

    setGenerating(true)

    try {
      const formData = new FormData()
      if (file) {
        formData.append('file', file)
      } else {
        formData.append('text', text)
      }
      formData.append('voice', selectedVoice)
      formData.append('speed', speed.toString())
      formData.append('chapters', JSON.stringify(selectedChapters.map((ch) => ch.number)))

      const response = await fetch('/api/audiobook/generate', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        // Poll for job status
        pollJobStatus(data.jobId)
      } else {
        alert(data.error || 'Generation failed')
        setGenerating(false)
      }
    } catch (error) {
      alert('Failed to generate audiobook')
      setGenerating(false)
    }
  }

  const pollJobStatus = async (jobId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/audiobook/status/${jobId}`)
        const data = await response.json()

        if (data.status === 'completed') {
          setAudioJobs(data.chapters)
          setGenerating(false)
          clearInterval(interval)
        } else if (data.status === 'failed') {
          alert('Audiobook generation failed')
          setGenerating(false)
          clearInterval(interval)
        } else {
          // Update progress
          setAudioJobs(data.chapters || [])
        }
      } catch (error) {
        console.error('Status check failed:', error)
      }
    }, 3000)
  }

  const togglePlayback = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setPlaying(!playing)
    }
  }

  const downloadAudio = (url: string, title: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = `${title}.mp3`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Audiobook Generator
          </h1>
          <p className="text-gray-600">
            Transform your manuscript into professional audiobooks with AI narration
          </p>
        </div>

        {/* Step 1: Upload */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Upload size={24} className="text-purple-600" />
            Step 1: Upload Manuscript
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File
              </label>
              <input
                type="file"
                accept=".txt,.pdf,.docx"
                onChange={handleFileUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              {file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {file.name}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paste Text
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Paste your manuscript here..."
              />
            </div>

            <button
              onClick={analyzeManuscript}
              disabled={analyzing || (!file && !text)}
              className="btn-primary w-full"
            >
              {analyzing ? 'Analyzing...' : 'Analyze Manuscript'}
            </button>
          </div>
        </div>

        {/* Step 2: Voice Selection */}
        {chapters.length > 0 && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Volume2 size={24} className="text-purple-600" />
                Step 2: Choose Voice & Settings
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {VOICES.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => setSelectedVoice(voice.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedVoice === voice.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{voice.name}</div>
                    <div className="text-sm text-gray-600">{voice.description}</div>
                  </button>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Narration Speed: {speed}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0.5x (Slower)</span>
                  <span>2.0x (Faster)</span>
                </div>
              </div>

              <button
                onClick={generatePreview}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <Play size={20} />
                Preview Voice
              </button>

              {previewUrl && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg flex items-center justify-between">
                  <span className="text-sm text-gray-700">Preview Sample</span>
                  <button
                    onClick={togglePlayback}
                    className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                  >
                    {playing ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                </div>
              )}
            </div>

            {/* Step 3: Chapter Selection */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Wand2 size={24} className="text-purple-600" />
                Step 3: Select Chapters
              </h2>

              <div className="mb-4">
                <button
                  onClick={toggleAll}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  {chapters.every((ch) => ch.selected) ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {chapters.map((chapter) => (
                  <div
                    key={chapter.number}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      chapter.selected
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => toggleChapter(chapter.number)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">{chapter.title}</div>
                        <div className="text-sm text-gray-600">
                          {chapter.wordCount.toLocaleString()} words • ~
                          {Math.ceil(chapter.wordCount / 150)} min
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={chapter.selected}
                        onChange={() => toggleChapter(chapter.number)}
                        className="h-5 w-5 text-purple-600"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-700">
                  <strong>Selected:</strong> {chapters.filter((ch) => ch.selected).length} chapters
                  <br />
                  <strong>Total words:</strong>{' '}
                  {chapters
                    .filter((ch) => ch.selected)
                    .reduce((sum, ch) => sum + ch.wordCount, 0)
                    .toLocaleString()}
                  <br />
                  <strong>Estimated time:</strong> ~
                  {Math.ceil(
                    chapters
                      .filter((ch) => ch.selected)
                      .reduce((sum, ch) => sum + ch.wordCount, 0) / 150
                  )}{' '}
                  minutes
                </div>
              </div>

              <button
                onClick={generateAudiobook}
                disabled={generating || chapters.filter((ch) => ch.selected).length === 0}
                className="btn-primary w-full mt-4"
              >
                {generating ? 'Generating Audiobook...' : 'Generate Audiobook'}
              </button>
            </div>

            {/* Audio Files */}
            {audioJobs.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Download size={24} className="text-purple-600" />
                  Generated Audio Files
                </h2>

                <div className="space-y-3">
                  {audioJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 border border-gray-200 rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-600">
                          {job.status === 'completed' && job.duration && (
                            <span>Duration: {Math.floor(job.duration / 60)} min</span>
                          )}
                          {job.status === 'processing' && <span>Processing...</span>}
                          {job.status === 'failed' && (
                            <span className="text-red-600">Failed</span>
                          )}
                        </div>
                      </div>
                      {job.status === 'completed' && job.audioUrl && (
                        <button
                          onClick={() => downloadAudio(job.audioUrl!, job.title)}
                          className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                          <Download size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <audio ref={audioRef} onEnded={() => setPlaying(false)} className="hidden" />
      </div>
    </div>
  )
}
