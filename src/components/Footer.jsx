import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4">Contact</h3>
            <p className="text-sm sm:text-base">+91 8086647124</p>
            <p className="text-sm sm:text-base">info@hennabyfathima.com</p>
            <p className="text-sm sm:text-base">Henna by Fathima Mehendi Studio</p>
            <p className="text-sm sm:text-base">South Koduvally</p>
            <p className="text-sm sm:text-base">Koduvally, Kozhikode</p>
            <p className="text-sm sm:text-base">Kerala - 673572</p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-cream-100 text-sm sm:text-base">Home</Link></li>
              <li><Link to="/shop" className="hover:text-cream-100 text-sm sm:text-base">Shop</Link></li>
              <li><Link to="/services" className="hover:text-cream-100 text-sm sm:text-base">Services</Link></li>
              <li><Link to="/workshop" className="hover:text-cream-100 text-sm sm:text-base">Workshop</Link></li>
              <li><Link to="/contact" className="hover:text-cream-100 text-sm sm:text-base">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-2 text-sm sm:text-base">Subscribe to our newsletter for updates and offers</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 text-green-900 rounded text-sm sm:text-base"
            />
            <button className="mt-2 bg-cream-100 text-green-900 px-4 py-2 rounded hover:bg-cream-200 transition-colors text-sm sm:text-base">
              Subscribe
            </button>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm sm:text-base">&copy; 2023 Henna by Fathima. All rights reserved.</p>
          <p className="mt-2 text-sm sm:text-base">
            Developed & maintained by{' '}
            <a
              href="https://adwebcomicagency.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-cream-100"
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