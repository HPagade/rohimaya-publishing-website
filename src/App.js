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

// App Components (full-screen apps)
import AIFormatter from './components/formatter/AIFormatter';
import CreativeSuite from './components/creative/CreativeSuite';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Routes define which component shows for each URL */}
        <Routes>
          {/* APPS - Full screen, no header/footer */}
          <Route path="/formatter" element={<AIFormatter />} />
          <Route path="/creative" element={<CreativeSuite />} />

          {/* MARKETING SITE - With header/footer */}
          <Route path="/*" element={
            <>
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/books" element={<BooksPage />} />
                  <Route path="/ai-formatter" element={<AIFormatterPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
