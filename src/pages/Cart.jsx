import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
import DeliveryForm from '../components/checkout/DeliveryForm';
import { toast } from "sonner";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
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
  const totalAmount = totalPrice + shippingCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (paymentResponse) => {
    // Handle successful payment
    clearCart();
    toast.success("Order placed successfully!");
    navigate('/');
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
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <p className="text-sm text-gray-600">Total Amount Payable: ₹{totalPrice + shippingCharge}</p>
          </div>
          
          <div className="divide-y border-y border-gray-100">
            {cartItems.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium mb-3">Have any Coupon Code?</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter the coupon code"
                className="bg-white"
              />
              <Button 
                variant="secondary"
                className="bg-[#f8f3ed] hover:bg-[#f0e9e1] px-6"
              >
                APPLY
              </Button>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Price</span>
              <span className="text-rose-600">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping Charge</span>
              <span className="text-rose-600">₹{shippingCharge}</span>
            </div>
            <div className="flex justify-between font-medium pt-3 border-t">
              <span>Grand Total</span>
              <span className="text-rose-600">₹{totalPrice + shippingCharge}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Delivery Address</h2>
          <DeliveryForm 
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleCheckout}
            cartItems={cartItems}
            totalAmount={totalAmount}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
