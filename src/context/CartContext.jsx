import React, { createContext, useState, useContext } from 'react';
import { toast } from "sonner";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (item) => {
    try {
      setIsLoading(true);
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.id === item.id);
        if (existingItem) {
          toast.success("Item quantity updated in cart");
          return prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        toast.success("Item added to cart");
        return [...prevItems, { ...item, quantity: 1 }];
      });
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.error('Add to cart error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setIsLoading(true);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
      console.error('Remove from cart error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      setIsLoading(true);
      if (newQuantity < 1) {
        throw new Error('Quantity cannot be less than 1');
      }
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
      toast.success("Cart updated");
    } catch (error) {
      toast.error(error.message || "Failed to update quantity");
      console.error('Update quantity error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveForLater = async (item) => {
    try {
      setIsLoading(true);
      setSavedItems((prevItems) => {
        const isItemSaved = prevItems.some((i) => i.id === item.id);
        if (isItemSaved) {
          toast.success("Item removed from saved items");
          return prevItems.filter((i) => i.id !== item.id);
        }
        toast.success("Item saved for later");
        return [...prevItems, item];
      });
    } catch (error) {
      toast.error("Failed to save item");
      console.error('Save for later error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const moveToCart = async (item) => {
    try {
      setIsLoading(true);
      await addToCart(item);
      setSavedItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
      toast.success("Item moved to cart");
    } catch (error) {
      toast.error("Failed to move item to cart");
      console.error('Move to cart error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (error) {
      toast.error("Failed to clear cart");
      console.error('Clear cart error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      saveForLater,
      moveToCart,
      savedItems,
      clearCart,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
};