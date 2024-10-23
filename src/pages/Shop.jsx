import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
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
  const { addToCart } = useCart();
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

  return (
    <div className="bg-cream-100">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://i.postimg.cc/Kj3LYHX1/basic-mehendi.jpg" 
            alt="Shop Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Shop Our Collections</h1>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl">
            Explore our premium range of organic henna products, carefully crafted with natural ingredients for the perfect henna experience.
          </p>
        </div>
      </div>

      {/* Products Grid */}
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
                <Button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-green-800 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;