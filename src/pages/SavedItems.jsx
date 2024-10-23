import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from "sonner";

const SavedItems = () => {
  const { savedItems, moveToCart, removeSavedItem } = useCart();

  const handleMoveToCart = (item) => {
    moveToCart(item);
    toast.success(`${item.name} moved to cart`);
  };

  const handleRemove = (item) => {
    removeSavedItem(item.id);
    toast.success(`${item.name} removed from saved items`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Saved Items</h1>
      
      {savedItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You haven't saved any items yet.</p>
          <Link to="/shop">
            <Button className="bg-green-800 hover:bg-green-700">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="aspect-square mb-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <h3 className="font-semibold mb-2">{item.name}</h3>
              <p className="text-green-800 font-bold mb-4">₹{item.price}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleMoveToCart(item)}
                  className="flex-1 bg-green-800 hover:bg-green-700"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Move to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleRemove(item)}
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedItems;