/**
 * HOMEPAGE
 *
 * The first page visitors see. Makes a strong first impression!
 *
 * SECTIONS:
 * 1. Hero - Big, bold welcome with call-to-action
 * 2. Featured Books - Showcase your best books
 * 3. AI Formatter Teaser - Promote your unique tool
 * 4. Email Signup - Capture leads
 *
 * CONCEPTS:
 * - Component composition: Building pages from smaller pieces
 * - Props: Passing data to child components
 * - CSS classes for styling
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  // STATE: Email signup
  const [email, setEmail] = useState('');
  const [signupStatus, setSignupStatus] = useState(''); // '', 'success', 'error'

  // FUNCTION: Handle email signup
  const handleEmailSignup = async (e) => {
    e.preventDefault(); // Prevent page reload

    // TODO: Later we'll connect to Mailchimp API
    // For now, just show success message
    console.log('Email submitted:', email);
    setSignupStatus('success');
    setEmail(''); // Clear input

    // Reset message after 3 seconds
    setTimeout(() => setSignupStatus(''), 3000);
  };

  return (
    <div className="homepage">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Where <span className="highlight-phoenix">Stories</span> Meet{' '}
              <span className="highlight-peacock">Magic</span>
            </h1>
            <p className="hero-subtitle">
              Discover enchanting cookbooks, epic fantasy romance, and tales
              that celebrate culture, love, and the extraordinary in the everyday.
            </p>
            <div className="hero-buttons">
              <Link to="/books" className="btn btn-primary btn-large">
                Explore Our Books
              </Link>
              <Link to="/ai-formatter" className="btn btn-secondary btn-large">
                Try AI Formatter ✨
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section className="section featured-books">
        <div className="container">
          <h2 className="section-title text-center">Featured Books</h2>
          <p className="section-subtitle text-center">
            Dive into worlds of flavor, magic, and romance
          </p>

          <div className="books-grid">
            {/* Book 1: Cookbook */}
            <div className="book-card">
              <div className="book-cover-placeholder cookbook">
                <span>📚</span>
                <p>Masala & Magnolia</p>
              </div>
              <h3>The Spice & Soul Collection</h3>
              <p className="book-genre">Cookbooks</p>
              <p className="book-description">
                Cultural storytelling meets culinary magic in this memoir-style cookbook series.
              </p>
              <Link to="/books" className="btn btn-outline">View Series</Link>
            </div>

            {/* Book 2: Fantasy Romance */}
            <div className="book-card">
              <div className="book-cover-placeholder fantasy">
                <span>🔥</span>
                <p>Eclipse of Fire & Wings</p>
              </div>
              <h3>The Phoenix & Peacock Chronicles</h3>
              <p className="book-genre">Fantasy Romance</p>
              <p className="book-description">
                Epic fantasy romance where enemies become soulmates and kingdoms hang in the balance.
              </p>
              <Link to="/books" className="btn btn-outline">Read More</Link>
            </div>

            {/* Book 3: Mystery */}
            <div className="book-card">
              <div className="book-cover-placeholder mystery">
                <span>🔍</span>
                <p>Masala & Murder</p>
              </div>
              <h3>Cozy Mystery Series</h3>
              <p className="book-genre">Mystery</p>
              <p className="book-description">
                Delicious recipes, charming characters, and clever mysteries to solve.
              </p>
              <Link to="/books" className="btn btn-outline">Coming Soon</Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI FORMATTER FEATURE */}
      <section className="section ai-formatter-promo">
        <div className="container">
          <div className="promo-content">
            <div className="promo-text">
              <h2>✨ AI Book Formatter</h2>
              <h3>Format Your Manuscript in Minutes, Not Hours</h3>
              <p>
                Revolutionary AI-powered tool for authors. Upload your manuscript,
                and let AI handle formatting, chapter breaks, image placement, and
                export to multiple formats (ePub, PDF, Kindle-ready).
              </p>
              <ul className="feature-list">
                <li>🤖 Smart AI formatting</li>
                <li>📷 Intelligent image placement</li>
                <li>📱 Export to all major formats</li>
                <li>⚡ Save hours of tedious work</li>
              </ul>
              <Link to="/ai-formatter" className="btn btn-primary btn-large">
                Try It Free →
              </Link>
            </div>
            <div className="promo-visual">
              <div className="ai-demo-box">
                <p className="demo-text">Upload Manuscript →</p>
                <p className="demo-text">AI Magic ✨</p>
                <p className="demo-text">→ Perfect Format!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section className="section email-signup">
        <div className="container">
          <div className="signup-box">
            <h2>Join Our Reader Community</h2>
            <p>
              Get exclusive updates, free chapters, special offers, and be the
              first to know about new releases!
            </p>

            <form onSubmit={handleEmailSignup} className="signup-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-input"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>

            {/* Show success/error messages */}
            {signupStatus === 'success' && (
              <p className="success-message">
                🎉 Thank you for subscribing! Check your email for a welcome message.
              </p>
            )}
            {signupStatus === 'error' && (
              <p className="error-message">
                ❌ Oops! Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
