import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: 'Natural Henna Powder', price: 199, image: '/henna-powder.jpg', rating: 4.5 },
  { id: 2, name: 'Ready-to-Use Henna Cone', price: 99, image: '/henna-cone.jpg', rating: 4.2 },
  { id: 3, name: 'Henna Stencils Set', price: 299, image: '/henna-stencils.jpg', rating: 4.7 },
  { id: 4, name: 'Organic Henna Oil', price: 249, image: '/henna-oil.jpg', rating: 4.3 },
  { id: 5, name: 'Henna Applicator Bottle', price: 149, image: '/henna-bottle.jpg', rating: 4.1 },
  { id: 6, name: 'Bridal Henna Kit', price: 999, image: '/bridal-kit.jpg', rating: 4.8 },
];

const Shop = () => {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Our Shop</h1>
      <p className="text-lg mb-8">Discover our range of high-quality henna products for all your needs.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>₹{product.price}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <div className="flex items-center mb-2">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{product.rating}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full flex items-center justify-center" onClick={() => addToCart(product)}>
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