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
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <img src="/logo.png" alt="Henna by Fathima Logo" className="h-12" />
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-center">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a href="https://www.instagram.com/hennabyfathima__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://youtu.be/qUKTRihRkkc?si=AlTdujs-lKPpIqbx" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/FathimaShamsudheen001" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
          <nav className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-center md:text-right">Navigation</h3>
            <ul className="flex flex-col items-center md:items-end space-y-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-green-800 pt-4 text-center">
          <p>&copy; 2024 copyright - Henna by Fathima</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;