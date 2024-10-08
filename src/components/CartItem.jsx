import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2, Heart, ShoppingCart, Plus, Minus, Undo2 } from 'lucide-react';

const CartItem = ({ item, isSaved = false, removeFromCart, updateQuantity, saveForLater, moveToCart }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4">
    <div className="flex items-center mb-2 sm:mb-0 w-full sm:w-auto">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.name}</h3>
        <p>Price: ₹{item.price}</p>
        {!isSaved && (
          <div className="flex items-center mt-2">
            <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
              <Minus className="w-4 h-4" />
            </Button>
            <span className="mx-2">{item.quantity}</span>
            <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2 sm:mt-0 w-full sm:w-auto">
      {isSaved ? (
        <>
          <Button variant="outline" className="mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto" onClick={() => moveToCart(item.id)}>
            <ShoppingCart className="w-4 h-4 mr-2" /> Move to Cart
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => removeFromCart(item.id)}>
            <Undo2 className="w-4 h-4 mr-2" /> Undo
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" className="mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto" onClick={() => saveForLater(item.id)}>
            <Heart className="w-4 h-4 mr-2" /> Save for Later
          </Button>
          <Button variant="destructive" className="w-full sm:w-auto" onClick={() => removeFromCart(item.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  </div>
);

export default CartItem;