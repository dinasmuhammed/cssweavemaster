import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  { id: 1, name: 'Natural Henna Powder', price: 199, image: '/henna-powder.jpg' },
  { id: 2, name: 'Ready-to-Use Henna Cone', price: 99, image: '/henna-cone.jpg' },
  { id: 3, name: 'Henna Stencils Set', price: 299, image: '/henna-stencils.jpg' },
  { id: 4, name: 'Organic Henna Oil', price: 249, image: '/henna-oil.jpg' },
  { id: 5, name: 'Henna Applicator Bottle', price: 149, image: '/henna-bottle.jpg' },
  { id: 6, name: 'Bridal Henna Kit', price: 999, image: '/bridal-kit.jpg' },
];

const Shop = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-green-800 mb-6">Our Shop</h1>
      <p className="text-lg mb-8">Discover our range of high-quality henna products for all your needs.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>₹{product.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;