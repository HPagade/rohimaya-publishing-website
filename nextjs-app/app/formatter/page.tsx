'use client'

import { useState } from 'react'
import { Upload, FileText, Download, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

type AnalysisResult = {
  jobId: string
  chapters: { title: string; wordCount: number }[]
  wordCount: number
  pageCount: number
  readingTime: number
}

export default function FormatterPage() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Please upload a PDF, DOCX, or TXT file')
        return
      }
      // Validate size (50MB max)
      if (selectedFile.size > 50 * 1024 * 1024) {
        toast.error('File must be less than 50MB')
        return
      }
      setFile(selectedFile)
      if (!title) setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''))
    }
  }

  const analyzeManuscript = async () => {
    if (!file || !title.trim()) {
      toast.error('Please select a file and enter a title')
      return
    }

    setProcessing(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('author', author || 'Unknown Author')

    try {
      const res = await fetch('/api/format/analyze', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) throw new Error(await res.text())

      const data = await res.json()
      setResult(data)
      toast.success('Analysis complete!')
    } catch (error: any) {
      toast.error(error.message || 'Analysis failed')
    } finally {
      setProcessing(false)
    }
  }

  const generateExport = async (format: 'pdf' | 'epub') => {
    if (!result) return

    toast.loading(`Generating ${format.toUpperCase()}...`)

    try {
      const res = await fetch('/api/format/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: result.jobId,
          format,
          title,
          author
        })
      })

      if (!res.ok) throw new Error(await res.text())

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title}.${format}`
      a.click()
      window.URL.revokeObjectURL(url)

      toast.success(`${format.toUpperCase()} downloaded!`)
    } catch (error: any) {
      toast.error(error.message || 'Export failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">📚 AI Book Formatter</h1>
            <p className="text-gray-600">Transform your manuscript into professionally formatted books</p>
          </div>

          {/* Upload Section */}
          {!result && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-orange-500 transition cursor-pointer"
                   onClick={() => document.getElementById('file-input')?.click()}>
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-xl font-semibold mb-2">Upload Your Manuscript</h3>
                <p className="text-gray-500 mb-4">Supports PDF, DOCX, or TXT files (max 50MB)</p>
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                />
                {file && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg">
                    <FileText size={20} className="text-orange-500" />
                    <span className="font-medium">{file.name}</span>
                  </div>
                )}
              </div>

              {file && (
                <div className="mt-8 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Book Title *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your book title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Author Name</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <button
                    onClick={analyzeManuscript}
                    disabled={processing}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <><Loader2 className="animate-spin" size={20} /> Analyzing...</>
                    ) : (
                      <>Analyze Manuscript →</>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">📖 {title}</h2>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-orange-500">{result.wordCount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Words</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-500">{result.chapters.length}</div>
                    <div className="text-sm text-gray-600">Chapters</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-500">{result.readingTime} min</div>
                    <div className="text-sm text-gray-600">Reading Time</div>
                  </div>
                </div>
              </div>

              {/* Chapters */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold mb-4">Detected Chapters</h3>
                <div className="space-y-2">
                  {result.chapters.map((ch, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{ch.title}</span>
                      <span className="text-sm text-gray-600">{ch.wordCount} words</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Export Options */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold mb-4">Download Formatted Book</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => generateExport('pdf')}
                    className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-50"
                  >
                    <Download size={20} />
                    Download PDF
                  </button>
                  <button
                    onClick={() => generateExport('epub')}
                    className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-purple-500 text-purple-500 rounded-lg font-semibold hover:bg-purple-50"
                  >
                    <Download size={20} />
                    Download EPUB
                  </button>
                </div>
                <button
                  onClick={() => setResult(null)}
                  className="w-full mt-4 text-gray-600 hover:text-gray-800"
                >
                  ← Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
