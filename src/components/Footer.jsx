import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>+91 8086647124</p>
            <p>mail@gmail.com</p>
            <p>Henna by Fathima Mehendi Studio</p>
            <p>South Koduvally</p>
            <p>Koduvally, Kozhikode</p>
            <p>Kerala - 673572</p>
          </div>
          {/* Add more footer sections as needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;