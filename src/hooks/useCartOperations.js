import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { toast } from "sonner";

export const useCartOperations = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateTotalPrice = () => {
    try {
      return cartItems.reduce((sum, item) => {
        const itemPrice = parseFloat(item.price);
        const quantity = parseInt(item.quantity);
        
        if (isNaN(itemPrice) || isNaN(quantity)) {
          throw new Error('Invalid price or quantity');
        }
        
        return sum + (itemPrice * quantity);
      }, 0);
    } catch (err) {
      setError('Error calculating total price');
      return 0;
    }
  };

  const handleRemoveItem = async (itemId) => {
    setIsLoading(true);
    try {
      await removeFromCart(itemId);
      toast.success('Item removed from cart');
    } catch (err) {
      setError('Failed to remove item');
      toast.error('Failed to remove item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    setIsLoading(true);
    try {
      if (newQuantity < 1) {
        throw new Error('Quantity cannot be less than 1');
      }
      await updateQuantity(itemId, newQuantity);
    } catch (err) {
      setError('Failed to update quantity');
      toast.error('Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearCart = async () => {
    setIsLoading(true);
    try {
      await clearCart();
      toast.success('Cart cleared');
    } catch (err) {
      setError('Failed to clear cart');
      toast.error('Failed to clear cart');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cartItems,
    isLoading,
    error,
    totalPrice: calculateTotalPrice(),
    handleRemoveItem,
    handleUpdateQuantity,
    handleClearCart,
  };
};