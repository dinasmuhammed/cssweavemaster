import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCart } from '../context/CartContext';
import { toast } from "sonner";

const products = [
  {
    id: 1,
    name: 'Natural Henna Cones',
    price: 199,
    image: 'https://i.postimg.cc/CKbjSySR/image.png',
    description: 'Handcrafted organic henna cones for beautiful designs'
  },
  {
    id: 2,
    name: 'Organic Hair Oil',
    price: 299,
    image: 'https://i.postimg.cc/hjrTQ9Jg/image.png',
    description: 'Natural hair growth and conditioning oil'
  },
  {
    id: 3,
    name: 'DIY Henna Kit',
    price: 499,
    image: 'https://i.postimg.cc/44WpJQkQ/image.png',
    description: 'Complete kit for henna application at home'
  },
  {
    id: 4,
    name: 'Hair Henna Powder',
    price: 249,
    image: 'https://i.postimg.cc/13qFrxgv/image.png',
    description: 'Pure henna powder for natural hair coloring'
  },
  {
    id: 5,
    name: 'Essential Oils',
    price: 349,
    image: 'https://i.postimg.cc/9MJwQCSQ/image.png',
    description: 'Blend of natural oils for henna mixing'
  },
  {
    id: 6,
    name: 'Bridal Henna Kit',
    price: 999,
    image: 'https://i.postimg.cc/HsfcxSSX/image.png',
    description: 'Premium henna kit for bridal occasions'
  },
];

const Shop = () => {
  const { addToCart, saveForLater, savedItems } = useCart();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [location.search]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleSaveForLater = (product) => {
    saveForLater(product);
    toast.success(`${product.name} saved for later`);
  };

  const isItemSaved = (productId) => {
    return savedItems.some(item => item.id === productId);
  };

  return (
    <div className="bg-cream-100">
      <div className="relative">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 h-[300px] sm:h-[400px]">
          <img src="https://i.postimg.cc/CKbjSySR/image.png" alt="Henna Product" className="w-full h-full object-cover" />
          <img src="https://i.postimg.cc/hjrTQ9Jg/image.png" alt="Henna Design" className="w-full h-full object-cover" />
          <img src="https://i.postimg.cc/44WpJQkQ/image.png" alt="Henna Application" className="w-full h-full object-cover" />
          <img src="https://i.postimg.cc/13qFrxgv/image.png" alt="Natural Henna" className="hidden md:block w-full h-full object-cover" />
          <img src="https://i.postimg.cc/9MJwQCSQ/image.png" alt="Henna Cones" className="hidden md:block w-full h-full object-cover" />
          <img src="https://i.postimg.cc/HsfcxSSX/image.png" alt="Bridal Henna" className="hidden md:block w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
            Our Premium Collection
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto font-sans">
            Explore our premium range of organic henna products, crafted with 100% natural ingredients. 
            Each product is designed to give vibrant, long-lasting results, free from chemicals and additives.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
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
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleSaveForLater(product)}
                    className={`w-12 h-12 rounded-lg border-2 border-green-800 ${
                      isItemSaved(product.id) 
                        ? 'bg-green-50' 
                        : 'bg-white hover:bg-green-50'
                    }`}
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        isItemSaved(product.id)
                          ? 'text-green-600 fill-green-600'
                          : 'text-green-800'
                      }`} 
                    />
                  </Button>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-green-800 hover:bg-green-700 text-white rounded-lg h-12 flex items-center justify-between px-4"
                  >
                    <span className="text-base font-medium">Add to Bag</span>
                    <ShoppingCart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;