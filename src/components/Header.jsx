import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { cartItems, savedItems } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/services", label: "Services" },
    { to: "/workshop", label: "Workshop" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 w-full ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="w-full">
        <div className="w-full py-2 text-center text-xs sm:text-sm" style={{ backgroundColor: '#FCEBD0' }}>
          <span className="font-bold">WE ARE DELIVERING ACROSS INDIA AND INTERNATIONALLY!</span>
        </div>
        
        <nav className="container mx-auto px-4 flex items-center justify-between py-4" aria-label="Main navigation">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block text-lg font-medium text-green-800 hover:text-green-700 py-2 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex-shrink-0">
            <img 
              src="https://i.postimg.cc/T3N2Cfkz/image.png" 
              alt="Henna by Fathima" 
              className="h-10 sm:h-12 md:h-16 object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-green-800 hover:text-green-700 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[200px] lg:w-[300px]"
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <Link to="/saved" className="relative group">
              <Heart className="h-6 w-6 text-green-800 transition-colors group-hover:text-green-600" />
              {savedItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-green-800 group-hover:bg-green-600">
                  {savedItems.length}
                </Badge>
              )}
            </Link>

            <Link to="/cart" className="relative group">
              <ShoppingCart className="h-6 w-6 text-green-800 transition-colors group-hover:text-green-600" />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-green-800 group-hover:bg-green-600">
                  {cartItems.length}
                </Badge>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
