import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from "sonner";
import { initializeRazorpayPayment } from '../utils/paymentUtils';
import OrderSummary from '../components/checkout/OrderSummary';
import DeliveryForm from '../components/checkout/DeliveryForm';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingBag } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: ''
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCharge = 0;
  const totalAmount = totalPrice + shippingCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(itemId, newQuantity);
    }
  };

  const handlePaymentSuccess = (response) => {
    toast.success("Payment successful! Thank you for your order.");
    clearCart();
    navigate('/');
  };

  const handlePaymentError = (error) => {
    toast.error(error.message || "Payment failed. Please try again.");
    setIsProcessing(false);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      await initializeRazorpayPayment(
        {
          orderId: `ORDER_${Date.now()}`,
          items: cartItems,
          customerDetails: formData
        },
        totalAmount,
        formData,
        handlePaymentSuccess,
        handlePaymentError
      );
    } catch (error) {
      handlePaymentError(error);
    }
  };

  if (!cartItems?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-1 text-sm text-gray-500">
            Start adding some items to your cart and they will appear here
          </p>
          <div className="mt-6">
            <Button 
              onClick={() => navigate('/shop')}
              className="bg-green-800 hover:bg-green-700 text-white"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <OrderSummary 
            cartItems={cartItems}
            onQuantityChange={handleQuantityChange}
            totalPrice={totalPrice}
            shippingCharge={shippingCharge}
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <DeliveryForm 
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleCheckout}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;