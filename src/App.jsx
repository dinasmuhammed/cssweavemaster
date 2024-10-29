import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from './context/CartContext';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load header and footer for better initial load time
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
const ErrorBoundary = lazy(() => import('./components/ErrorBoundary'));

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Services = lazy(() => import('./pages/Services'));
const Workshop = lazy(() => import('./pages/Workshop'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const About = lazy(() => import('./pages/About'));
const SavedItems = lazy(() => import('./pages/SavedItems'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const CancellationAndRefund = lazy(() => import('./pages/CancellationAndRefund'));
const ShippingAndPrivacy = lazy(() => import('./pages/ShippingAndPrivacy'));

// Configure React Query for better caching and performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical resources
    const preloadResources = async () => {
      const imagesToPreload = [
        'https://i.postimg.cc/T3N2Cfkz/image.png', // Logo
      ];

      await Promise.all([
        ...imagesToPreload.map(src => {
          const img = new Image();
          return new Promise((resolve) => {
            img.onload = img.onerror = resolve;
            img.src = src;
          });
        })
      ]);

      setIsLoading(false);
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
                  <Suspense fallback={
                    <div className="flex items-center justify-center min-h-[60vh]">
                      <LoadingSpinner size="large" />
                    </div>
                  }>
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