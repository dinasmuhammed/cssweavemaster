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
    console.error('useCart must be used within a CartProvider');
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  const addToCart = (product) => {
    if (!product?.id) {
      console.error('Invalid product:', product);
      toast.error("Unable to add invalid product to cart");
      return;
    }

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
    if (!productId) {
      console.error('Invalid productId:', productId);
      return;
    }

    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      if (newItems.length === prevItems.length) {
        console.warn('Product not found in cart:', productId);
      } else {
        toast.success("Removed from cart");
      }
      return newItems;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (!productId || typeof newQuantity !== 'number' || newQuantity < 1) {
      console.error('Invalid updateQuantity parameters:', { productId, newQuantity });
      return;
    }

    setCartItems(prevItems => {
      const itemExists = prevItems.some(item => item.id === productId);
      if (!itemExists) {
        console.warn('Product not found for quantity update:', productId);
        return prevItems;
      }

      const updatedItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      toast.success("Quantity updated");
      return updatedItems;
    });
  };

  const saveForLater = (product) => {
    if (!product?.id) {
      console.error('Invalid product for save later:', product);
      return;
    }

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
    if (!product?.id) {
      console.error('Invalid product for move to cart:', product);
      return;
    }

    removeSavedItem(product.id);
    addToCart(product);
  };

  const removeSavedItem = (productId) => {
    if (!productId) {
      console.error('Invalid productId for remove saved item:', productId);
      return;
    }

    setSavedItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      if (newItems.length === prevItems.length) {
        console.warn('Product not found in saved items:', productId);
      } else {
        toast.success("Removed from saved items");
      }
      return newItems;
    });
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

export default CartProvider;