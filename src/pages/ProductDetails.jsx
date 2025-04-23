
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from 'lucide-react';
import { toast } from "sonner";
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, savedItems, saveForLater } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Check if the product is saved in favorites
  const isSaved = product ? savedItems.some(item => item.id === product.id) : false;

  // Fetch the product data based on the ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // This is a mock product data fetch
        // In a real app, you would fetch from an API or database
        const products = [
          {
            id: 1,
            name: 'Natural Henna Cones',
            price: 199,
            image: 'https://i.postimg.cc/CKbjSySR/image.png',
            description: 'Handcrafted organic henna cones for beautiful designs',
            details: 'Our natural henna cones are made with the finest henna powder, essential oils, and natural ingredients. Perfect for creating intricate designs that last 1-2 weeks.',
            ingredients: 'Organic henna powder, essential oils, sugar, water, lemon juice',
            usage: 'Apply on clean, dry skin. Leave for 4-6 hours for best results. Seal with lemon sugar mixture for darker stain.'
          },
          {
            id: 2,
            name: 'Organic Hair Oil',
            price: 299,
            image: 'https://i.postimg.cc/hjrTQ9Jg/image.png',
            description: 'Natural hair growth and conditioning oil',
            details: 'Our organic hair oil is formulated with natural ingredients to promote hair growth, reduce hair fall, and add shine to your hair.',
            ingredients: 'Coconut oil, castor oil, amla extract, bhringraj extract, essential oils',
            usage: 'Massage into scalp and hair. Leave for 1-2 hours before washing with mild shampoo.'
          },
          {
            id: 3,
            name: 'DIY Henna Kit',
            price: 499,
            image: 'https://i.postimg.cc/44WpJQkQ/image.png',
            description: 'Complete kit for henna application at home',
            details: 'Everything you need to create beautiful henna designs at home. Kit includes pre-mixed henna paste, applicator bottles, design stencils, and aftercare oil.',
            ingredients: 'Natural henna paste, applicator bottles, design templates, aftercare oil',
            usage: 'Follow the included guide for step-by-step instructions on creating beautiful henna designs.'
          },
          {
            id: 4,
            name: 'Hair Henna Powder',
            price: 249,
            image: 'https://i.postimg.cc/13qFrxgv/image.png',
            description: 'Pure henna powder for natural hair coloring',
            details: 'Our premium hair henna powder gives your hair a natural reddish-brown color while conditioning and strengthening your hair.',
            ingredients: '100% pure and natural henna powder',
            usage: 'Mix with warm water to form a paste. Apply to clean hair and leave for 2-3 hours. Rinse thoroughly.'
          },
          {
            id: 5,
            name: 'Essential Oils',
            price: 349,
            image: 'https://i.postimg.cc/9MJwQCSQ/image.png',
            description: 'Blend of natural oils for henna mixing',
            details: 'This special blend of essential oils helps enhance the color of henna and adds a pleasant fragrance to your henna paste.',
            ingredients: 'Eucalyptus oil, tea tree oil, lavender oil, cajeput oil, clove oil',
            usage: 'Add 5-10 drops to your henna paste before application for better color and aroma.'
          },
          {
            id: 6,
            name: 'Bridal Henna Kit',
            price: 999,
            image: 'https://i.postimg.cc/HsfcxSSX/image.png',
            description: 'Premium henna kit for bridal occasions',
            details: 'Special bridal henna kit with premium quality henna and intricate design templates for your special day.',
            ingredients: 'Premium henna paste, glitter, rhinestones, applicator tips, aftercare balm',
            usage: 'Follow the bridal henna guide included in the kit for stunning bridal mehndi designs.'
          },
        ];
        
        const foundProduct = products.find(p => p.id === parseInt(id));
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          toast.error("Product not found!");
          navigate('/shop');
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Something went wrong. Please try again.");
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate]);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({...product, quantity});
      toast.success(`${product.name} added to cart`);
    }
  };

  const handleSaveForLater = () => {
    if (product) {
      saveForLater(product);
      toast.success(`${product.name} ${isSaved ? 'removed from' : 'added to'} favorites`);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">Product not found</p>
        <Button 
          onClick={() => navigate('/shop')}
          className="mt-4 bg-green-800 hover:bg-green-700"
        >
          Back to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-green-800 text-xl font-bold mb-4">₹{product.price}</p>
          
          <p className="text-gray-600 mb-6">{product.details}</p>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Ingredients:</h3>
            <p className="text-gray-600">{product.ingredients}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">How to Use:</h3>
            <p className="text-gray-600">{product.usage}</p>
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4">Quantity:</span>
            <div className="flex items-center border rounded">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 border-r"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 border-l"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
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
      
      {/* Back to Shop Button */}
      <div className="mt-8 text-center">
        <Button 
          variant="outline"
          onClick={() => navigate('/shop')}
          className="border-green-800 text-green-800"
        >
          Back to Shop
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
