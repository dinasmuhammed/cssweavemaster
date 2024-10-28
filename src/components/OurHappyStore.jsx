import React from 'react';

const OurHappyStore = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-4">Our Happy Store</h2>
        <p className="text-center text-base mb-12 max-w-2xl mx-auto text-gray-600">
          Visit us in-store to experience beautiful henna art on your hands and shop our range of organic henna products.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 order-2 md:order-1">
            <h3 className="text-xl font-bold text-green-800">Henna by Fathima Mehendi Studio</h3>
            <address className="not-italic space-y-2 text-base">
              <p>South Koduvally</p>
              <p>Koduvally, Kozhikode</p>
              <p>Kerala - 673572</p>
              <p className="font-semibold mt-4">Phone: <a href="tel:+918086647124" className="text-green-800 hover:underline">+91 8086647124</a></p>
            </address>
          </div>
          <div className="order-1 md:order-2">
            <iframe
              src="https://www.youtube.com/embed/qUKTRihRkkc?autoplay=1&mute=1&loop=1&playlist=qUKTRihRkkc"
              style={{ width: '721px', height: '524px', flexShrink: 0 }}
              className="rounded-lg shadow-md"
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