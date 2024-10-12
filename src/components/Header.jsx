import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  return (
    <header className="bg-cream-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="py-2 text-center text-xs sm:text-sm bg-cream-200">
          <span className="font-bold">WE ARE DELIVERING ACROSS INDIA AND INTERNATIONALLY!</span>
        </div>
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Button variant="ghost" className="md:hidden mr-2 menu-button" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <Link to="/" className="text-2xl sm:text-3xl font-bold text-green-800">
              <img src="https://i.postimg.cc/T3N2Cfkz/image.png" alt="Henna by Fathima" className="h-10 sm:h-12 md:h-16 object-cover" />
            </Link>
          </div>
          <div className={`mobile-menu md:flex flex-col md:flex-row items-start md:items-center absolute md:static left-0 right-0 bg-cream-100 md:bg-transparent ${isMenuOpen ? 'block' : 'hidden'} md:block top-full md:top-auto`}>
            <Link to="/" className="block md:inline-block text-green-800 hover:text-green-700 py-2 md:py-0 px-4 md:px-0 md:mr-6" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="block md:inline-block text-green-800 hover:text-green-700 py-2 md:py-0 px-4 md:px-0 md:mr-6" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link to="/services" className="block md:inline-block text-green-800 hover:text-green-700 py-2 md:py-0 px-4 md:px-0 md:mr-6" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link to="/workshop" className="block md:inline-block text-green-800 hover:text-green-700 py-2 md:py-0 px-4 md:px-0 md:mr-6" onClick={() => setIsMenuOpen(false)}>Workshop</Link>
            <Link to="/contact" className="block md:inline-block text-green-800 hover:text-green-700 py-2 md:py-0 px-4 md:px-0 md:mr-6" onClick={() => setIsMenuOpen(false)}>Contact us</Link>
          </div>
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="relative mr-4 hidden md:block">
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-8 w-full md:w-auto"
              />
              <Button type="submit" variant="ghost" className="absolute right-0 top-0 h-full">
                <Search className="w-5 h-5 text-green-800" />
              </Button>
            </form>
            <div className="flex space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <User className="w-5 h-5 text-green-800 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to="/saved" className="relative" onClick={() => setIsMenuOpen(false)}>
                <Heart className="w-5 h-5 text-green-800 cursor-pointer" />
                {savedItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-green-800 text-xs">{savedItems.length}</Badge>
                )}
              </Link>
              <Link to="/cart" className="relative" onClick={() => setIsMenuOpen(false)}>
                <ShoppingCart className="w-5 h-5 text-green-800 cursor-pointer" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-green-800 text-xs">{cartItems.length}</Badge>
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