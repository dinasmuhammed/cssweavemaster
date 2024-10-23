import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/shop/ProductCard';
import ShopHeader from '../components/shop/ShopHeader';

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

const headerImages = [
  "https://i.postimg.cc/CKbjSySR/image.png",
  "https://i.postimg.cc/hjrTQ9Jg/image.png",
  "https://i.postimg.cc/44WpJQkQ/image.png",
  "https://i.postimg.cc/13qFrxgv/image.png",
  "https://i.postimg.cc/9MJwQCSQ/image.png",
  "https://i.postimg.cc/HsfcxSSX/image.png"
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

  const isItemSaved = (productId) => {
    return savedItems.some(item => item.id === productId);
  };

  return (
    <div className="bg-cream-100">
      <ShopHeader images={headerImages} />

      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">Our Premium Collection</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Explore our premium range of organic henna products, crafted with 100% natural ingredients. 
          Each product is designed to give vibrant, long-lasting results, free from chemicals and additives.
        </p>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onSaveForLater={saveForLater}
              isSaved={isItemSaved(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
