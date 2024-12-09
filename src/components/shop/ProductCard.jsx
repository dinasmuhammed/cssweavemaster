import React from 'react';
import { ShoppingCart, Heart, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from '../../context/CartContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className="text-green-800 font-bold">₹{product.price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex gap-2 mb-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 text-green-800 border-green-800 hover:bg-green-50"
              >
                <Info className="w-4 h-4" />
                Additional Info
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-green-800 mb-4">
                  {product.name} - Additional Information
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Detailed information about this product and its usage.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <p className="text-gray-700">
                  <strong>Usage Instructions:</strong><br />
                  • Store in a cool, dry place<br />
                  • Keep away from direct sunlight<br />
                  • Best used within 6 months of opening
                </p>
                <p className="text-gray-700">
                  <strong>Ingredients:</strong><br />
                  100% Natural Henna powder, Essential oils, Natural preservatives
                </p>
                <p className="text-gray-700">
                  <strong>Benefits:</strong><br />
                  • Natural and chemical-free<br />
                  • Safe for all skin types<br />
                  • Long-lasting results
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-2">
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
          <Button 
            onClick={handleAddToCart}
            className="flex-1 bg-green-800 hover:bg-green-700 text-white rounded-lg h-12 flex items-center justify-between px-4"
          >
            <span className="text-base font-medium">Add to Bag</span>
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;