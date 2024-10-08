import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const SavedItems = () => {
  const { savedItems, moveToCart, removeFromCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6">Saved Items</h1>
      {savedItems.length === 0 ? (
        <p>You have no saved items.</p>
      ) : (
        <div className="space-y-4">
          {savedItems.map((item) => (
            <CartItem 
              key={item.id} 
              item={item} 
              isSaved={true} 
              moveToCart={moveToCart} 
              removeFromCart={removeFromCart} 
            />
          ))}
        </div>
      )}
      <div className="mt-8">
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default SavedItems;