/**
 * FOOTER COMPONENT
 *
 * The bottom section that appears on every page.
 * Contains links, social media, and copyright info.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">

          {/* COLUMN 1: About */}
          <div className="footer-column">
            <h3 className="footer-heading">Rohimaya Publishing</h3>
            <p className="footer-text">
              Celebrating culture, magic, and the joy of storytelling through
              enchanting cookbooks, fantasy romance, and heartfelt tales.
            </p>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/books" className="footer-link">All Books</Link>
              <Link to="/ai-formatter" className="footer-link">AI Formatter</Link>
              <Link to="/about" className="footer-link">About Us</Link>
            </nav>
          </div>

          {/* COLUMN 3: Connect */}
          <div className="footer-column">
            <h4 className="footer-heading">Connect</h4>
            <div className="social-links">
              {/* Add your actual social media links */}
              <a href="#" className="social-link" aria-label="Instagram">📷 Instagram</a>
              <a href="#" className="social-link" aria-label="Facebook">📘 Facebook</a>
              <a href="#" className="social-link" aria-label="Twitter">🐦 Twitter</a>
              <a href="mailto:hello@rohimayapublishing.com" className="social-link">
                ✉️ Email Us
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Rohimaya Publishing. All rights reserved.</p>
          <p className="footer-tagline">Where Stories Celebrate Culture & Magic ✨</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
