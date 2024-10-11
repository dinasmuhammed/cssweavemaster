import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart } from 'lucide-react';
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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <header className="bg-cream-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="py-2 text-center text-xs sm:text-sm bg-cream-200">
          <span className="font-bold">WE ARE DELIVERING ACROSS INDIA AND INTERNATIONALLY!</span>
        </div>
        <nav className="flex justify-between items-center py-4">
          <div className="flex space-x-6 items-center">
            <Link to="/" className="text-green-800 hover:text-green-700">Home</Link>
            <Link to="/shop" className="text-green-800 hover:text-green-700">Shop</Link>
            <Link to="/services" className="text-green-800 hover:text-green-700">Services</Link>
            <Link to="/workshop" className="text-green-800 hover:text-green-700">Workshop</Link>
            <Link to="/contact" className="text-green-800 hover:text-green-700">Contact us</Link>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-green-800">
            <img src="https://i.postimg.cc/T3N2Cfkz/image.png" alt="Henna by Fathima" className="h-10 sm:h-12 md:h-16 mx-auto object-cover" />
          </div>
          <div className="flex space-x-4 items-center">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-8"
              />
              <Button type="submit" variant="ghost" className="absolute right-0 top-0 h-full">
                <Search className="w-5 h-5 text-green-800" />
              </Button>
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <User className="w-5 h-5 text-green-800 cursor-pointer" />
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
              <Heart className="w-5 h-5 text-green-800 cursor-pointer" />
              {savedItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-green-800 text-xs">{savedItems.length}</Badge>
              )}
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-5 h-5 text-green-800 cursor-pointer" />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-green-800 text-xs">{cartItems.length}</Badge>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;