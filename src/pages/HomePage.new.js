/**
 * HOMEPAGE - Simplified Focus on AI Book Formatter
 *
 * Clear value proposition: Upload manuscript → Get formatted book in 5 minutes
 * Simple CTA: Sign up and start formatting
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import './HomePage.css';

function HomePage() {
  const { user } = useUser();

  return (
    <div className="homepage">

      {/* HERO SECTION - Clear Value Proposition */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Format Your Book in <span className="highlight-phoenix">5 Minutes</span>
            </h1>
            <p className="hero-subtitle">
              Upload your manuscript. Get professionally formatted PDF, EPUB, and Kindle files.
              No design skills required. Powered by AI.
            </p>

            {/* Dynamic CTAs based on auth state */}
            <div className="hero-buttons">
              <SignedOut>
                <Link to="/sign-up" className="btn btn-primary btn-large">
                  Get Started Free
                </Link>
                <Link to="/pricing" className="btn btn-secondary btn-large">
                  View Pricing
                </Link>
              </SignedOut>

              <SignedIn>
                <Link to="/formatter" className="btn btn-primary btn-large">
                  Open Formatter →
                </Link>
                <Link to="/dashboard" className="btn btn-secondary btn-large">
                  My Dashboard
                </Link>
              </SignedIn>
            </div>

            {/* Trust indicators */}
            <p className="hero-trust">
              ✓ 1 Free format per month • ✓ No credit card required • ✓ Ready in 5 minutes
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how-it-works">
        <div className="container">
          <h2 className="section-title text-center">How It Works</h2>
          <p className="section-subtitle text-center">
            Three simple steps to your professionally formatted book
          </p>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">📄</div>
              <h3>Upload Manuscript</h3>
              <p>
                Upload your .docx, .pdf, or .txt file. We support manuscripts up to 300 pages.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">🤖</div>
              <h3>AI Formats It</h3>
              <p>
                Our AI detects chapters, formats headings, optimizes spacing, and creates a professional layout.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">📥</div>
              <h3>Download & Publish</h3>
              <p>
                Get PDF, EPUB, and Kindle files ready to upload to Amazon KDP, IngramSpark, or any platform.
              </p>
            </div>
          </div>

          <div className="text-center" style={{ marginTop: '3rem' }}>
            <SignedOut>
              <Link to="/sign-up" className="btn btn-primary btn-large">
                Start Formatting Free
              </Link>
            </SignedOut>
            <SignedIn>
              <Link to="/formatter" className="btn btn-primary btn-large">
                Format Your Book Now →
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features">
        <div className="container">
          <h2 className="section-title text-center">Everything You Need</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Professional Templates</h3>
              <p>20+ genre-specific templates for fiction, non-fiction, children's books, and more.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Multiple Formats</h3>
              <p>Export to PDF (print-ready), EPUB (Apple Books, Kobo), and Kindle (Amazon KDP).</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Get your formatted book in 2-5 minutes. No waiting, no manual work.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Smart AI Detection</h3>
              <p>Automatically detects chapters, headings, scene breaks, and formatting errors.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✏️</div>
              <h3>Easy Customization</h3>
              <p>Adjust fonts, spacing, margins, and styles with simple controls.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🖨️</div>
              <h3>Print-Ready PDFs</h3>
              <p>300 DPI, perfect for KDP, IngramSpark, or local printers. Includes bleed and trim marks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="section pricing-preview">
        <div className="container">
          <h2 className="section-title text-center">Simple, Transparent Pricing</h2>
          <p className="section-subtitle text-center">
            Start free, upgrade when you need more
          </p>

          <div className="pricing-cards-preview">
            <div className="pricing-card">
              <h3>Free</h3>
              <div className="price">$0<span>/month</span></div>
              <ul className="features-list">
                <li>✓ 1 format per month</li>
                <li>✓ All export formats</li>
                <li>✓ Basic templates</li>
                <li>✓ Email support</li>
              </ul>
              <SignedOut>
                <Link to="/sign-up" className="btn btn-outline btn-block">
                  Get Started
                </Link>
              </SignedOut>
              <SignedIn>
                <Link to="/formatter" className="btn btn-outline btn-block">
                  Start Formatting
                </Link>
              </SignedIn>
            </div>

            <div className="pricing-card featured">
              <div className="badge">Most Popular</div>
              <h3>Pro</h3>
              <div className="price">$29<span>/month</span></div>
              <ul className="features-list">
                <li>✓ Unlimited formats</li>
                <li>✓ All export formats</li>
                <li>✓ 20+ premium templates</li>
                <li>✓ Priority support</li>
                <li>✓ No watermarks</li>
                <li>✓ Advanced customization</li>
              </ul>
              <Link to="/pricing" className="btn btn-primary btn-block">
                Start Pro Trial
              </Link>
            </div>

            <div className="pricing-card">
              <h3>Enterprise</h3>
              <div className="price">$99<span>/month</span></div>
              <ul className="features-list">
                <li>✓ Everything in Pro</li>
                <li>✓ Team accounts (10 users)</li>
                <li>✓ API access</li>
                <li>✓ White label option</li>
                <li>✓ Dedicated support</li>
              </ul>
              <Link to="/pricing" className="btn btn-outline btn-block">
                Contact Sales
              </Link>
            </div>
          </div>

          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/pricing" className="text-link">
              View full pricing details →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (Placeholder - replace with real testimonials later) */}
      <section className="section testimonials">
        <div className="container">
          <h2 className="section-title text-center">Authors Love PhoenixForge</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="quote">
                "Formatted my 80,000-word novel in 3 minutes. Would have taken me days manually.
                The AI detected all my chapters perfectly."
              </p>
              <p className="author">- Sarah M., Romance Author</p>
            </div>

            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="quote">
                "As someone who publishes 10+ books a year, this saves me hours every week.
                The quality is as good as hiring a professional formatter."
              </p>
              <p className="author">- James K., Thriller Author</p>
            </div>

            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="quote">
                "Game changer for self-publishers. I formatted my entire series in one afternoon.
                The export files work perfectly on Kindle and IngramSpark."
              </p>
              <p className="author">- Maria L., Fantasy Author</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <div className="container">
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>What file formats do you support?</h3>
              <p>
                We support .docx (Word), .pdf (PDF), and .txt (plain text) files.
                Most authors use Word documents.
              </p>
            </div>

            <div className="faq-item">
              <h3>How long does formatting take?</h3>
              <p>
                Most books are formatted in 2-5 minutes, depending on length.
                You'll see real-time progress as the AI works.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I customize the formatting?</h3>
              <p>
                Yes! You can adjust fonts, spacing, margins, chapter headings, and more.
                Start with a template, then customize to your preferences.
              </p>
            </div>

            <div className="faq-item">
              <h3>Are the files ready to publish?</h3>
              <p>
                Absolutely. Our PDFs are print-ready for KDP and IngramSpark.
                EPUB files work on all major ebook platforms.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do I keep the rights to my book?</h3>
              <p>
                100% yes. You own all rights to your book. We're just a formatting tool.
                Download your files and publish wherever you want.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I try it for free?</h3>
              <p>
                Yes! Every account gets 1 free format per month. No credit card required.
                Sign up and format your first book in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section final-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Format Your Book?</h2>
            <p>Join hundreds of authors who trust PhoenixForge for professional book formatting.</p>
            <div className="hero-buttons">
              <SignedOut>
                <Link to="/sign-up" className="btn btn-primary btn-large">
                  Get Started Free
                </Link>
                <Link to="/pricing" className="btn btn-secondary btn-large">
                  View Pricing
                </Link>
              </SignedOut>
              <SignedIn>
                <Link to="/formatter" className="btn btn-primary btn-large">
                  Format Your Book →
                </Link>
              </SignedIn>
            </div>
            <p className="small-text">No credit card required • 1 free format per month • Cancel anytime</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
