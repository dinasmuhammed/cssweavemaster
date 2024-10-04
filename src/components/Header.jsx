import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, Menu, X } from 'lucide-react';
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
  const { cartItems, removeFromCart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <header className="bg-cream-100 sticky top-0 z-50">
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
          <div className="hidden md:flex space-x-4 items-center">
            <Search className="w-6 h-6 cursor-pointer" />
            <Link to="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
            <Heart className="w-6 h-6 cursor-pointer" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 cursor-pointer" />
                  <Badge className="absolute -top-2 -right-2 bg-green-800">{cartItems.length}</Badge>
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
                    <Button className="w-full">View Cart</Button>
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
            <div className="flex flex-col space-y-4 py-4">
              <Link to="/" className="hover:text-green-800" onClick={toggleMenu}>Home</Link>
              <Link to="/shop" className="hover:text-green-800" onClick={toggleMenu}>Shop</Link>
              <Link to="/services" className="hover:text-green-800" onClick={toggleMenu}>Services</Link>
              <Link to="/workshop" className="hover:text-green-800" onClick={toggleMenu}>Workshop</Link>
              <Link to="/contact" className="hover:text-green-800" onClick={toggleMenu}>Contact us</Link>
              <Link to="/login" className="hover:text-green-800" onClick={toggleMenu}>Login</Link>
              <Link to="/signup" className="hover:text-green-800" onClick={toggleMenu}>Sign Up</Link>
            </div>
            <div className="flex justify-around py-4">
              <Search className="w-6 h-6" />
              <Heart className="w-6 h-6" />
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6" />
                <Badge className="absolute -top-2 -right-2 bg-green-800">{cartItems.length}</Badge>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;