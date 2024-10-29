import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setIsMobileSearchOpen(false);
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

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 w-full ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="w-full">
        <div className="w-full py-2 text-center text-xs sm:text-sm" style={{ backgroundColor: '#FCEBD0', fontFamily: 'Jacques Francois' }}>
          <span className="px-2 sm:px-4">WE ARE DELIVERING ACROSS INDIA AND INTERNATIONALLY!</span>
        </div>
        
        <nav className="container mx-auto px-2 sm:px-4 flex items-center justify-between py-2 sm:py-4" aria-label="Main navigation">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`block text-base sm:text-lg font-medium transition-colors ${
                      isActive(item.to)
                        ? 'text-green-600 font-bold'
                        : 'text-green-800 hover:text-green-700'
                    }`}
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
              className="h-6 sm:h-8 md:h-10 lg:h-12 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`transition-colors text-sm xl:text-base ${
                  isActive(item.to)
                    ? 'text-green-600 font-bold'
                    : 'text-green-800 hover:text-green-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {isMobileSearchOpen ? (
              <form onSubmit={handleSearch} className="fixed inset-x-0 top-0 bg-white p-2 sm:p-4 z-50 lg:hidden">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 text-sm"
                    autoFocus
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-0 top-0"
                    onClick={() => setIsMobileSearchOpen(false)}
                  >
                    ×
                  </Button>
                </div>
              </form>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setIsMobileSearchOpen(true)}
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            )}

            <form onSubmit={handleSearch} className="hidden lg:flex relative">
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[180px] xl:w-[250px] text-sm"
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <Link to="/saved" className="relative group p-1 sm:p-2">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-green-800 transition-colors group-hover:text-green-600" />
              {savedItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-800 group-hover:bg-green-600 text-[10px] sm:text-xs min-w-[16px] sm:min-w-[20px] h-4 sm:h-5 flex items-center justify-center">
                  {savedItems.length}
                </Badge>
              )}
            </Link>

            <Link to="/cart" className="relative group p-1 sm:p-2">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-green-800 transition-colors group-hover:text-green-600" />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-800 group-hover:bg-green-600 text-[10px] sm:text-xs min-w-[16px] sm:min-w-[20px] h-4 sm:h-5 flex items-center justify-center">
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