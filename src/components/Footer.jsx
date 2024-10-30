import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/services", label: "Services" },
    { to: "/workshop", label: "Workshop" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-green-900 text-white py-8 sm:py-12 w-screen relative" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
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
            <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-6">
              <a 
                href="https://www.instagram.com/hennabyfathima__/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src="https://i.ibb.co/TbNcjB9/Vector-2.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
              <a 
                href="https://youtu.be/qUKTRihRkkc?si=AlTdujs-lKPpIqbx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/henna-by-fathima/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/FathimaShamsudheen001" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="text-center lg:text-right">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
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