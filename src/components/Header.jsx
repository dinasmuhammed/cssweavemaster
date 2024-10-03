import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-cream-100">
      <div className="container mx-auto px-4">
        <div className="py-2 text-center text-sm bg-cream-200">
          WE ARE DELIVERING ACROSS INDIA AND INTERNATIONALLY!
        </div>
        <nav className="flex justify-between items-center py-4">
          <div className="text-3xl font-bold text-green-800">
            <img src="/logo.png" alt="Henna by Fathima" className="h-12" />
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-green-800">Home</Link>
            <Link to="/shop" className="hover:text-green-800">Shop</Link>
            <Link to="/services" className="hover:text-green-800">Services</Link>
            <Link to="/workshop" className="hover:text-green-800">Workshop</Link>
            <Link to="/contact" className="hover:text-green-800">Contact us</Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Search className="w-6 h-6 cursor-pointer" />
            <User className="w-6 h-6 cursor-pointer" />
            <Heart className="w-6 h-6 cursor-pointer" />
            <ShoppingCart className="w-6 h-6 cursor-pointer" />
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 py-4">
              <Link to="/" className="hover:text-green-800" onClick={toggleMenu}>Home</Link>
              <Link to="/shop" className="hover:text-green-800" onClick={toggleMenu}>Shop</Link>
              <Link to="/services" className="hover:text-green-800" onClick={toggleMenu}>Services</Link>
              <Link to="/workshop" className="hover:text-green-800" onClick={toggleMenu}>Workshop</Link>
              <Link to="/contact" className="hover:text-green-800" onClick={toggleMenu}>Contact us</Link>
            </div>
            <div className="flex justify-around py-4">
              <Search className="w-6 h-6" />
              <User className="w-6 h-6" />
              <Heart className="w-6 h-6" />
              <ShoppingCart className="w-6 h-6" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;