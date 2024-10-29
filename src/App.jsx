import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from './context/CartContext';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components with retry mechanism
const lazyLoadWithRetry = (importFn) => {
  return lazy(() => importFn().catch((err) => {
    console.error('Error loading component:', err);
    return importFn(); // Retry once
  }));
};

// Lazy load components
const Header = lazyLoadWithRetry(() => import('./components/Header'));
const Footer = lazyLoadWithRetry(() => import('./components/Footer'));

// Lazy load all pages with retry
const Home = lazyLoadWithRetry(() => import('./pages/Home'));
const Shop = lazyLoadWithRetry(() => import('./pages/Shop'));
const Services = lazyLoadWithRetry(() => import('./pages/Services'));
const Workshop = lazyLoadWithRetry(() => import('./pages/Workshop'));
const Contact = lazyLoadWithRetry(() => import('./pages/Contact'));
const Cart = lazyLoadWithRetry(() => import('./pages/Cart'));
const About = lazyLoadWithRetry(() => import('./pages/About'));
const SavedItems = lazyLoadWithRetry(() => import('./pages/SavedItems'));
const SearchResults = lazyLoadWithRetry(() => import('./pages/SearchResults'));
const TermsAndConditions = lazyLoadWithRetry(() => import('./pages/TermsAndConditions'));
const CancellationAndRefund = lazyLoadWithRetry(() => import('./pages/CancellationAndRefund'));
const ShippingAndPrivacy = lazyLoadWithRetry(() => import('./pages/ShippingAndPrivacy'));

// Configure React Query with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
    },
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    // Preload critical resources
    const preloadResources = async () => {
      try {
        const criticalImages = [
          'https://i.postimg.cc/T3N2Cfkz/image.png', // Logo
        ];

        await Promise.all([
          ...criticalImages.map(src => {
            const img = new Image();
            return new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = src;
            });
          }),
          // Add other critical resources here
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading resources:', error);
        setLoadingError('Failed to load critical resources. Please refresh the page.');
        setIsLoading(false);
      }
    };

    preloadResources();

    // Add viewport meta tag for better responsiveness
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1, maximum-scale=1";
    document.getElementsByTagName('head')[0].appendChild(viewportMeta);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (loadingError) {
    return (
      <div className="flex items-center justify-center h-screen p-4 text-center">
        <div>
          <h1 className="text-xl font-semibold text-red-600 mb-4">{loadingError}</h1>
          <button 
            onClick={() => window.location.reload()}
            className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <ErrorBoundary>
            <Toaster 
              position="top-center"
              toastOptions={{
                style: {
                  background: 'white',
                  color: '#0F4C3A',
                  border: '1px solid #E2E8F0',
                },
                duration: 3000,
              }}
            />
            <Router>
              <div className="flex flex-col min-h-screen bg-white">
                <Suspense fallback={<LoadingSpinner />}>
                  <Header />
                </Suspense>
                <main className="flex-grow container mx-auto px-4 py-8 w-full max-w-7xl">
                  <Suspense 
                    fallback={
                      <div className="flex items-center justify-center min-h-[60vh]">
                        <LoadingSpinner size="large" />
                      </div>
                    }
                  >
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/workshop" element={<Workshop />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/saved" element={<SavedItems />} />
                      <Route path="/search" element={<SearchResults />} />
                      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                      <Route path="/cancellation-and-refund" element={<CancellationAndRefund />} />
                      <Route path="/shipping-and-privacy" element={<ShippingAndPrivacy />} />
                    </Routes>
                  </Suspense>
                </main>
                <Suspense fallback={<LoadingSpinner />}>
                  <Footer />
                </Suspense>
              </div>
            </Router>
          </ErrorBoundary>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;