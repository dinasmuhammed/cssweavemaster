import React, { createContext, useState, useContext } from 'react';

// Initialize context with default values
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

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const saveForLater = (item) => {
    setSavedItems((prevItems) => {
      const isItemSaved = prevItems.some((i) => i.id === item.id);
      if (isItemSaved) {
        return prevItems.filter((i) => i.id !== item.id);
      }
      return [...prevItems, item];
    });
  };

  const moveToCart = (item) => {
    addToCart(item);
    setSavedItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  const removeSavedItem = (itemId) => {
    setSavedItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
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

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};