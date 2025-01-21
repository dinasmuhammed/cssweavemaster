import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import CartItem from '../components/CartItem';
import DeliveryForm from '../components/checkout/DeliveryForm';
import { useCartOperations } from '../hooks/useCartOperations';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from "sonner";

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    isLoading, 
    error, 
    totalPrice,
    handleRemoveItem,
    handleUpdateQuantity,
    handleClearCart 
  } = useCartOperations();

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

  const handleCheckout = async (paymentResponse) => {
    try {
      await handleClearCart();
      toast.success("Order placed successfully!");
      navigate('/');
    } catch (err) {
      toast.error("Failed to process order");
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold mb-4 text-red-600">Error loading cart</h1>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[600px]">
        <div className="bg-white p-8 rounded-lg shadow-sm h-full flex flex-col relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium">Order Summary</h2>
            <p className="text-gray-600">
              Total Amount Payable: ₹{totalPrice.toFixed(2)}
            </p>
          </div>
          
          <div className="divide-y border-y border-gray-100 flex-grow">
            {cartItems.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                onRemove={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
                isLoading={isLoading}
              />
            ))}
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Total Price</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-medium pt-4 border-t">
              <span>Grand Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm h-full flex flex-col">
          <DeliveryForm 
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleCheckout}
            cartItems={cartItems}
            totalAmount={totalPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;