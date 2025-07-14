
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "sonner";
import Home from './pages/Home';
import LoadingSpinner from './components/LoadingSpinner';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import CategoryPage from './pages/CategoryPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';

const Checkout = lazy(() => import('./pages/Checkout'));
const Cart = lazy(() => import('./pages/Cart'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <div className="bg-background min-h-screen flex flex-col">
          <Header />
          <Toaster position="top-center" richColors />
          
          <main className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
              </Routes>
            </Suspense>
          </main>
          
          <Footer />
        </div>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
