import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const allProducts = [
  { id: 1, name: 'Organic Nail Cones', price: 199, image: 'https://i.postimg.cc/CKbjSySR/image.png', rating: 8.5, category: 'product' },
  { id: 2, name: 'Organic Henna Cones', price: 99, image: 'https://i.postimg.cc/hjrTQ9Jg/image.png', rating: 4.2, category: 'product' },
  { id: 3, name: 'Diy Kit', price: 299, image: 'https://i.postimg.cc/44WpJQkQ/image.png', rating: 4.7, category: 'product' },
  { id: 4, name: 'Hair henna Power', price: 249, image: 'https://i.postimg.cc/13qFrxgv/image.png', rating: 4.3, category: 'product' },
  { id: 5, name: 'Essential Oils', price: 149, image: 'https://i.postimg.cc/9MJwQCSQ/image.png', rating: 4.1, category: 'product' },
  { id: 6, name: 'Bridal Henna Power', price: 999, image: 'https://i.postimg.cc/HsfcxSSX/image.png', rating: 4.8, category: 'product' },
  { id: 7, name: 'Basic Mehendi Package', price: 1999, image: 'https://i.postimg.cc/Kj3LYHX1/basic-mehendi.jpg', rating: 4.5, category: 'package' },
  { id: 8, name: 'Premium Bridal Mehendi Package', price: 4999, image: 'https://i.postimg.cc/3xZQH8Hv/premium-bridal.jpg', rating: 4.9, category: 'package' },
];

const Shop = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState(allProducts);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(allProducts);
    }
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6">Our Shop</h1>
      <p className="text-sm sm:text-base mb-8">Discover our range of high-quality henna products and mehendi packages for all your needs.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">{product.name}</CardTitle>
              <CardDescription className="text-sm">₹{product.price}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <img src={product.image} alt={product.name} className="w-full h-32 sm:h-40 object-cover rounded-md mb-4" />
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm">{product.rating}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full flex items-center justify-center text-xs sm:text-sm" onClick={() => addToCart(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;