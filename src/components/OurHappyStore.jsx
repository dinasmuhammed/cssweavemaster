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
          <div className="aspect-w-16 aspect-h-9 bg-gray-200">
            {/* Placeholder for video or image */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Video or Image Placeholder
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurHappyStore;