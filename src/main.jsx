import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { preloadCriticalImages } from './utils/imageOptimization';

// Enhanced error handling for image preloading
const initializeApp = async () => {
  try {
    await preloadCriticalImages();
    console.log('Critical images preloaded successfully');
  } catch (error) {
    console.error('Error preloading critical images:', error);
    // Continue loading the app even if image preloading fails
  }
};

// Initialize the app
initializeApp().catch(console.error);

// Enhanced Service Worker registration with better error handling
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
        
        // Handle SW updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available
              const shouldRefresh = window.confirm(
                'New content is available! Would you like to refresh to see the latest version?'
              );
              if (shouldRefresh) {
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

// Enhanced performance monitoring
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
        .catch(error => {
          console.error('Error loading web-vitals:', error);
        });
    }
  };
  
  // Report performance metrics
  reportWebVitals(metric => {
    // Log performance metrics
    console.log(metric);
    
    // You can also send these metrics to your analytics service
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.value),
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
      });
    }
  });
}

// Create root with error boundary
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);