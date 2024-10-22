import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { cartItems, savedItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [isMenuOpen]);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/services", label: "Services" },
    { to: "/workshop", label: "Workshop" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-cream-100 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="py-2 text-center text-xs sm:text-sm bg-cream-200">
          <span className="font-bold">WE ARE DELIVERING ACROSS INDIA AND INTERNATIONALLY!</span>
        </div>
        <nav className="flex flex-wrap justify-between items-center py-4" aria-label="Main navigation">
          <div className="flex items-center w-full sm:w-auto justify-between">
            <Button variant="ghost" className="sm:hidden mr-2 menu-button" onClick={toggleMenu} aria-expanded={isMenuOpen} aria-controls="mobile-menu">
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </Button>
            <Link to="/" className="text-2xl sm:text-3xl font-bold text-green-800 transition-transform duration-300 hover:scale-105">
              <img src="https://i.postimg.cc/T3N2Cfkz/image.png" alt="Henna by Fathima" className="h-10 sm:h-12 md:h-16 object-cover" />
            </Link>
            <div className="flex sm:hidden">
              <Link to="/saved" className="mr-4 relative" aria-label={`Saved items (${savedItems.length})`}>
                <Heart className="w-5 h-5 text-green-800 transition-colors duration-300 hover:text-green-600" aria-hidden="true" />
                {savedItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-green-800 text-xs">{savedItems.length}</Badge>
                )}
              </Link>
              <Link to="/cart" className="relative" aria-label={`Cart (${cartItems.length} items)`}>
                <ShoppingCart className="w-5 h-5 text-green-800 transition-colors duration-300 hover:text-green-600" aria-hidden="true" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-green-800 text-xs">{cartItems.length}</Badge>
                )}
              </Link>
            </div>
          </div>
          <div id="mobile-menu" className={`mobile-menu w-full sm:flex sm:w-auto flex-col sm:flex-row items-start sm:items-center ${isMenuOpen ? 'block' : 'hidden'} sm:block mt-4 sm:mt-0`}>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block text-green-800 hover:text-green-700 py-2 sm:py-0 sm:mr-6 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="hidden sm:flex items-center mt-4 sm:mt-0">
            <form onSubmit={handleSearch} className="relative mr-4">
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-8 w-full sm:w-auto transition-all duration-300 focus:ring-2 focus:ring-green-500"
                aria-label="Search"
              />
              <Button type="submit" variant="ghost" className="absolute right-0 top-0 h-full transition-colors duration-300 hover:text-green-600" aria-label="Submit search">
                <Search className="w-5 h-5 text-green-800" aria-hidden="true" />
              </Button>
            </form>
            <div className="flex space-x-4">
              <Link to="/saved" className="relative group" aria-label={`Saved items (${savedItems.length})`}>
                <Heart className="w-5 h-5 text-green-800 transition-colors duration-300 group-hover:text-green-600" aria-hidden="true" />
                {savedItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-green-800 text-xs group-hover:bg-green-600 transition-colors duration-300">{savedItems.length}</Badge>
                )}
              </Link>
              <Link to="/cart" className="relative group" aria-label={`Cart (${cartItems.length} items)`}>
                <ShoppingCart className="w-5 h-5 text-green-800 transition-colors duration-300 group-hover:text-green-600" aria-hidden="true" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-green-800 text-xs group-hover:bg-green-600 transition-colors duration-300">{cartItems.length}</Badge>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;