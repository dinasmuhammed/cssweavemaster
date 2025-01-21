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
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};