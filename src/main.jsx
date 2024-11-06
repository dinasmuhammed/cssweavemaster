import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { preloadCriticalImages } from './utils/imageOptimization';

// Preload critical images
preloadCriticalImages().catch(console.error);

// Register Service Worker with better error handling
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
        
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show refresh prompt to user
              if (window.confirm('New content is available! Would you like to refresh?')) {
                window.location.reload();
              }
            }
          });
        });
      })
      .catch(error => {
        console.error('SW registration failed:', error);
      });
  });
}

// Add performance monitoring with error boundaries
if (process.env.NODE_ENV === 'production') {
  const reportWebVitals = onPerfEntry => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      import('web-vitals')
        .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          getCLS(onPerfEntry);
          getFID(onPerfEntry);
          getFCP(onPerfEntry);
          getLCP(onPerfEntry);
          getTTFB(onPerfEntry);
        })
        .catch(console.error);
    }
  };
  
  reportWebVitals(console.log);
}

// Create root with error handling
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);