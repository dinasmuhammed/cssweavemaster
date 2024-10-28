import React from 'react';

const OurHappyStore = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-4">Our Happy Store</h2>
        <p className="text-center text-sm md:text-base mb-8 sm:mb-12 max-w-2xl mx-auto">
          Visit us in-store to experience beautiful henna art on your hands and shop our range of organic henna products.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div className="space-y-4 order-2 md:order-1">
            <h3 className="text-lg sm:text-xl font-bold text-green-800">Henna by Fathima Mehendi Studio</h3>
            <address className="not-italic space-y-2 text-sm md:text-base">
              <p>South Koduvally</p>
              <p>Koduvally, Kozhikode</p>
              <p>Kerala - 673572</p>
              <p className="font-semibold mt-4">Phone: <a href="tel:+918086647124" className="text-green-800 hover:underline">+91 8086647124</a></p>
            </address>
          </div>
          <div 
            className="order-1 md:order-2 flex-shrink-0"
            style={{
              width: '721px',
              height: '524px',
              marginTop: '3477px',
              marginLeft: '479px',
              gap: '0px',
              opacity: 0,
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/qUKTRihRkkc?autoplay=1&mute=1&loop=1&playlist=qUKTRihRkkc"
              className="w-full h-full rounded-lg shadow-md"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurHappyStore;