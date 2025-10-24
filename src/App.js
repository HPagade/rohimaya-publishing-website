/**
 * APP.JS - The Main Application Component
 *
 * This is the "brain" of your application. It:
 * 1. Sets up routing (different pages)
 * 2. Manages global state (like shopping cart, user preferences)
 * 3. Renders the layout (header, content, footer)
 *
 * CONCEPTS YOU'LL LEARN:
 * - React Router: Navigate between pages without page reload
 * - Components: Reusable pieces of UI
 * - State Management: How data flows through your app
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import AIFormatterPage from './pages/AIFormatterPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header shows on every page */}
        <Header />

        {/* Routes define which component shows for each URL */}
        <main className="main-content">
          <Routes>
            {/* Homepage - www.yoursite.com/ */}
            <Route path="/" element={<HomePage />} />

            {/* Books page - www.yoursite.com/books */}
            <Route path="/books" element={<BooksPage />} />

            {/* AI Formatter - www.yoursite.com/ai-formatter */}
            <Route path="/ai-formatter" element={<AIFormatterPage />} />

            {/* About page - www.yoursite.com/about */}
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        {/* Footer shows on every page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
