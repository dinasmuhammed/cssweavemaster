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

  const addToCart = (item) => {
    if (!item?.id || !item?.name || !item?.price) {
      toast.error("Invalid product data");
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        toast.success(`Updated ${item.name} quantity in cart`);
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      toast.success(`Added ${item.name} to cart`);
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === itemId);
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.name} from cart`);
      }
      return prevItems.filter((item) => item.id !== itemId);
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const saveForLater = (item) => {
    if (!item?.id) return;

    setSavedItems((prevItems) => {
      const isItemSaved = prevItems.some((i) => i.id === item.id);
      if (isItemSaved) {
        toast.success(`Removed ${item.name} from saved items`);
        return prevItems.filter((i) => i.id !== item.id);
      }
      toast.success(`Saved ${item.name} for later`);
      return [...prevItems, item];
    });
  };

  const moveToCart = (item) => {
    if (!item?.id) return;
    addToCart(item);
    setSavedItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  const removeSavedItem = (itemId) => {
    setSavedItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === itemId);
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.name} from saved items`);
      }
      return prevItems.filter((item) => item.id !== itemId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared successfully");
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      saveForLater,
      moveToCart,
      removeSavedItem,
      savedItems,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};