import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import './MarketingSuite.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const MarketingSuite = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('book-info');
  const [bookInfo, setBookInfo] = useState({
    title: '',
    author: '',
    genre: 'fiction',
    subgenre: '',
    tropes: '',
    synopsis: '',
    targetAudience: '',
    compTitles: '',
    keywords: ''
  });

  const [generatedContent, setGeneratedContent] = useState({
    bookDescription: '',
    amazonKeywords: '',
    bisacCategories: '',
    socialPosts: [],
    emailTemplates: [],
    adCopy: [],
    blogIdeas: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const genres = [
    'Fiction', 'Non-Fiction', 'Romance', 'Fantasy', 'Mystery', 'Thriller',
    'Science Fiction', 'Historical Fiction', 'Contemporary', 'Young Adult',
    'Middle Grade', 'Children\'s', 'Memoir', 'Self-Help', 'Business',
    'Cookbook', 'Health & Wellness', 'Poetry', 'Horror', 'Literary Fiction'
  ];

  const handleInputChange = (e) => {
    setBookInfo({
      ...bookInfo,
      [e.target.name]: e.target.value
    });
  };

  const generateAllMarketing = async () => {
    if (!bookInfo.title || !bookInfo.synopsis) {
      setError('Please provide at least a title and synopsis');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = await user.getToken();
      const response = await axios.post(
        `${API_BASE_URL}/api/marketing/generate-all`,
        bookInfo,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setGeneratedContent(response.data.data);
      setSuccess('All marketing content generated successfully!');
      setActiveTab('book-description');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate marketing content');
    } finally {
      setLoading(false);
    }
  };

  const generateSingle = async (type) => {
    setLoading(true);
    setError('');

    try {
      const token = await user.getToken();
      const response = await axios.post(
        `${API_BASE_URL}/api/marketing/generate/${type}`,
        bookInfo,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setGeneratedContent(prev => ({
        ...prev,
        [type]: response.data.data[type]
      }));
      setSuccess(`${type.replace(/([A-Z])/g, ' $1').trim()} generated!`);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to generate ${type}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccess('Copied to clipboard!');
    setTimeout(() => setSuccess(''), 2000);
  };

  const downloadAll = () => {
    const content = `
# Marketing Materials for ${bookInfo.title}

## Amazon Book Description
${generatedContent.bookDescription || 'Not generated yet'}

## Amazon Keywords
${generatedContent.amazonKeywords || 'Not generated yet'}

## BISAC Categories
${generatedContent.bisacCategories || 'Not generated yet'}

## Social Media Posts
${generatedContent.socialPosts?.join('\n\n---\n\n') || 'Not generated yet'}

## Email Templates
${generatedContent.emailTemplates?.join('\n\n---\n\n') || 'Not generated yet'}

## Ad Copy Variations
${generatedContent.adCopy?.join('\n\n---\n\n') || 'Not generated yet'}

## Blog Post Ideas
${generatedContent.blogIdeas?.join('\n\n---\n\n') || 'Not generated yet'}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${bookInfo.title.replace(/[^a-z0-9]/gi, '_')}_marketing.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    setSuccess('Marketing materials downloaded!');
  };

  return (
    <div className="marketing-suite">
      <div className="marketing-header">
        <h1>📢 Marketing Suite</h1>
        <p>Generate complete marketing materials for your book in minutes</p>
      </div>

      <div className="marketing-tabs">
        <button
          className={activeTab === 'book-info' ? 'active' : ''}
          onClick={() => setActiveTab('book-info')}
        >
          Book Info
        </button>
        <button
          className={activeTab === 'book-description' ? 'active' : ''}
          onClick={() => setActiveTab('book-description')}
          disabled={!generatedContent.bookDescription}
        >
          Book Description
        </button>
        <button
          className={activeTab === 'keywords' ? 'active' : ''}
          onClick={() => setActiveTab('keywords')}
          disabled={!generatedContent.amazonKeywords}
        >
          Keywords & Categories
        </button>
        <button
          className={activeTab === 'social' ? 'active' : ''}
          onClick={() => setActiveTab('social')}
          disabled={!generatedContent.socialPosts?.length}
        >
          Social Media
        </button>
        <button
          className={activeTab === 'email' ? 'active' : ''}
          onClick={() => setActiveTab('email')}
          disabled={!generatedContent.emailTemplates?.length}
        >
          Email Templates
        </button>
        <button
          className={activeTab === 'ads' ? 'active' : ''}
          onClick={() => setActiveTab('ads')}
          disabled={!generatedContent.adCopy?.length}
        >
          Ad Copy
        </button>
        <button
          className={activeTab === 'blog' ? 'active' : ''}
          onClick={() => setActiveTab('blog')}
          disabled={!generatedContent.blogIdeas?.length}
        >
          Blog Ideas
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {activeTab === 'book-info' && (
        <div className="tab-content">
          <div className="book-info-section">
            <h3>Enter Your Book Information</h3>
            <p className="subtitle">The more details you provide, the better the marketing materials will be!</p>

            <div className="form-group">
              <label>Book Title *</label>
              <input
                type="text"
                name="title"
                value={bookInfo.title}
                onChange={handleInputChange}
                placeholder="Enter your book title"
              />
            </div>

            <div className="form-group">
              <label>Author Name *</label>
              <input
                type="text"
                name="author"
                value={bookInfo.author}
                onChange={handleInputChange}
                placeholder="Your name or pen name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Primary Genre *</label>
                <select name="genre" value={bookInfo.genre} onChange={handleInputChange}>
                  {genres.map(g => (
                    <option key={g} value={g.toLowerCase().replace(/\s+/g, '-')}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Subgenre / Niche</label>
                <input
                  type="text"
                  name="subgenre"
                  value={bookInfo.subgenre}
                  onChange={handleInputChange}
                  placeholder="e.g., Epic Fantasy, Cozy Mystery, Contemporary Romance"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Tropes / Key Themes</label>
              <input
                type="text"
                name="tropes"
                value={bookInfo.tropes}
                onChange={handleInputChange}
                placeholder="e.g., enemies-to-lovers, chosen one, found family, second chance"
              />
              <small>Separate multiple tropes with commas</small>
            </div>

            <div className="form-group">
              <label>Book Synopsis *</label>
              <textarea
                name="synopsis"
                value={bookInfo.synopsis}
                onChange={handleInputChange}
                placeholder="Provide a detailed summary of your book (300-500 words recommended)"
                rows="8"
              />
              <small>{bookInfo.synopsis.split(/\s+/).filter(w => w).length} words</small>
            </div>

            <div className="form-group">
              <label>Target Audience</label>
              <input
                type="text"
                name="targetAudience"
                value={bookInfo.targetAudience}
                onChange={handleInputChange}
                placeholder="e.g., Women 25-45, Young Adult readers, History enthusiasts"
              />
            </div>

            <div className="form-group">
              <label>Comparable Titles (Comp Titles)</label>
              <input
                type="text"
                name="compTitles"
                value={bookInfo.compTitles}
                onChange={handleInputChange}
                placeholder="e.g., A Court of Thorns and Roses by Sarah J. Maas, Red Rising by Pierce Brown"
              />
              <small>Books similar to yours that readers might know</small>
            </div>

            <div className="form-group">
              <label>Initial Keywords (Optional)</label>
              <input
                type="text"
                name="keywords"
                value={bookInfo.keywords}
                onChange={handleInputChange}
                placeholder="e.g., dragon riders, political intrigue, magic system"
              />
              <small>AI will suggest more keywords based on your book</small>
            </div>

            <div className="action-buttons">
              <button
                onClick={generateAllMarketing}
                className="primary-btn large"
                disabled={loading || !bookInfo.title || !bookInfo.synopsis}
              >
                {loading ? 'Generating...' : '🚀 Generate All Marketing Materials'}
              </button>
            </div>

            <div className="or-divider">
              <span>OR generate individual items:</span>
            </div>

            <div className="individual-buttons">
              <button onClick={() => generateSingle('bookDescription')} disabled={loading} className="secondary-btn">
                Book Description Only
              </button>
              <button onClick={() => generateSingle('amazonKeywords')} disabled={loading} className="secondary-btn">
                Keywords Only
              </button>
              <button onClick={() => generateSingle('socialPosts')} disabled={loading} className="secondary-btn">
                Social Posts Only
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'book-description' && generatedContent.bookDescription && (
        <div className="tab-content">
          <div className="content-section">
            <div className="section-header">
              <h3>Amazon Book Description</h3>
              <button onClick={() => copyToClipboard(generatedContent.bookDescription)} className="icon-btn">
                📋 Copy
              </button>
            </div>

            <div className="content-display">
              <div dangerouslySetInnerHTML={{ __html: generatedContent.bookDescription.replace(/\n/g, '<br/>') }} />
            </div>

            <div className="tips-box">
              <h4>💡 Tips for Amazon Descriptions:</h4>
              <ul>
                <li>Uses HTML formatting for bold and italics</li>
                <li>Optimized for Amazon's search algorithm</li>
                <li>Hook in first 2-3 lines (visible before "read more")</li>
                <li>Includes social proof if applicable</li>
                <li>Clear call-to-action at the end</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'keywords' && (generatedContent.amazonKeywords || generatedContent.bisacCategories) && (
        <div className="tab-content">
          <div className="content-section">
            <div className="section-header">
              <h3>Amazon Keywords & Categories</h3>
              <button onClick={() => copyToClipboard(`${generatedContent.amazonKeywords}\n\n${generatedContent.bisacCategories}`)} className="icon-btn">
                📋 Copy All
              </button>
            </div>

            {generatedContent.amazonKeywords && (
              <div className="subsection">
                <h4>Amazon Keywords (7 maximum)</h4>
                <div className="keyword-list">
                  {generatedContent.amazonKeywords.split('\n').map((keyword, index) => (
                    <div key={index} className="keyword-item">
                      <span className="keyword-number">{index + 1}.</span>
                      <span className="keyword-text">{keyword}</span>
                      <button onClick={() => copyToClipboard(keyword)} className="mini-btn">Copy</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {generatedContent.bisacCategories && (
              <div className="subsection">
                <h4>BISAC Categories (3 maximum)</h4>
                <div className="category-list">
                  {generatedContent.bisacCategories.split('\n').map((category, index) => (
                    <div key={index} className="category-item">
                      <span className="category-number">{index + 1}.</span>
                      <span className="category-text">{category}</span>
                      <button onClick={() => copyToClipboard(category)} className="mini-btn">Copy</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="tips-box">
              <h4>💡 How to Use:</h4>
              <ul>
                <li><strong>Amazon Keywords:</strong> Paste into KDP backend (7 slots available)</li>
                <li><strong>BISAC Categories:</strong> Select from dropdown in KDP (choose 3)</li>
                <li>Keywords should be phrases readers actually search for</li>
                <li>Categories determine where your book appears in Amazon's browsing structure</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'social' && generatedContent.socialPosts?.length > 0 && (
        <div className="tab-content">
          <div className="content-section">
            <div className="section-header">
              <h3>Social Media Posts</h3>
              <button onClick={() => copyToClipboard(generatedContent.socialPosts.join('\n\n---\n\n'))} className="icon-btn">
                📋 Copy All
              </button>
            </div>

            <div className="posts-grid">
              {generatedContent.socialPosts.map((post, index) => (
                <div key={index} className="post-card">
                  <div className="post-header">
                    <span className="post-platform">{post.platform || `Post ${index + 1}`}</span>
                    <button onClick={() => copyToClipboard(post.content || post)} className="mini-btn">Copy</button>
                  </div>
                  <div className="post-content">
                    {post.content || post}
                  </div>
                  {post.hashtags && (
                    <div className="post-hashtags">
                      {post.hashtags}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="tips-box">
              <h4>💡 Social Media Best Practices:</h4>
              <ul>
                <li>Post at optimal times (research your platform)</li>
                <li>Use high-quality book cover images</li>
                <li>Engage with comments within first hour</li>
                <li>Mix promotional posts with value content (80/20 rule)</li>
                <li>Schedule posts in advance using Buffer or Hootsuite</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'email' && generatedContent.emailTemplates?.length > 0 && (
        <div className="tab-content">
          <div className="content-section">
            <div className="section-header">
              <h3>Email Campaign Templates</h3>
              <button onClick={() => copyToClipboard(generatedContent.emailTemplates.join('\n\n---\n\n'))} className="icon-btn">
                📋 Copy All
              </button>
            </div>

            <div className="email-list">
              {generatedContent.emailTemplates.map((email, index) => (
                <div key={index} className="email-card">
                  <div className="email-header">
                    <h4>{email.subject || `Email Template ${index + 1}`}</h4>
                    <button onClick={() => copyToClipboard(email.body || email)} className="mini-btn">Copy</button>
                  </div>
                  <div className="email-subject">
                    <strong>Subject:</strong> {email.subject}
                  </div>
                  <div className="email-body">
                    {email.body || email}
                  </div>
                </div>
              ))}
            </div>

            <div className="tips-box">
              <h4>💡 Email Marketing Tips:</h4>
              <ul>
                <li>Send 3-5 emails during launch week</li>
                <li>Segment list by genre preferences</li>
                <li>Include clear CTA button (buy link)</li>
                <li>Test subject lines with A/B testing</li>
                <li>Optimal send time: Tuesday-Thursday, 10 AM local time</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ads' && generatedContent.adCopy?.length > 0 && (
        <div className="tab-content">
          <div className="content-section">
            <div className="section-header">
              <h3>Advertising Copy Variations</h3>
              <button onClick={() => copyToClipboard(generatedContent.adCopy.join('\n\n---\n\n'))} className="icon-btn">
                📋 Copy All
              </button>
            </div>

            <div className="ads-grid">
              {generatedContent.adCopy.map((ad, index) => (
                <div key={index} className="ad-card">
                  <div className="ad-header">
                    <span className="ad-type">{ad.type || `Ad Variation ${index + 1}`}</span>
                    <button onClick={() => copyToClipboard(ad.copy || ad)} className="mini-btn">Copy</button>
                  </div>
                  <div className="ad-content">
                    {ad.headline && <div className="ad-headline"><strong>{ad.headline}</strong></div>}
                    <div className="ad-body">{ad.copy || ad}</div>
                    {ad.cta && <div className="ad-cta">[{ad.cta}]</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="tips-box">
              <h4>💡 Advertising Platforms to Use:</h4>
              <ul>
                <li><strong>Amazon Ads:</strong> Sponsored Products (best ROI for books)</li>
                <li><strong>Facebook/Instagram Ads:</strong> Target by interests, lookalike audiences</li>
                <li><strong>BookBub Ads:</strong> Genre-specific targeting, avid readers</li>
                <li><strong>TikTok Ads:</strong> Video creatives, younger demographics</li>
                <li>Start with $5-10/day budget, scale winners</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'blog' && generatedContent.blogIdeas?.length > 0 && (
        <div className="tab-content">
          <div className="content-section">
            <div className="section-header">
              <h3>Blog Post & Content Ideas</h3>
              <button onClick={() => copyToClipboard(generatedContent.blogIdeas.join('\n\n'))} className="icon-btn">
                📋 Copy All
              </button>
            </div>

            <div className="blog-list">
              {generatedContent.blogIdeas.map((idea, index) => (
                <div key={index} className="blog-card">
                  <div className="blog-number">{index + 1}</div>
                  <div className="blog-content">
                    <h4>{idea.title || idea}</h4>
                    {idea.description && <p>{idea.description}</p>}
                    {idea.keywords && (
                      <div className="blog-keywords">
                        <strong>Keywords:</strong> {idea.keywords}
                      </div>
                    )}
                  </div>
                  <button onClick={() => copyToClipboard(idea.title || idea)} className="mini-btn">Copy</button>
                </div>
              ))}
            </div>

            <div className="tips-box">
              <h4>💡 Content Marketing Strategy:</h4>
              <ul>
                <li>Publish 1-2 blog posts per week leading up to launch</li>
                <li>Repurpose blog content into social posts, emails, videos</li>
                <li>Guest post on other author blogs in your genre</li>
                <li>SEO optimize for Google (use keywords naturally)</li>
                <li>End each post with book CTA or newsletter signup</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {Object.values(generatedContent).some(v => v) && (
        <div className="download-section">
          <button onClick={downloadAll} className="primary-btn large">
            💾 Download All Marketing Materials
          </button>
        </div>
      )}
    </div>
  );
};

export default MarketingSuite;
