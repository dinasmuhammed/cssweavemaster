import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCharge = 0;
  const totalAmount = totalPrice + shippingCharge;

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    navigate('/checkout');
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
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium">Order Summary</h2>
            <p className="text-gray-600">Total Amount Payable: ₹{totalAmount}</p>
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

          <div className="mt-8">
            <p className="text-lg font-medium mb-4">Have any Coupon Code?</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter the coupon code"
                className="bg-white"
              />
              <Button 
                variant="secondary"
                className="bg-[#607973] hover:bg-[#4c615c] text-white px-8"
              >
                APPLY
              </Button>
            </div>
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

          <Button 
            onClick={handleProceedToCheckout}
            className="w-full mt-8 bg-[#607973] hover:bg-[#4c615c] text-white"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;