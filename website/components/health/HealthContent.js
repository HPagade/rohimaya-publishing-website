import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import './HealthContent.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const HealthContent = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('generate');
  const [contentType, setContentType] = useState('article');
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [targetAudience, setTargetAudience] = useState('general');
  const [wordCount, setWordCount] = useState('1000');
  const [generatedContent, setGeneratedContent] = useState('');
  const [disclaimer, setDisclaimer] = useState('');
  const [citations, setCitations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const contentTypes = [
    { value: 'article', label: 'Health Article' },
    { value: 'guide', label: 'Wellness Guide' },
    { value: 'chapter', label: 'Book Chapter' },
    { value: 'blog', label: 'Blog Post' },
    { value: 'white-paper', label: 'White Paper' },
    { value: 'case-study', label: 'Case Study' }
  ];

  const audiences = [
    { value: 'general', label: 'General Public' },
    { value: 'professionals', label: 'Healthcare Professionals' },
    { value: 'patients', label: 'Patients' },
    { value: 'seniors', label: 'Seniors' },
    { value: 'parents', label: 'Parents' },
    { value: 'athletes', label: 'Athletes' }
  ];

  const generateContent = async () => {
    if (!topic) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = await user.getToken();
      const response = await axios.post(
        `${API_BASE_URL}/api/health/content/generate`,
        {
          contentType,
          topic,
          keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
          targetAudience,
          wordCount: parseInt(wordCount)
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setGeneratedContent(response.data.data.content);
      setSuccess('Content generated successfully!');
      setActiveTab('content');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  const generateDisclaimer = async () => {
    setLoading(true);
    setError('');

    try {
      const token = await user.getToken();
      const response = await axios.post(
        `${API_BASE_URL}/api/health/disclaimer/generate`,
        {
          contentType,
          topic
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setDisclaimer(response.data.data.disclaimer);
      setSuccess('Medical disclaimer generated!');
      setActiveTab('disclaimer');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate disclaimer');
    } finally {
      setLoading(false);
    }
  };

  const generateCitations = async () => {
    if (!generatedContent) {
      setError('Generate content first to create citations');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = await user.getToken();
      const response = await axios.post(
        `${API_BASE_URL}/api/health/citations/generate`,
        {
          content: generatedContent,
          topic
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setCitations(response.data.data.citations);
      setSuccess('Citations generated in AMA format!');
      setActiveTab('citations');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate citations');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccess('Copied to clipboard!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const downloadContent = () => {
    let fullContent = generatedContent;

    if (disclaimer) {
      fullContent += '\n\n--- MEDICAL DISCLAIMER ---\n\n' + disclaimer;
    }

    if (citations.length > 0) {
      fullContent += '\n\n--- REFERENCES ---\n\n';
      citations.forEach((citation, index) => {
        fullContent += `${index + 1}. ${citation}\n`;
      });
    }

    const blob = new Blob([fullContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${topic.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setSuccess('Content downloaded!');
  };

  return (
    <div className="health-content">
      <div className="health-header">
        <h1>🏥 Health Content Generator</h1>
        <p>AI-powered medical and wellness content with citations and disclaimers</p>
      </div>

      <div className="health-tabs">
        <button
          className={activeTab === 'generate' ? 'active' : ''}
          onClick={() => setActiveTab('generate')}
        >
          Generate
        </button>
        <button
          className={activeTab === 'content' ? 'active' : ''}
          onClick={() => setActiveTab('content')}
          disabled={!generatedContent}
        >
          Content
        </button>
        <button
          className={activeTab === 'disclaimer' ? 'active' : ''}
          onClick={() => setActiveTab('disclaimer')}
          disabled={!disclaimer}
        >
          Disclaimer
        </button>
        <button
          className={activeTab === 'citations' ? 'active' : ''}
          onClick={() => setActiveTab('citations')}
          disabled={citations.length === 0}
        >
          Citations ({citations.length})
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {activeTab === 'generate' && (
        <div className="tab-content">
          <div className="generate-section">
            <h3>Create Health Content</h3>

            <div className="form-group">
              <label>Content Type</label>
              <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
                {contentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Topic *</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Managing Type 2 Diabetes Through Diet"
              />
            </div>

            <div className="form-group">
              <label>Keywords (comma-separated)</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., diabetes, nutrition, blood sugar, diet"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Target Audience</label>
                <select value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)}>
                  {audiences.map(audience => (
                    <option key={audience.value} value={audience.value}>
                      {audience.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Word Count</label>
                <select value={wordCount} onChange={(e) => setWordCount(e.target.value)}>
                  <option value="500">500 words</option>
                  <option value="1000">1,000 words</option>
                  <option value="1500">1,500 words</option>
                  <option value="2000">2,000 words</option>
                  <option value="3000">3,000 words</option>
                  <option value="5000">5,000 words</option>
                </select>
              </div>
            </div>

            <div className="action-buttons">
              <button
                onClick={generateContent}
                disabled={loading}
                className="primary-btn"
              >
                {loading ? 'Generating...' : 'Generate Content'}
              </button>

              <button
                onClick={generateDisclaimer}
                disabled={loading}
                className="secondary-btn"
              >
                Generate Medical Disclaimer
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="tab-content">
          <div className="content-display">
            <div className="content-header">
              <h3>Generated Content</h3>
              <div className="content-actions">
                <button onClick={() => copyToClipboard(generatedContent)} className="icon-btn">
                  📋 Copy
                </button>
                <button onClick={generateCitations} className="secondary-btn" disabled={loading}>
                  📚 Generate Citations
                </button>
                <button onClick={downloadContent} className="primary-btn">
                  💾 Download
                </button>
              </div>
            </div>

            <div className="content-text">
              {generatedContent.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="content-stats">
              <span>Words: {generatedContent.split(/\s+/).length}</span>
              <span>Characters: {generatedContent.length}</span>
              <span>Reading Time: ~{Math.ceil(generatedContent.split(/\s+/).length / 200)} min</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'disclaimer' && (
        <div className="tab-content">
          <div className="disclaimer-display">
            <div className="content-header">
              <h3>Medical Disclaimer</h3>
              <button onClick={() => copyToClipboard(disclaimer)} className="icon-btn">
                📋 Copy
              </button>
            </div>

            <div className="disclaimer-box">
              <p>{disclaimer}</p>
            </div>

            <div className="disclaimer-info">
              <strong>💡 Tip:</strong> Always include a medical disclaimer in health-related content.
              This disclaimer is customized for your content type and topic.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'citations' && (
        <div className="tab-content">
          <div className="citations-display">
            <div className="content-header">
              <h3>References (AMA Style)</h3>
              <button
                onClick={() => copyToClipboard(citations.map((c, i) => `${i + 1}. ${c}`).join('\n'))}
                className="icon-btn"
              >
                📋 Copy All
              </button>
            </div>

            <div className="citations-list">
              {citations.map((citation, index) => (
                <div key={index} className="citation-item">
                  <span className="citation-number">{index + 1}.</span>
                  <span className="citation-text">{citation}</span>
                </div>
              ))}
            </div>

            <div className="citation-info">
              <strong>📖 AMA Format:</strong> These citations follow the American Medical Association
              (AMA) citation style, commonly used in medical and health publications.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthContent;
