import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const services = [
  { 
    name: 'Bridal Henna Package', 
    image: 'https://i.postimg.cc/Jn0X0vYG/bridal-henna.jpg',
    description: 'Exquisite henna designs for your special day'
  },
  { 
    name: 'Henna Products', 
    image: 'https://i.postimg.cc/3NQ3sDmY/henna-products.jpg',
    description: 'High-quality henna cones and accessories'
  },
  { 
    name: 'Party Henna', 
    image: 'https://i.postimg.cc/qRFLQ9Bv/party-henna.jpg',
    description: 'Fun and festive designs for all occasions'
  },
  { 
    name: 'Workshops', 
    image: 'https://i.postimg.cc/3JXqPVy1/henna-workshop.jpg',
    description: 'Learn the art of henna application'
  },
];

const OurServices = () => {
  return (
    <section className="py-12 sm:py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8 sm:mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild className="bg-green-800 hover:bg-green-700 text-white">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OurServices;