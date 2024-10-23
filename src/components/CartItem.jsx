import React from 'react';
import { Button } from "@/components/ui/button";

const CartItem = ({ item, removeFromCart, updateQuantity }) => (
  <div className="flex items-start gap-4 py-4 border-b last:border-b-0">
    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
    <div className="flex-grow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
          {item?.weight && <span className="text-sm text-gray-500">{item.weight}g</span>}
        </div>
        <span className="font-medium text-rose-600">₹{item.price * item.quantity}</span>
      </div>
      <div className="flex items-center gap-3 mt-3">
        <button 
          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
        >
          -
        </button>
        <span className="text-sm w-4 text-center">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
        >
          +
        </button>
      </div>
    </div>
  </div>
);

export default CartItem;