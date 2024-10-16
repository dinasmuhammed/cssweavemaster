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
            <p className="text-sm">Phone: <a href="tel:+918086647124" className="hover:underline transition-colors duration-300">+91 8086647124</a></p>
            <p className="text-sm">Email: <a href="mailto:info@hennabyfathima.com" className="hover:underline transition-colors duration-300">info@hennabyfathima.com</a></p>
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
              <li><Link to="/" className="hover:underline text-sm transition-colors duration-300">Home</Link></li>
              <li><Link to="/shop" className="hover:underline text-sm transition-colors duration-300">Shop</Link></li>
              <li><Link to="/services" className="hover:underline text-sm transition-colors duration-300">Services</Link></li>
              <li><Link to="/workshop" className="hover:underline text-sm transition-colors duration-300">Workshop</Link></li>
              <li><Link to="/contact" className="hover:underline text-sm transition-colors duration-300">Contact Us</Link></li>
            </ul>
          </nav>
          <nav className="text-center sm:text-left">
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms-and-conditions" className="hover:underline text-sm transition-colors duration-300">Terms and Conditions</Link></li>
              <li><Link to="/cancellation-and-refund" className="hover:underline text-sm transition-colors duration-300">Cancellation and Refund</Link></li>
              <li><Link to="/shipping-and-privacy" className="hover:underline text-sm transition-colors duration-300">Shipping & Privacy Policy</Link></li>
            </ul>
          </nav>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-cream-100 transition-colors duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-cream-100 transition-colors duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-cream-100 transition-colors duration-300">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
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
              className="underline hover:text-cream-100 transition-colors duration-300"
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