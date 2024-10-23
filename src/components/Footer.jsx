import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/services", label: "Services" },
    { to: "/workshop", label: "Workshop" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-green-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="text-center sm:text-left">
            <img 
              src="https://i.ibb.co/sVtqVMp/Logo-White.png" 
              alt="Henna by Fathima Logo" 
              className="h-12 mx-auto sm:mx-0 mb-4"
            />
            <p className="text-sm opacity-80 max-w-xs mx-auto sm:mx-0">
              Creating beautiful henna designs for all your special occasions
            </p>
          </div>
          
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-6">
              <a 
                href="https://www.instagram.com/hennabyfathima__/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://youtu.be/qUKTRihRkkc?si=AlTdujs-lKPpIqbx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://www.facebook.com/FathimaShamsudheen001" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="text-center lg:text-right">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link 
                      to={item.to} 
                      className="hover:text-green-300 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-t border-green-800 pt-6 text-center text-sm">
          <p>&copy; 2024 copyright - Henna by Fathima</p>
          <p className="mt-2">
            Developed and maintained by{' '}
            <a 
              href="https://adwebcomicagency.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline hover:text-green-300 transition-colors"
            >
              AD Web Comic Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;