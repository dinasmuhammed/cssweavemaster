import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Linkedin, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img src="/logo.png" alt="Henna by Fathima Logo" className="h-16" />
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://www.facebook.com/FathimaShamsudheen001" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/hennabyfathima__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://youtu.be/qUKTRihRkkc?si=AlTdujs-lKPpIqbx" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://wa.me/your-whatsapp-number" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
          <nav>
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/shop" className="hover:underline">Shop</Link></li>
              <li><Link to="/services" className="hover:underline">Services</Link></li>
              <li><Link to="/workshop" className="hover:underline">Workshop</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Henna by Fathima. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;