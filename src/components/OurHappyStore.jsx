import React from 'react';

const OurHappyStore = () => {
  return (
    <section className="py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-4">Our Happy Store</h2>
        <p className="text-center text-sm md:text-base mb-12 max-w-2xl mx-auto">
          Visit us in-store to experience beautiful henna art on your hands and shop our range of organic henna products.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-800">Henna by Fathima Mehendi Studio</h3>
            <address className="not-italic space-y-1 text-sm md:text-base">
              <p>South Koduvally</p>
              <p>Koduvally, Kozhikode</p>
              <p>Kerala - 673572</p>
              <p className="font-semibold mt-2">Phone: <a href="tel:+918086647124" className="text-green-800 hover:underline">+91 8086647124</a></p>
            </address>
          </div>
          <div className="w-full max-w-[595px] h-[337px] mx-auto">
            <iframe
              src="https://www.youtube.com/embed/qUKTRihRkkc?autoplay=1&mute=1&loop=1&playlist=qUKTRihRkkc"
              className="w-full h-full rounded-lg shadow-md"
              style={{ aspectRatio: '595 / 337' }}
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