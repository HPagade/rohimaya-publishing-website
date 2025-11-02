/**
 * APP.JS - Simplified PhoenixForge AI Formatter
 *
 * FOCUS: One product done right - AI Book Formatter
 * FEATURES:
 * - Proper Clerk authentication
 * - Protected routes for paid features
 * - Simple, clean architecture
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

// AI Formatter App (ONLY PRODUCT IN MVP)
import AIFormatter from './components/formatter/AIFormatter';

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

            {/* Protected App - AI Formatter (Full Screen) */}
            <Route
              path="/formatter"
              element={
                <ProtectedRoute>
                  <AIFormatter />
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

                      {/* Redirect old routes to focused experience */}
                      <Route path="/ai-formatter" element={<Navigate to="/formatter" replace />} />
                      <Route path="/covers" element={<Navigate to="/pricing" replace />} />
                      <Route path="/images" element={<Navigate to="/pricing" replace />} />
                      <Route path="/videos" element={<Navigate to="/pricing" replace />} />
                      <Route path="/cookbook" element={<Navigate to="/pricing" replace />} />
                      <Route path="/health-content" element={<Navigate to="/pricing" replace />} />
                      <Route path="/audiobook" element={<Navigate to="/pricing" replace />} />
                      <Route path="/marketing" element={<Navigate to="/pricing" replace />} />

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
