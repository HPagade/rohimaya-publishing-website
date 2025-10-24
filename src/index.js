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
import './index.css';
import App from './App';

// Get the root element from HTML (see public/index.html)
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render our app inside React.StrictMode
// StrictMode helps catch potential problems during development
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
