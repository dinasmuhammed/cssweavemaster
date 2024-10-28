import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import Tooltip from './Tooltip';

const ProductCard = ({ product }) => {
  const { addToCart, savedItems, saveForLater } = useCart();
  const isSaved = savedItems.some(item => item.id === product.id);

  const handleSaveForLater = () => {
    saveForLater(product);
    toast.success(`${product.name} ${isSaved ? 'removed from' : 'added to'} favorites`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden">
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className="text-green-800 font-bold">₹{product.price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex gap-2">
          <Tooltip content={isSaved ? "Remove from favorites" : "Add to favorites"}>
            <Button 
              variant="outline"
              onClick={handleSaveForLater}
              className={`w-12 h-12 rounded-lg border-2 border-green-800 ${
                isSaved ? 'bg-green-50' : 'bg-white hover:bg-green-50'
              }`}
            >
              <Heart 
                className={`w-5 h-5 ${
                  isSaved ? 'text-green-600 fill-green-600' : 'text-green-800'
                }`} 
                fill={isSaved ? "currentColor" : "none"}
              />
            </Button>
          </Tooltip>
          <Tooltip content="Add to shopping cart">
            <Button 
              onClick={handleAddToCart}
              className="flex-1 bg-green-800 hover:bg-green-700 text-white rounded-lg h-12 flex items-center justify-between px-4"
            >
              <span className="text-base font-medium">Add to Bag</span>
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Tooltip>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;