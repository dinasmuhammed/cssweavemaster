import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster, toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Services from './pages/Services';
import Workshop from './pages/Workshop';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import SavedItems from './pages/SavedItems';
import SearchResults from './pages/SearchResults';
import TermsAndConditions from './pages/TermsAndConditions';
import CancellationAndRefund from './pages/CancellationAndRefund';
import ShippingAndPrivacy from './pages/ShippingAndPrivacy';
import OurHappyClients from './components/OurHappyClients';
import { checkNetworkSpeed } from './utils/networkUtils';

const queryClient = new QueryClient();

const App = () => {
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);
  const [isCheckingNetwork, setIsCheckingNetwork] = useState(true);

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
      <div className="flex items-center justify-center h-screen bg-cream-100">
        <p className="text-green-800 text-xl">Checking network speed...</p>
      </div>
    );
  }

  if (isSlowNetwork) {
    return (
      <div className="flex items-center justify-center h-screen bg-cream-100">
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
          <Toaster />
          <Router>
            <div className="flex flex-col min-h-screen bg-cream-100">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8 w-full max-w-7xl">
                <Routes>
                  <Route path="/" element={<Home />} />
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
                  <Route path="/our-happy-clients" element={<OurHappyClients />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;