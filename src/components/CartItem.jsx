import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  const handleDelete = () => {
    removeFromCart(item.id);
    toast.success(`${item.name} removed from cart`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 py-6 border-b">
      <div className="w-full sm:w-24 h-24 relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full sm:w-24 h-24 object-cover rounded" 
        />
      </div>
      <div className="flex-grow w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
            {item?.weight && <span className="text-sm text-gray-500">{item.weight}g</span>}
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-lg font-medium">₹{item.price * item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <button 
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 touch-manipulation"
          >
            -
          </button>
          <span className="text-lg w-6 text-center">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 touch-manipulation"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;