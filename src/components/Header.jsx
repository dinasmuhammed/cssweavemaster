import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Menu, X, User } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationButton from './NotificationButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, savedItems } = useCart();
  const [showCartBadge, setShowCartBadge] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (cartItems.length > 0) {
      setShowCartBadge(true);
      const timer = setTimeout(() => setShowCartBadge(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [cartItems]);

  const CartButton = ({ className = "" }) => (
    <Link to="/cart" className={`flex items-center relative ${className}`}>
      <ShoppingCart className="w-5 h-5" />
      {showCartBadge && cartItems.length > 0 && (
        <Badge className="absolute -top-2 -right-2 bg-green-500 text-white animate-pulse">
          {cartItems.length}
        </Badge>
      )}
    </Link>
  );

  return (
    <header className="bg-cream-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="py-2 text-center text-xs sm:text-sm bg-cream-200 flex items-center justify-center space-x-2">
          <span className="font-bold">WE ARE DELIVERING ACROSS INDIA AND INTERNATIONALLY!</span>
          <NotificationButton 
            message="We deliver our products across India and internationally. Enjoy our services wherever you are!" 
            title="Delivery Information"
          />
        </div>
        <nav className="flex justify-between items-center py-4">
          <div className="text-2xl sm:text-3xl font-bold text-green-800">
            <img src="https://i.postimg.cc/T3N2Cfkz/image.png" alt="Henna by Fathima" className="h-10 sm:h-12 md:h-16 mx-auto object-cover" />
          </div>
          <div className="hidden lg:flex space-x-6">
            <Link to="/" className="hover:text-green-800 text-sm lg:text-base">Home</Link>
            <Link to="/shop" className="hover:text-green-800 text-sm lg:text-base">Shop</Link>
            <Link to="/services" className="hover:text-green-800 text-sm lg:text-base">Services</Link>
            <Link to="/workshop" className="hover:text-green-800 text-sm lg:text-base">Workshop</Link>
            <Link to="/contact" className="hover:text-green-800 text-sm lg:text-base">Contact us</Link>
          </div>
          <div className="flex space-x-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <User className="w-5 h-5 lg:w-6 lg:h-6 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/signup">Sign Up</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/saved" className="relative">
              <Heart className="w-5 h-5 lg:w-6 lg:h-6 cursor-pointer" />
              {savedItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-green-800 text-xs">{savedItems.length}</Badge>
              )}
            </Link>
            <div className="hidden lg:block">
              <CartButton />
            </div>
          </div>
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="flex flex-col space-y-2 py-4">
              <Link to="/" className="hover:text-green-800" onClick={toggleMenu}>Home</Link>
              <Link to="/shop" className="hover:text-green-800" onClick={toggleMenu}>Shop</Link>
              <Link to="/services" className="hover:text-green-800" onClick={toggleMenu}>Services</Link>
              <Link to="/workshop" className="hover:text-green-800" onClick={toggleMenu}>Workshop</Link>
              <Link to="/contact" className="hover:text-green-800" onClick={toggleMenu}>Contact us</Link>
              <Link to="/saved" className="hover:text-green-800" onClick={toggleMenu}>Saved Items</Link>
              <Link to="/login" className="hover:text-green-800" onClick={toggleMenu}>Login</Link>
              <Link to="/signup" className="hover:text-green-800" onClick={toggleMenu}>Sign Up</Link>
              <CartButton className="hover:text-green-800" onClick={toggleMenu} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;