import React, { createContext, useState, useContext } from 'react';
import { toast } from "sonner";

const CartContext = createContext({
  cartItems: [],
  savedItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  saveForLater: () => {},
  moveToCart: () => {},
  removeSavedItem: () => {},
  clearCart: () => {},
});

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

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        toast.info("Item already in cart");
        return prevItems;
      }
      toast.success("Added to cart");
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.success("Removed from cart");
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    toast.success("Quantity updated");
  };

  const saveForLater = (product) => {
    removeFromCart(product.id);
    setSavedItems(prevItems => {
      if (prevItems.find(item => item.id === product.id)) {
        toast.info("Item already saved");
        return prevItems;
      }
      toast.success("Saved for later");
      return [...prevItems, product];
    });
  };

  const moveToCart = (product) => {
    removeSavedItem(product.id);
    addToCart(product);
  };

  const removeSavedItem = (productId) => {
    setSavedItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.success("Removed from saved items");
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  const value = {
    cartItems,
    savedItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    saveForLater,
    moveToCart,
    removeSavedItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};