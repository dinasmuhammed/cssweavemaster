import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const allProducts = [
  { id: 1, name: 'Organic Nail Cones', price: 199, image: 'https://i.postimg.cc/CKbjSySR/image.png', rating: 8.5, category: 'product' },
  { id: 2, name: 'Organic Henna Cones', price: 99, image: 'https://i.postimg.cc/hjrTQ9Jg/image.png', rating: 4.2, category: 'product' },
  { id: 3, name: 'Diy Kit', price: 299, image: 'https://i.postimg.cc/44WpJQkQ/image.png', rating: 4.7, category: 'product' },
  { id: 4, name: 'Hair henna Power', price: 249, image: 'https://i.postimg.cc/13qFrxgv/image.png', rating: 4.3, category: 'product' },
  { id: 5, name: 'Essential Oils', price: 149, image: 'https://i.postimg.cc/9MJwQCSQ/image.png', rating: 4.1, category: 'product' },
  { id: 6, name: 'Bridal Henna Power', price: 999, image: 'https://i.postimg.cc/HsfcxSSX/image.png', rating: 4.8, category: 'product' },
];

const services = [
  { id: 7, name: 'Bridal Henna Package', price: 1999, image: 'https://i.postimg.cc/G3CRLj4/Screenshot-2024-10-04-165522.png', category: 'service' },
  { id: 8, name: 'Party Henna', price: 999, image: 'https://i.postimg.cc/w0YLy9k/Screenshot-2024-10-04-165544.png', category: 'service' },
  { id: 9, name: 'Workshops', price: 499, image: 'https://i.postimg.cc/gmB1zsq/Screenshot-2024-10-04-165552.png', category: 'service' },
];

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');
  const { addToCart } = useCart();

  useEffect(() => {
    const searchItems = (query) => {
      const allItems = [...allProducts, ...services];
      return allItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
    };

    setResults(searchItems(query));
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Search Results for "{query}"</h1>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.category === 'service' ? 'Service' : 'Product'}</CardDescription>
              </CardHeader>
              <CardContent>
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <p className="font-bold mt-2">₹{item.price}</p>
              </CardContent>
              <CardFooter>
                {item.category !== 'service' && (
                  <Button className="w-full flex items-center justify-center" onClick={() => addToCart(item)}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;