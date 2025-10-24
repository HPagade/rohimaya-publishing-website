/**
 * ABOUT PAGE
 *
 * Tell your story and connect with readers
 */

import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <section className="page-header">
        <div className="container">
          <h1>About Rohimaya Publishing</h1>
          <p className="tagline">Where Stories Celebrate Culture & Magic</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Rohimaya Publishing was born from a passion for stories that celebrate
                cultural heritage, family traditions, and the magic woven into everyday life.
              </p>
              <p>
                Founded by author Hannah Pagade, we create books that blend cultural authenticity
                with engaging storytelling—from memoir-style cookbooks that share family recipes
                and traditions, to epic fantasy romances featuring diverse characters and rich
                world-building.
              </p>
              <p>
                Our mission is simple: to publish books that make readers feel seen, celebrated,
                and transported to worlds both familiar and fantastical.
              </p>
            </div>

            <div className="author-card">
              <div className="author-photo-placeholder">
                <span>👩‍💼</span>
              </div>
              <h3>Hannah Pagade</h3>
              <p className="author-title">Founder & Author</p>
              <p>
                Writer, developer, and storyteller passionate about blending
                technology with traditional storytelling.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <h2 className="section-title text-center">What We Believe</h2>

          <div className="values-grid">
            <div className="value-card">
              <span className="value-icon">🌍</span>
              <h3>Cultural Celebration</h3>
              <p>
                We honor diverse cultures and traditions through authentic storytelling
                and representation.
              </p>
            </div>

            <div className="value-card">
              <span className="value-icon">✨</span>
              <h3>Magic in Everyday</h3>
              <p>
                We find wonder in family recipes, local traditions, and the
                extraordinary within the ordinary.
              </p>
            </div>

            <div className="value-card">
              <span className="value-icon">💡</span>
              <h3>Innovation</h3>
              <p>
                We embrace technology to enhance storytelling and make publishing
                accessible to more authors.
              </p>
            </div>

            <div className="value-card">
              <span className="value-icon">❤️</span>
              <h3>Community</h3>
              <p>
                We build connections between readers, authors, and the stories
                that bring us together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-box">
            <h2>Let's Connect!</h2>
            <p>
              Have questions? Want to collaborate? We'd love to hear from you.
            </p>
            <div className="contact-methods">
              <a href="mailto:hello@rohimayapublishing.com" className="contact-btn">
                📧 Email Us
              </a>
              <a href="#" className="contact-btn">
                📷 Follow on Instagram
              </a>
              <a href="#" className="contact-btn">
                🐦 Twitter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
