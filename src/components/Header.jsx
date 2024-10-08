import React, { useState } from 'react';
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, savedItems } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <header className="bg-cream-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="py-2 text-center text-xs sm:text-sm bg-cream-200 animate-pulse">
          <span className="font-bold">WE ARE DELIVERING ACROSS INDIA AND INTERNATIONALLY!</span>
        </div>
        <nav className="flex justify-between items-center py-4">
          <div className="text-2xl sm:text-3xl font-bold text-green-800">
            <img src="https://i.postimg.cc/T3N2Cfkz/image.png" alt="Henna by Fathima" className="h-12 sm:h-16 mx-auto object-cover" />
          </div>
          <div className="hidden md:flex space-x-4 lg:space-x-6">
            <Link to="/" className="hover:text-green-800 text-sm lg:text-base">Home</Link>
            <Link to="/shop" className="hover:text-green-800 text-sm lg:text-base">Shop</Link>
            <Link to="/services" className="hover:text-green-800 text-sm lg:text-base">Services</Link>
            <Link to="/workshop" className="hover:text-green-800 text-sm lg:text-base">Workshop</Link>
            <Link to="/contact" className="hover:text-green-800 text-sm lg:text-base">Contact us</Link>
          </div>
          <div className="flex space-x-2 lg:space-x-4 items-center">
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 cursor-pointer" />
                  <Badge className="absolute -top-2 -right-2 bg-green-800 text-xs">{cartItems.length}</Badge>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Your Cart</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {cartItems.map((item) => (
                  <DropdownMenuItem key={item.id} className="flex justify-between">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>₹{item.price * item.quantity}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <strong>Total: ₹{totalPrice}</strong>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/cart">
                    <Button className="w-full text-xs lg:text-sm">View Cart</Button>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-2 py-4">
              <Link to="/" className="hover:text-green-800" onClick={toggleMenu}>Home</Link>
              <Link to="/shop" className="hover:text-green-800" onClick={toggleMenu}>Shop</Link>
              <Link to="/services" className="hover:text-green-800" onClick={toggleMenu}>Services</Link>
              <Link to="/workshop" className="hover:text-green-800" onClick={toggleMenu}>Workshop</Link>
              <Link to="/contact" className="hover:text-green-800" onClick={toggleMenu}>Contact us</Link>
              <Link to="/saved" className="hover:text-green-800" onClick={toggleMenu}>Saved Items</Link>
              <Link to="/login" className="hover:text-green-800" onClick={toggleMenu}>Login</Link>
              <Link to="/signup" className="hover:text-green-800" onClick={toggleMenu}>Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;