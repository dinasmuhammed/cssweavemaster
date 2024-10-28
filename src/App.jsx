import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

const App = () => {
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);
  const [isCheckingNetwork, setIsCheckingNetwork] = useState(true);
  const [isAdmin] = useState(() => window.location.search.includes('admin=true'));

  useEffect(() => {
    const checkSpeed = async () => {
      try {
        const speed = await checkNetworkSpeed();
        if (speed < 1) {
          setIsSlowNetwork(true);
          toast.error("Your network is slow. The website may not function optimally.", {
            duration: Infinity,
          });
        }
      } catch (error) {
        console.error("Error checking network speed:", error);
      } finally {
        setIsCheckingNetwork(false);
      }
    };

    checkSpeed();

    // Add viewport meta tag for better responsiveness
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = "viewport";
    viewportMeta.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    document.getElementsByTagName('head')[0].appendChild(viewportMeta);
  }, []);

  if (isCheckingNetwork) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-green-800 text-xl">Checking network speed...</p>
      </div>
    );
  }

  if (isSlowNetwork) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Network Issue Detected</h1>
          <p className="text-green-700 mb-4">Your network connection is slow. The website may not function properly.</p>
          <button
            className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
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
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8 w-full max-w-7xl">
                  {isAdmin && <SEOMonitor />}
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
