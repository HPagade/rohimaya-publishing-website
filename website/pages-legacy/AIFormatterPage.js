/**
 * AI FORMATTER PAGE
 *
 * This is your unique product! A tool that helps authors format their manuscripts.
 * We'll build this in phases - starting with a beautiful landing page.
 */

import React, { useState } from 'react';
import './AIFormatterPage.css';

function AIFormatterPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="ai-formatter-page">
      {/* Hero Section */}
      <section className="formatter-hero">
        <div className="container">
          <h1 className="hero-title">
            ✨ AI Book Formatter
          </h1>
          <p className="hero-subtitle">
            Transform your manuscript from messy to polished in minutes
          </p>
          <p className="hero-tagline">
            Save hours of tedious formatting work. Let AI handle the details.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-large">
              Start Free Trial
            </button>
            <button className="btn btn-outline btn-large">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">How It Works</h2>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Upload Your Manuscript</h3>
              <p>
                Drop your Word doc, PDF, or text file. We support all common formats.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>AI Analyzes & Formats</h3>
              <p>
                Our AI detects chapters, headings, dialogue, and suggests optimal formatting.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Review & Customize</h3>
              <p>
                Make adjustments, add images, choose your style template.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Export & Publish</h3>
              <p>
                Download in ePub, PDF, or Kindle-ready format. Ready to publish!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title text-center">Powerful Features</h2>

          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">🤖</span>
              <h4>Smart Chapter Detection</h4>
              <p>Automatically identifies chapters and section breaks</p>
            </div>

            <div className="feature-item">
              <span className="feature-icon">📷</span>
              <h4>Image Placement</h4>
              <p>AI suggests optimal image positioning</p>
            </div>

            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <h4>Multi-Format Export</h4>
              <p>ePub, PDF, Kindle, and print-ready formats</p>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <h4>Style Templates</h4>
              <p>Choose from genre-specific formatting templates</p>
            </div>

            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <h4>Lightning Fast</h4>
              <p>Format a 300-page book in under 5 minutes</p>
            </div>

            <div className="feature-item">
              <span className="feature-icon">💾</span>
              <h4>Cloud Storage</h4>
              <p>Access your projects from anywhere</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section pricing-section">
        <div className="container">
          <h2 className="section-title text-center">Simple Pricing</h2>

          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Pay Per Book</h3>
              <div className="price">
                <span className="amount">$29</span>
                <span className="period">per book</span>
              </div>
              <ul className="pricing-features">
                <li>✓ Format one manuscript</li>
                <li>✓ All export formats</li>
                <li>✓ 30-day access</li>
                <li>✓ Email support</li>
              </ul>
              <button className="btn btn-outline">Get Started</button>
            </div>

            <div className="pricing-card featured">
              <div className="popular-badge">Most Popular</div>
              <h3>Monthly Plan</h3>
              <div className="price">
                <span className="amount">$19</span>
                <span className="period">per month</span>
              </div>
              <ul className="pricing-features">
                <li>✓ Unlimited manuscripts</li>
                <li>✓ All export formats</li>
                <li>✓ Cloud storage</li>
                <li>✓ Priority support</li>
                <li>✓ Early access to new features</li>
              </ul>
              <button className="btn btn-primary">Start Free Trial</button>
            </div>

            <div className="pricing-card">
              <h3>For Publishers</h3>
              <div className="price">
                <span className="amount">Custom</span>
                <span className="period">pricing</span>
              </div>
              <ul className="pricing-features">
                <li>✓ Volume pricing</li>
                <li>✓ Team accounts</li>
                <li>✓ API access</li>
                <li>✓ Dedicated support</li>
              </ul>
              <button className="btn btn-outline">Contact Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Format Your Book?</h2>
            <p>Join hundreds of authors who've saved hours with AI formatting</p>
            <button className="btn btn-primary btn-large">
              Start Your Free Trial →
            </button>
            <p className="cta-note">No credit card required • Cancel anytime</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AIFormatterPage;
