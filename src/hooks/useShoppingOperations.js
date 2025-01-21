import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from "sonner";

export const useShoppingOperations = () => {
  const { 
    cartItems, 
    savedItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    saveForLater, 
    clearCart 
  } = useCart();
  
  const [isLoading, setIsLoading] = useState(false);
  const [activeOperation, setActiveOperation] = useState(null);

  const calculateTotalPrice = () => {
    try {
      return cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price);
        const quantity = parseInt(item.quantity);
        
        if (isNaN(itemPrice) || isNaN(quantity)) {
          throw new Error('Invalid price or quantity');
        }
        
        return total + (itemPrice * quantity);
      }, 0);
    } catch (error) {
      console.error('Error calculating total:', error);
      toast.error('Error calculating total price');
      return 0;
    }
  };

  const handleAddToCart = async (item) => {
    setIsLoading(true);
    setActiveOperation(item.id);
    try {
      await addToCart(item);
      toast.success(`${item.name} added to cart`);
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsLoading(false);
      setActiveOperation(null);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    setIsLoading(true);
    setActiveOperation(itemId);
    try {
      await removeFromCart(itemId);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Remove from cart error:', error);
      toast.error('Failed to remove item');
    } finally {
      setIsLoading(false);
      setActiveOperation(null);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      toast.error('Quantity cannot be less than 1');
      return;
    }
    
    setIsLoading(true);
    setActiveOperation(itemId);
    try {
      await updateQuantity(itemId, newQuantity);
      toast.success('Cart updated');
    } catch (error) {
      console.error('Update quantity error:', error);
      toast.error('Failed to update quantity');
    } finally {
      setIsLoading(false);
      setActiveOperation(null);
    }
  };

  const handleSaveForLater = async (item) => {
    setIsLoading(true);
    setActiveOperation(item.id);
    try {
      await saveForLater(item);
      const isSaved = savedItems.some(savedItem => savedItem.id === item.id);
      toast.success(`${item.name} ${isSaved ? 'removed from' : 'added to'} favorites`);
    } catch (error) {
      console.error('Save for later error:', error);
      toast.error('Failed to update favorites');
    } finally {
      setIsLoading(false);
      setActiveOperation(null);
    }
  };

  return {
    cartItems,
    savedItems,
    isLoading,
    activeOperation,
    totalPrice: calculateTotalPrice(),
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleSaveForLater,
    clearCart
  };
};