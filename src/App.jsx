import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from './context/CartContext';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Configure React Query with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      suspense: true,
      useErrorBoundary: true,
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      refetchOnReconnect: false,
    },
  },
});

// Enhanced lazy loading with preload hint
const lazyLoadWithRetry = (importFn, componentName) => {
  const LazyComponent = lazy(() => {
    // Add preload hint
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'script';
    preloadLink.href = `/${componentName}.js`;
    document.head.appendChild(preloadLink);

    return importFn().catch((err) => {
      console.error(`Error loading ${componentName}:`, err);
      return importFn(); // Retry once
    });
  });

  return (props) => (
    <Suspense fallback={<LoadingSpinner size="large" />}>
      <ErrorBoundary>
        <LazyComponent {...props} />
      </ErrorBoundary>
    </Suspense>
  );
};

// Lazy load components with descriptive names
const Header = lazyLoadWithRetry(() => import('./components/Header'), 'Header');
const Footer = lazyLoadWithRetry(() => import('./components/Footer'), 'Footer');
const Home = lazyLoadWithRetry(() => import('./pages/Home'), 'Home');
const Shop = lazyLoadWithRetry(() => import('./pages/Shop'), 'Shop');
const Services = lazyLoadWithRetry(() => import('./pages/Services'), 'Services');
const Workshop = lazyLoadWithRetry(() => import('./pages/Workshop'), 'Workshop');
const Contact = lazyLoadWithRetry(() => import('./pages/Contact'), 'Contact');
const Cart = lazyLoadWithRetry(() => import('./pages/Cart'), 'Cart');
const About = lazyLoadWithRetry(() => import('./pages/About'), 'About');
const SavedItems = lazyLoadWithRetry(() => import('./pages/SavedItems'), 'SavedItems');
const SearchResults = lazyLoadWithRetry(() => import('./pages/SearchResults'), 'SearchResults');
const TermsAndConditions = lazyLoadWithRetry(() => import('./pages/TermsAndConditions'), 'TermsAndConditions');
const CancellationAndRefund = lazyLoadWithRetry(() => import('./pages/CancellationAndRefund'), 'CancellationAndRefund');
const ShippingAndPrivacy = lazyLoadWithRetry(() => import('./pages/ShippingAndPrivacy'), 'ShippingAndPrivacy');

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical resources and components
    const preloadCriticalResources = async () => {
      try {
        // Preload critical components
        const criticalComponents = [Header, Footer, Home];
        await Promise.all(
          criticalComponents.map(component => 
            typeof component === 'function' ? component.preload?.() : null
          )
        );
      } catch (error) {
        console.error('Error preloading resources:', error);
      } finally {
        // Ensure minimum loading time to prevent flash
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    preloadCriticalResources();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <LoadingSpinner size="large" />
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
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8 w-full max-w-7xl">
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
                </main>
                <Footer />
              </div>
            </Router>
          </ErrorBoundary>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;