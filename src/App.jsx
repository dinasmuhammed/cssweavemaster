import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from './context/CartContext';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      suspense: true,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

// Optimized lazy loading with prefetch
const lazyLoadWithPrefetch = (importFn, displayName) => {
  const Component = lazy(() => {
    const componentPromise = importFn();
    // Prefetch nested routes and components
    componentPromise.then((module) => {
      Object.values(module).forEach((exported) => {
        if (typeof exported === 'function' && 'preload' in exported) {
          exported.preload();
        }
      });
    });
    return componentPromise;
  });
  Component.displayName = displayName;
  return Component;
};

// Lazy load components with prefetching
const Header = lazyLoadWithPrefetch(() => import('./components/Header'), 'Header');
const Footer = lazyLoadWithPrefetch(() => import('./components/Footer'), 'Footer');
const Home = lazyLoadWithPrefetch(() => import('./pages/Home'), 'Home');
const Shop = lazyLoadWithPrefetch(() => import('./pages/Shop'), 'Shop');
const Services = lazyLoadWithPrefetch(() => import('./pages/Services'), 'Services');
const Workshop = lazyLoadWithPrefetch(() => import('./pages/Workshop'), 'Workshop');
const Contact = lazyLoadWithPrefetch(() => import('./pages/Contact'), 'Contact');
const Cart = lazyLoadWithPrefetch(() => import('./pages/Cart'), 'Cart');
const About = lazyLoadWithPrefetch(() => import('./pages/About'), 'About');
const SavedItems = lazyLoadWithPrefetch(() => import('./pages/SavedItems'), 'SavedItems');
const SearchResults = lazyLoadWithPrefetch(() => import('./pages/SearchResults'), 'SearchResults');
const TermsAndConditions = lazyLoadWithPrefetch(() => import('./pages/TermsAndConditions'), 'TermsAndConditions');
const CancellationAndRefund = lazyLoadWithPrefetch(() => import('./pages/CancellationAndRefund'), 'CancellationAndRefund');
const ShippingAndPrivacy = lazyLoadWithPrefetch(() => import('./pages/ShippingAndPrivacy'), 'ShippingAndPrivacy');

const App = () => {
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
            <Suspense fallback={
              <div className="flex items-center justify-center h-screen bg-white">
                <LoadingSpinner size="large" />
              </div>
            }>
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
            </Suspense>
          </ErrorBoundary>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;