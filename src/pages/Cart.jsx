import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
import DeliveryForm from '../components/checkout/DeliveryForm';
import { toast } from "sonner";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems = [], removeFromCart, updateQuantity, clearCart } = useCart();
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

  const totalPrice = cartItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) ?? 0;
  const shippingCharge = 0;
  const totalAmount = totalPrice + shippingCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (paymentResponse) => {
    if (clearCart) {
      clearCart();
      toast.success("Order placed successfully!");
      navigate('/');
    }
  };

  if (!cartItems?.length) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
        <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[600px]">
        <div className="bg-white p-8 rounded-lg shadow-sm h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium">Order Summary</h2>
            <p className="text-gray-600">Total Amount Payable: ₹{totalAmount}</p>
          </div>
          
          <div className="divide-y border-y border-gray-100 flex-grow">
            {cartItems.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Total Price</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Shipping Charge</span>
              <span>₹{shippingCharge}</span>
            </div>
            <div className="flex justify-between text-xl font-medium pt-4 border-t">
              <span>Grand Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm h-full flex flex-col">
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