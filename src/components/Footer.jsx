import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-sm">Phone: <a href="tel:+918086647124" className="hover:underline">+91 8086647124</a></p>
            <p className="text-sm">Email: <a href="mailto:info@hennabyfathima.com" className="hover:underline">info@hennabyfathima.com</a></p>
            <address className="text-sm not-italic">
              Henna by Fathima Mehendi Studio<br />
              South Koduvally<br />
              Koduvally, Kozhikode<br />
              Kerala - 673572
            </address>
          </div>
          <nav className="text-center sm:text-left">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline text-sm">Home</Link></li>
              <li><Link to="/shop" className="hover:underline text-sm">Shop</Link></li>
              <li><Link to="/services" className="hover:underline text-sm">Services</Link></li>
              <li><Link to="/workshop" className="hover:underline text-sm">Workshop</Link></li>
              <li><Link to="/contact" className="hover:underline text-sm">Contact Us</Link></li>
            </ul>
          </nav>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="mb-2 text-sm">Subscribe to our newsletter for updates and offers</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-2 text-green-900 rounded text-sm"
                required
              />
              <button type="submit" className="w-full bg-cream-100 text-green-900 px-4 py-2 rounded hover:bg-cream-200 transition-colors text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm">&copy; 2024 Henna by Fathima. All rights reserved.</p>
          <p className="text-sm mt-2">
            Developed and maintained by{' '}
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