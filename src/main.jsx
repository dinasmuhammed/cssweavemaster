import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { preloadCriticalImages } from './utils/imageOptimization';

// Preload critical images
preloadCriticalImages();

// Register Service Worker
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed:', registrationError);
      });
  });
}

// Add performance monitoring
if (process.env.NODE_ENV === 'production') {
  const reportWebVitals = onPerfEntry => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      });
    }
  };
  
  reportWebVitals(console.log);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);