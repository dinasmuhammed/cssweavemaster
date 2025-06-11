
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { initializePayment } from '../services/paymentService';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Calculate total amount
  const totalAmount = cartItems?.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0) || 0;

  const handleCheckout = async () => {
    if (!cartItems?.length) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        orderId: `order_${uuidv4()}`,
        amount: totalAmount,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        description: `Order for ${cartItems.length} items`
      };

      const customerDetails = {
        name: 'Guest Customer',
        email: 'guest@example.com',
        mobile: '',
        address: ''
      };

      const result = await initializePayment(orderData, customerDetails);
      
      if (result?.success) {
        toast.success("Payment completed successfully!");
        clearCart();
        navigate('/order-confirmation', { 
          state: { 
            orderId: result.orderId,
            paymentId: result.paymentId 
          }
        });
      }
      
    } catch (error) {
      console.error('Checkout error:', error);
      if (error.message !== 'Payment cancelled by user') {
        toast.error("Checkout failed. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuantityChange = (itemId, change) => {
    updateQuantity(itemId, change);
  };

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      {cartItems?.length > 0 ? (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-[#607973] hover:bg-[#4c615c] text-white py-3 text-lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                `Proceed to Pay ₹${totalAmount}`
              )}
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <Button 
            onClick={() => navigate('/shop')}
            className="mt-4 bg-[#607973] hover:bg-[#4c615c] text-white"
          >
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
