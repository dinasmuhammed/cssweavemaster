import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from "sonner";
import { initializeRazorpayPayment } from '../utils/paymentUtils';
import OrderSummary from '../components/checkout/OrderSummary';
import DeliveryAddressForm from '../components/checkout/DeliveryAddressForm';

const Checkout = () => {
  const { cartItems, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [formData, setFormData] = useState({
    address: '',
    area: '',
    country: '',
    state: '',
    district: '',
    mobile: '',
    email: '',
    pincode: ''
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

  const handleApplyCoupon = () => {
    toast.error("Invalid coupon code");
    setCouponCode('');
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;
    
    try {
      await initializeRazorpayPayment(
        { ...formData, items: cartItems },
        totalPrice + shippingCharge,
        formData,
        () => toast.success("Payment successful"),
        (error) => toast.error(error.message)
      );
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    }
  };

  const validateForm = () => {
    const requiredFields = ['address', 'area', 'country', 'state', 'district', 'mobile', 'email', 'pincode'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in ${field.charAt(0).toUpperCase() + field.slice(1)}`);
        return false;
      }
    }
    return true;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <OrderSummary 
            cartItems={cartItems}
            onQuantityChange={handleQuantityChange}
            couponCode={couponCode}
            onCouponChange={(e) => setCouponCode(e.target.value)}
            onApplyCoupon={handleApplyCoupon}
            totalPrice={totalPrice}
            shippingCharge={shippingCharge}
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <DeliveryAddressForm 
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;