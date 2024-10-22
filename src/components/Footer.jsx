import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Linkedin, Facebook, WhatsApp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">Henna by Fathima</h2>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/hennabyfathima__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://youtu.be/qUKTRihRkkc?si=AlTdujs-lKPpIqbx" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/FathimaShamsudheen001" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://wa.me/918086647124" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsApp className="w-6 h-6" />
              </a>
            </div>
          </div>
          <nav>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/workshop" className="hover:underline">Workshop</Link></li>
              <li><Link to="/shop" className="hover:underline">Shop</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/services" className="hover:underline">Services</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 text-center border-t border-green-800 pt-4">
          <p className="text-sm">&copy; 2024 copyright - Hennabyfathima</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;