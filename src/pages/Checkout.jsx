import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from "sonner";
import { initializeRazorpayPayment } from '../utils/paymentUtils';
import OrderSummary from '../components/checkout/OrderSummary';
import DeliveryForm from '../components/checkout/DeliveryForm';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const { cartItems, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: ''
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCharge = 0;

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
        totalPrice + shippingCharge,
        formData,
        handlePaymentSuccess,
        handlePaymentError
      );
    } catch (error) {
      handlePaymentError(error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
        <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
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

export default Checkout;