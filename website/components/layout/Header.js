/**
 * HEADER COMPONENT
 *
 * The navigation bar that appears at the top of every page.
 *
 * CONCEPTS LEARNED:
 * - React Components: Reusable UI pieces
 * - State (useState): Data that can change (like mobile menu open/closed)
 * - Conditional Rendering: Show different things based on conditions
 * - Event Handlers: Respond to user clicks
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  // STATE: Track if mobile menu is open or closed
  // useState returns [currentValue, functionToUpdateValue]
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FUNCTION: Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen); // ! means "opposite of"
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">

          {/* LOGO */}
          <Link to="/" className="logo">
            <h1 className="logo-text">
              <span className="phoenix">Rohimaya</span>
              <span className="peacock">Publishing</span>
            </h1>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="nav-desktop">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/formatter" className="nav-link highlight">
              📚 Formatter
            </Link>
            <Link to="/covers" className="nav-link highlight">
              🎨 Covers
            </Link>
            <Link to="/images" className="nav-link highlight">
              🖼️ Images
            </Link>
            <Link to="/videos" className="nav-link highlight">
              🎬 Videos
            </Link>
            <Link to="/cookbook" className="nav-link highlight">
              🍳 Cookbook
            </Link>
            <Link to="/health-content" className="nav-link highlight">
              🏥 Health
            </Link>
            <Link to="/audiobook" className="nav-link highlight">
              🎙️ Audiobook
            </Link>
            <Link to="/marketing" className="nav-link highlight">
              📢 Marketing
            </Link>
            <Link to="/pricing" className="nav-link">Pricing</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {/* Show hamburger or X based on menu state */}
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* MOBILE NAVIGATION (only shows when mobileMenuOpen is true) */}
        {mobileMenuOpen && (
          <nav className="nav-mobile">
            <Link to="/" className="nav-link-mobile" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/formatter" className="nav-link-mobile highlight" onClick={() => setMobileMenuOpen(false)}>
              📚 Formatter
            </Link>
            <Link to="/covers" className="nav-link-mobile highlight" onClick={() => setMobileMenuOpen(false)}>
              🎨 Covers
            </Link>
            <Link to="/images" className="nav-link-mobile highlight" onClick={() => setMobileMenuOpen(false)}>
              🖼️ Images
            </Link>
            <Link to="/videos" className="nav-link-mobile highlight" onClick={() => setMobileMenuOpen(false)}>
              🎬 Videos
            </Link>
            <Link to="/cookbook" className="nav-link-mobile highlight" onClick={() => setMobileMenuOpen(false)}>
              🍳 Cookbook
            </Link>
            <Link to="/health-content" className="nav-link-mobile highlight" onClick={() => setMobileMenuOpen(false)}>
              🏥 Health
            </Link>
            <Link to="/audiobook" className="nav-link-mobile highlight" onClick={() => setMobileMenuOpen(false)}>
              🎙️ Audiobook
            </Link>
            <Link to="/marketing" className="nav-link-mobile highlight" onClick={() => setMobileMenuOpen(false)}>
              📢 Marketing
            </Link>
            <Link to="/pricing" className="nav-link-mobile" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </Link>
            <Link to="/dashboard" className="nav-link-mobile" onClick={() => setMobileMenuOpen(false)}>
              Dashboard
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
