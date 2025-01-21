import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from './context/CartContext';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      suspense: true,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
const Index = lazy(() => import('./pages/Index'));
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
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <div className="flex flex-col min-h-screen bg-white">
                <Suspense fallback={
                  <div className="flex items-center justify-center h-screen bg-white">
                    <LoadingSpinner size="large" />
                  </div>
                }>
                  <Header />
                  <main className="flex-grow container mx-auto px-4 py-8 w-full max-w-7xl">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/home" element={<Home />} />
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
                </Suspense>
                <WhatsAppWidget 
                  phoneNumber="+918086647124"
                  companyName="Henna by Fathima"
                  message="Hello! How can we help you?"
                  className="!bottom-20 sm:!bottom-4"
                />
              </div>
            </Router>
          </ErrorBoundary>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
