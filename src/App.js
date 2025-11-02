/**
 * APP.JS - PhoenixForge Platform (7 Products)
 *
 * PHASED ROLLOUT:
 * Phase 1 (Weeks 1-3): Formatter + Audiobook
 * Phase 2 (Weeks 4-6): Covers + Images
 * Phase 3 (Weeks 7-9): Cookbook + Health + Marketing
 *
 * FEATURES:
 * - Proper Clerk authentication
 * - Protected routes for all products
 * - Unified architecture
 * - Real payment integration ready
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import './App.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import AboutPage from './pages/AboutPage';
import PricingPage from './pages/PricingPage';
import DashboardPage from './pages/DashboardPage';

// Phase 1 Apps (Launch First - Available Now)
import AIFormatter from './components/formatter/AIFormatter';
import AudiobookGenerator from './components/audiobook/AudiobookGenerator';

// Phase 2 Apps (Week 4 - Coming Soon)
import AICovers from './components/covers/AICovers';
import AIImages from './components/images/AIImages';

// Phase 3 Apps (Week 7 - Coming Soon)
import CookbookFormatter from './components/health/CookbookFormatter';
import HealthContent from './components/health/HealthContent';
import MarketingSuite from './components/marketing/MarketingSuite';

// Protected Route Component
function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><RedirectToSignIn /></SignedOut>
    </>
  );
}

function App() {
  // Get Clerk publishable key from environment
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h1>⚙️ Configuration Required</h1>
        <p>Missing Clerk publishable key. Please add REACT_APP_CLERK_PUBLISHABLE_KEY to your .env file.</p>
        <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', textAlign: 'left' }}>
          REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_...
        </pre>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <div className="App">
          <Routes>
            {/* Auth Routes */}
            <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
            <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

            {/* PHASE 1 APPS - Available Now (Full Screen, No Header/Footer) */}
            <Route
              path="/formatter"
              element={
                <ProtectedRoute>
                  <AIFormatter />
                </ProtectedRoute>
              }
            />

            <Route
              path="/audiobook"
              element={
                <ProtectedRoute>
                  <AudiobookGenerator />
                </ProtectedRoute>
              }
            />

            {/* PHASE 2 APPS - Week 4 Launch (Full Screen) */}
            <Route
              path="/covers"
              element={
                <ProtectedRoute>
                  <AICovers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/images"
              element={
                <ProtectedRoute>
                  <AIImages />
                </ProtectedRoute>
              }
            />

            {/* PHASE 3 APPS - Week 7 Launch (Full Screen) */}
            <Route
              path="/cookbook"
              element={
                <ProtectedRoute>
                  <CookbookFormatter />
                </ProtectedRoute>
              }
            />

            <Route
              path="/health-content"
              element={
                <ProtectedRoute>
                  <HealthContent />
                </ProtectedRoute>
              }
            />

            <Route
              path="/marketing"
              element={
                <ProtectedRoute>
                  <MarketingSuite />
                </ProtectedRoute>
              }
            />

            {/* Protected Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Header />
                  <main className="main-content">
                    <DashboardPage />
                  </main>
                  <Footer />
                </ProtectedRoute>
              }
            />

            {/* Public Marketing Site */}
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/books" element={<BooksPage />} />
                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/about" element={<AboutPage />} />

                      {/* Redirect old/removed routes */}
                      <Route path="/ai-formatter" element={<Navigate to="/formatter" replace />} />
                      <Route path="/videos" element={<Navigate to="/pricing" replace />} /> {/* Removed product */}

                      {/* 404 - Redirect to home */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;
