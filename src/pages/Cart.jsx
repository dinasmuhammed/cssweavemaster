import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { processPayment } from '../services/paymentProcessingService';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, totalAmount, updateQuantity, removeItem } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

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
        items: cartItems,
        description: `Order for ${cartItems.length} items`
      };

      const customerDetails = {
        // These would typically come from a form or user profile
        name: '',
        email: '',
        mobile: '',
        address: ''
      };

      const result = await processPayment(orderData, customerDetails);
      
      if (!result) {
        toast.error("Payment initialization failed");
        return;
      }

      // Payment successful
      toast.success("Payment processed successfully!");
      navigate('/checkout');
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error("Checkout failed. Please try again.");
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
          
          <div className="mt-6">
            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-[#607973] hover:bg-[#4c615c] text-white"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Proceed to Pay (₹${totalAmount})`
              )}
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
