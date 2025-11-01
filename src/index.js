/**
 * INDEX.JS - The Entry Point
 *
 * This is where React starts. It:
 * 1. Imports React and ReactDOM libraries
 * 2. Imports our main App component
 * 3. Renders the App into the HTML (the div with id="root")
 *
 * Think of this as the "power button" that starts your application.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';
import App from './App';

// Get Clerk publishable key from environment
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// Get the root element from HTML (see public/index.html)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render our app inside React.StrictMode
// StrictMode helps catch potential problems during development
// ClerkProvider wraps the app to provide authentication
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
