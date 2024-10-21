import React from 'react';

const OurHappyStore = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-4 sm:mb-6">Our Happy Store</h2>
        <p className="text-center text-sm sm:text-base mb-6 sm:mb-8">Visit us in-store to experience beautiful henna art on your hands and shop our range of organic henna products.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="w-full aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/qUKTRihRkkc?autoplay=1&mute=1&loop=1&playlist=qUKTRihRkkc"
              className="w-full h-full rounded-lg shadow-md"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-green-800">Henna by Fathima Mehendi Studio</h3>
            <address className="not-italic text-sm sm:text-base space-y-2">
              <p>South Koduvally</p>
              <p>Koduvally, Kozhikode</p>
              <p>Kerala - 673572</p>
              <p className="font-semibold">Phone: <a href="tel:+918086647124" className="text-green-800 hover:underline">+91 8086647124</a></p>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurHappyStore;