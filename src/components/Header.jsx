import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-green-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Henna by Fathima</Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-cream-100">Home</Link></li>
            <li><Link to="/shop" className="hover:text-cream-100">Shop</Link></li>
            <li><Link to="/services" className="hover:text-cream-100">Services</Link></li>
            <li><Link to="/workshop" className="hover:text-cream-100">Workshop</Link></li>
            <li><Link to="/our-happy-clients" className="hover:text-cream-100">Our Happy Clients</Link></li>
            <li><Link to="/contact" className="hover:text-cream-100">Contact</Link></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="hidden md:flex">
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mr-2"
            />
            <Button type="submit" variant="secondary">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          <Link to="/saved" className="text-white hover:text-cream-100">
            <Heart className="h-6 w-6" />
          </Link>
          <Link to="/cart" className="text-white hover:text-cream-100 relative">
            <ShoppingCart className="h-6 w-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Link to="/" className="w-full">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/shop" className="w-full">Shop</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/services" className="w-full">Services</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/workshop" className="w-full">Workshop</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/our-happy-clients" className="w-full">Our Happy Clients</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/contact" className="w-full">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
