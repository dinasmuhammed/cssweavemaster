import React from 'react';

const OurHappyStore = () => {
  return (
    <section className="py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Our Happy Store</h2>
        <p className="text-center text-lg mb-8">Visit us in-store to experience beautiful henna art on your hands and shop our range of organic henna products.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <iframe
              src="https://www.youtube.com/embed/qUKTRihRkkc?autoplay=1&mute=1&loop=1&playlist=qUKTRihRkkc"
              className="w-full h-64 object-cover rounded-lg"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Henna by Fathima Mehendi Studio</h3>
            <p>South Koduvally</p>
            <p>Koduvally, Kozhikode</p>
            <p>Kerala - 673572</p>
            <p>+91 8086647124</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurHappyStore;