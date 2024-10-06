import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

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
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const saveForLater = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      setSavedItems((prevSaved) => [...prevSaved, item]);
      removeFromCart(itemId);
    }
  };

  const moveToCart = (itemId) => {
    const item = savedItems.find((item) => item.id === itemId);
    if (item) {
      addToCart(item);
      setSavedItems((prevSaved) => prevSaved.filter((i) => i.id !== itemId));
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
      savedItems 
    }}>
      {children}
    </CartContext.Provider>
  );
};