import React from 'react';

const services = [
  { name: 'Bridal Henna Package', image: 'https://i.ibb.co/G3CRLj4/Screenshot-2024-10-04-165522.png' },
  { name: 'Henna Products', image: 'https://i.ibb.co/h2fqTRD/Screenshot-2024-10-04-165533.png' },
  { name: 'Party Henna', image: 'https://i.ibb.co/w0YLy9k/Screenshot-2024-10-04-165544.png' },
  { name: 'Workshops', image: 'https://i.ibb.co/gmB1zsq/Screenshot-2024-10-04-165552.png' },
];

const OurServices = () => {
  return (
    <section className="py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center">
              <img src={service.image} alt={service.name} className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold">{service.name}</h3>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-green-800 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition-colors">
            View Packages
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
