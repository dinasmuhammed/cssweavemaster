
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Button } from "@/components/ui/button";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  
  // Dummy categories and products (replace with actual data)
  const categories = {
    "henna-cones": {
      name: "Henna Cones",
      products: [
        {
          id: 1,
          name: 'Natural Henna Cones',
          price: 199,
          image: 'https://i.postimg.cc/CKbjSySR/image.png',
          description: 'Handcrafted organic henna cones for beautiful designs'
        },
        {
          id: 3,
          name: 'DIY Henna Kit',
          price: 499,
          image: 'https://i.postimg.cc/44WpJQkQ/image.png',
          description: 'Complete kit for henna application at home'
        }
      ]
    },
    "hair-care": {
      name: "Hair Care",
      products: [
        {
          id: 2,
          name: 'Organic Hair Oil',
          price: 299,
          image: 'https://i.postimg.cc/hjrTQ9Jg/image.png',
          description: 'Natural hair growth and conditioning oil'
        },
        {
          id: 4,
          name: 'Hair Henna Powder',
          price: 249,
          image: 'https://i.postimg.cc/13qFrxgv/image.png',
          description: 'Pure henna powder for natural hair coloring'
        }
      ]
    },
    "essential-oils": {
      name: "Essential Oils",
      products: [
        {
          id: 5,
          name: 'Essential Oils',
          price: 349,
          image: 'https://i.postimg.cc/9MJwQCSQ/image.png',
          description: 'Blend of natural oils for henna mixing'
        }
      ]
    },
    "bridal-kits": {
      name: "Bridal Kits",
      products: [
        {
          id: 6,
          name: 'Bridal Henna Kit',
          price: 999,
          image: 'https://i.postimg.cc/HsfcxSSX/image.png',
          description: 'Premium henna kit for bridal occasions'
        }
      ]
    }
  };
  
  useEffect(() => {
    // If category exists, set products, otherwise redirect to shop
    if (categories[categoryName]) {
      setProducts(categories[categoryName].products);
    } else {
      navigate('/shop');
    }
  }, [categoryName, navigate]);

  if (!categories[categoryName]) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/shop')}
          className="mb-4"
        >
          Back to Shop
        </Button>
        <h1 className="text-2xl font-bold">{categories[categoryName].name}</h1>
      </div>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
