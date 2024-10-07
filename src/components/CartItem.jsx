import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2, Heart, ShoppingCart, Plus, Minus, Undo2 } from 'lucide-react';

const CartItem = ({ item, isSaved = false, removeFromCart, updateQuantity, saveForLater, moveToCart }) => (
  <div key={item.id} className="flex items-center justify-between border-b pb-4">
    <div className="flex items-center">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
      <div>
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
    <div className="flex items-center">
      {isSaved ? (
        <>
          <Button variant="outline" className="mr-2" onClick={() => moveToCart(item.id)}>
            <ShoppingCart className="w-4 h-4 mr-2" /> Move to Cart
          </Button>
          <Button variant="outline" onClick={() => removeFromCart(item.id)}>
            <Undo2 className="w-4 h-4 mr-2" /> Undo
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline" className="mr-2" onClick={() => saveForLater(item.id)}>
            <Heart className="w-4 h-4 mr-2" /> Save for Later
          </Button>
          <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  </div>
);

export default CartItem;