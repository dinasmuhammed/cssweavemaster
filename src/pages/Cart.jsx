import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
import DeliveryForm from '../components/checkout/DeliveryForm';
import { toast } from "sonner";
import { ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setIsProcessing(true);
    clearCart();
    toast.success("Order placed successfully!");
    navigate('/');
    } catch (error) {
      toast.error(error.message || "Failed to process payment");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8 text-center">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button 
          onClick={() => navigate('/shop')}
          className="bg-green-800 hover:bg-green-700"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-sm h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium">Order Summary</h2>
            <p className="text-gray-600">Total Amount: ₹{getCartTotal().toFixed(2)}</p>
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

          <div className="mt-6">
            <Button
              variant="outline"
              onClick={clearCart}
              className="w-full mb-4 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm h-full">
          <DeliveryForm 
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleCheckout}
            isProcessing={isProcessing}
            cartItems={cartItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
