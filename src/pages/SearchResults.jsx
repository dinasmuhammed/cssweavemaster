import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');
  const { addToCart } = useCart();

  useEffect(() => {
    // Simulated search function
    const searchProducts = (query) => {
      // This is a mock function. In a real application, you would fetch data from an API or database.
      const allItems = [
        ...allProducts,
        ...services.map(service => ({ ...service, category: 'service' }))
      ];
      return allItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
      );
    };

    setResults(searchProducts(query));
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
                <p>{item.description}</p>
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