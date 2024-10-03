import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-cream-100">
      <div className="container mx-auto px-4">
        <div className="py-2 text-center text-sm bg-cream-200">
          WE ARE DELIVERING ACROSS INDIA AND INTERNATIONALLY!
        </div>
        <nav className="flex justify-between items-center py-4">
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-green-800">Home</Link></li>
            <li><Link to="/shop" className="hover:text-green-800">Shop</Link></li>
            <li><Link to="/services" className="hover:text-green-800">Services</Link></li>
            <li><Link to="/workshop" className="hover:text-green-800">Workshop</Link></li>
            <li><Link to="/contact" className="hover:text-green-800">Contact us</Link></li>
          </ul>
          <div className="text-3xl font-bold text-green-800">
            <img src="/logo.png" alt="Henna by Fathima" className="h-12" />
          </div>
          <div className="flex space-x-4">
            <Search className="w-6 h-6" />
            <User className="w-6 h-6" />
            <Heart className="w-6 h-6" />
            <ShoppingCart className="w-6 h-6" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;