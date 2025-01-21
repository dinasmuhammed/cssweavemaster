import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import LoadingSpinner from './LoadingSpinner';

const CartItem = ({ 
  item, 
  onRemove, 
  onUpdateQuantity, 
  isLoading 
}) => {
  if (!item) return null;

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 py-6 border-b relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <LoadingSpinner size="small" />
        </div>
      )}
      
      <div className="w-full sm:w-24 h-24 relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full sm:w-24 h-24 object-cover rounded" 
          loading="lazy"
        />
      </div>
      
      <div className="flex-grow w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
            {item?.weight && (
              <span className="text-sm text-gray-500">{item.weight}g</span>
            )}
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-lg font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.id)}
              disabled={isLoading}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4">
          <button 
            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
            disabled={isLoading || item.quantity <= 1}
            className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="text-lg w-6 text-center">{item.quantity}</span>
          <button 
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            disabled={isLoading}
            className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;