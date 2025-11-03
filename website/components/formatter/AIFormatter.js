/**
 * AI BOOK FORMATTER APP - MAIN COMPONENT
 *
 * This is a standalone app for formatting manuscripts.
 *
 * FEATURES:
 * 1. Upload manuscript (Word, PDF, TXT)
 * 2. AI analyzes and formats (chapters, headings, spacing)
 * 3. Add images with smart placement
 * 4. Export to ePub, PDF, Kindle formats
 *
 * TECHNOLOGY:
 * - OpenAI GPT-4 for text analysis
 * - pdf-lib for PDF generation
 * - epub-gen for ePub creation
 * - Mammoth.js for Word doc parsing
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AIFormatter.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function AIFormatter() {
  // STATE
  const [step, setStep] = useState('upload'); // upload, processing, editing, export
  const [manuscript, setManuscript] = useState(null);
  const [fileName, setFileName] = useState('');
  const [formattedContent, setFormattedContent] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [jobId, setJobId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');
  const [selectedExports, setSelectedExports] = useState(['pdf', 'kindle']);
  const [voice, setVoice] = useState('nova');
  const [availableVoices, setAvailableVoices] = useState([]);

  // Metadata from form
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('fiction');

  // Load available voices on mount
  useEffect(() => {
    loadVoices();
  }, []);

  // Poll for job status when processing
  useEffect(() => {
    let interval;
    if (step === 'processing' && jobId) {
      interval = setInterval(() => {
        checkJobStatus();
      }, 2000); // Check every 2 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, jobId]);

  // Load available voices
  const loadVoices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/formatter/voices`);
      if (response.data.success) {
        setAvailableVoices(response.data.data.voices);
      }
    } catch (error) {
      console.error('Failed to load voices:', error);
    }
  };

  // STEP 1: Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF, Word doc, or text file');
      return;
    }

    // Validate file size (50MB max)
    if (file.size > 52428800) {
      setError('File size must be less than 50MB');
      return;
    }

    setFileName(file.name);
    setManuscript(file);
    setError('');

    // Auto-fill title from filename if empty
    if (!title) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
      setTitle(nameWithoutExt);
    }
  };

  // STEP 2: Upload to backend and analyze
  const uploadAndAnalyze = async () => {
    if (!manuscript) {
      setError('Please select a file first');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    setIsProcessing(true);
    setStep('processing');
    setProcessingStatus('Uploading manuscript...');
    setError('');

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', manuscript);
      formData.append('title', title);
      formData.append('author', author || 'Unknown Author');
      formData.append('genre', genre);

      // Upload and analyze
      const response = await axios.post(
        `${API_BASE_URL}/api/formatter/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data.success) {
        const { jobId: newJobId, wordCount, chapterCount, chapters } = response.data.data;

        setJobId(newJobId);
        setFormattedContent({
          title,
          author: author || 'Unknown Author',
          wordCount,
          chapterCount,
          chapters: chapters || [],
          pageCount: Math.ceil(wordCount / 250), // Rough estimate
          readingTime: `${Math.ceil(wordCount / 200)} minutes`
        });

        setProcessingStatus('Analysis complete!');
        setStep('editing');
      } else {
        throw new Error(response.data.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || err.message || 'Upload failed');
      setStep('upload');
    } finally {
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  // STEP 3: Process exports (PDF, Kindle, Audiobook)
  const processExports = async () => {
    if (!jobId) {
      setError('No job found. Please upload a manuscript first.');
      return;
    }

    if (selectedExports.length === 0) {
      setError('Please select at least one export format');
      return;
    }

    setIsProcessing(true);
    setStep('processing');
    setProcessingStatus('Generating exports...');
    setError('');

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/formatter/process`,
        {
          jobId,
          exports: selectedExports,
          voice: selectedExports.includes('audiobook') ? voice : undefined,
          speed: 1.0
        }
      );

      if (response.data.success) {
        setProcessingStatus('Processing started...');
        // Status will be updated by polling
      } else {
        throw new Error(response.data.error || 'Processing failed');
      }
    } catch (err) {
      console.error('Processing error:', err);
      setError(err.response?.data?.error || err.message || 'Processing failed');
      setStep('editing');
      setIsProcessing(false);
    }
  };

  // Check job status
  const checkJobStatus = async () => {
    if (!jobId) return;

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/formatter/status/${jobId}`
      );

      if (response.data.success) {
        const { status, progress, exports: completedExports, error: jobError } = response.data.data;

        if (status === 'completed') {
          setIsProcessing(false);
          setStep('export');
          setProcessingStatus('All exports complete!');
          setFormattedContent(prev => ({
            ...prev,
            exports: completedExports
          }));
        } else if (status === 'failed') {
          setIsProcessing(false);
          setError(jobError || 'Processing failed');
          setStep('editing');
        } else {
          setProcessingStatus(`Processing... ${progress || 0}%`);
        }
      }
    } catch (err) {
      console.error('Status check error:', err);
    }
  };

  // Download export
  const downloadExport = async (exportType) => {
    if (!jobId) return;

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/formatter/download/${jobId}/${exportType}`,
        {
          responseType: 'blob'
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

      // Set filename based on export type
      const extension = exportType === 'kindle' ? 'epub' : exportType === 'audiobook' ? 'zip' : exportType;
      link.setAttribute('download', `${title.replace(/[^a-z0-9]/gi, '_')}.${extension}`);

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      setError(`Failed to download ${exportType}: ${err.message}`);
    }
  };

  // Reset to start over
  const startOver = () => {
    setStep('upload');
    setManuscript(null);
    setFileName('');
    setFormattedContent(null);
    setIsProcessing(false);
    setError('');
    setJobId(null);
    setUploadProgress(0);
    setProcessingStatus('');
    setTitle('');
    setAuthor('');
    setGenre('fiction');
    setSelectedExports(['pdf', 'kindle']);
  };

  // RENDER: Different UI based on current step
  return (
    <div className="ai-formatter-app">

      {/* HEADER */}
      <header className="app-header">
        <h1>📚 AI Book Formatter</h1>
        <p>Transform your manuscript in minutes</p>
      </header>

      {/* MAIN CONTENT */}
      <main className="app-content">

        {/* STEP 1: UPLOAD */}
        {step === 'upload' && (
          <div className="step-container">
            <div className="upload-zone">
              <div className="upload-icon">📄</div>
              <h2>Upload Your Manuscript</h2>
              <p>Supports: PDF, Word (.doc, .docx), or Text files</p>

              <label htmlFor="file-upload" className="upload-btn">
                Choose File
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: 'none' }}
              />

              {fileName && (
                <div className="file-selected">
                  <p>✓ Selected: <strong>{fileName}</strong></p>
                  <button
                    className="btn btn-primary"
                    onClick={uploadAndAnalyze}
                  >
                    Analyze Manuscript →
                  </button>
                </div>
              )}

              {error && (
                <div className="error-message">{error}</div>
              )}
            </div>

            {/* FEATURES LIST */}
            <div className="features-preview">
              <h3>What AI Will Do:</h3>
              <ul>
                <li>🤖 Detect chapter breaks automatically</li>
                <li>📐 Format headings and spacing</li>
                <li>📷 Suggest image placements</li>
                <li>📱 Optimize for all formats (ePub, PDF, Kindle)</li>
                <li>⚡ Process in under 5 minutes</li>
              </ul>
            </div>
          </div>
        )}

        {/* STEP 2: PROCESSING */}
        {step === 'processing' && (
          <div className="step-container processing">
            <div className="processing-animation">
              <div className="spinner"></div>
              <h2>AI is formatting your book...</h2>
              <p>Analyzing structure, detecting chapters, optimizing layout</p>
              <div className="progress-steps">
                <div className="progress-step active">✓ Uploaded</div>
                <div className="progress-step active">⏳ Analyzing...</div>
                <div className="progress-step">Formatting</div>
                <div className="progress-step">Complete</div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EDITING */}
        {step === 'editing' && formattedContent && (
          <div className="step-container editing">
            <div className="editor-header">
              <h2>📖 {formattedContent.title}</h2>
              <div className="metadata">
                <span>{formattedContent.metadata.wordCount.toLocaleString()} words</span>
                <span>{formattedContent.metadata.pageCount} pages</span>
                <span>{formattedContent.metadata.readingTime} read time</span>
              </div>
            </div>

            <div className="editor-layout">
              {/* LEFT: Chapter list */}
              <aside className="chapters-sidebar">
                <h3>Chapters</h3>
                {formattedContent.chapters.map((chapter) => (
                  <div key={chapter.number} className="chapter-item">
                    <span className="chapter-number">{chapter.number}</span>
                    <span className="chapter-title">{chapter.title}</span>
                  </div>
                ))}
              </aside>

              {/* CENTER: Preview */}
              <div className="preview-pane">
                <h3>Preview</h3>
                <div className="book-preview">
                  {formattedContent.chapters.map((chapter) => (
                    <div key={chapter.number} className="chapter-preview">
                      <h2>{chapter.title}</h2>
                      <p>{chapter.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Tools */}
              <aside className="tools-sidebar">
                <h3>Export</h3>
                <div className="export-buttons">
                  <button
                    className="export-btn"
                    onClick={() => downloadExport('epub')}
                  >
                    📱 ePub
                  </button>
                  <button
                    className="export-btn"
                    onClick={() => downloadExport('pdf')}
                  >
                    📄 PDF
                  </button>
                  <button
                    className="export-btn"
                    onClick={() => downloadExport('kindle')}
                  >
                    📚 Kindle
                  </button>
                  <button
                    className="export-btn"
                    onClick={() => downloadExport('print')}
                  >
                    🖨️ Print Ready
                  </button>
                </div>

                <h3>Customize</h3>
                <div className="customization">
                  <label>
                    Font Size:
                    <input type="range" min="10" max="18" defaultValue="12" />
                  </label>
                  <label>
                    Line Spacing:
                    <input type="range" min="1" max="2" step="0.1" defaultValue="1.5" />
                  </label>
                  <label>
                    Margins:
                    <select>
                      <option>Standard</option>
                      <option>Wide</option>
                      <option>Narrow</option>
                    </select>
                  </label>
                </div>
              </aside>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default AIFormatter;
