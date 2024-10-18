import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const services = [
  { name: 'Bridal Henna Package', image: 'https://i.postimg.cc/2SGPxtQr/Screenshot-2024-10-13-173602.png', link: '/services#bridal' },
  { name: 'Henna Products', image: 'https://i.postimg.cc/sDddf7fd/Screenshot-2024-10-13-173328.png', link: '/services#products' },
  { name: 'Party Henna', image: 'https://i.postimg.cc/MGXrmpZm/Screenshot-2024-10-13-173745.png', link: '/services#party' },
  { name: 'Workshops', image: 'https://i.postimg.cc/bNxXZrdG/Screenshot-2024-10-13-173523.png', link: '/services#workshops' },
];

const OurServices = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-8 sm:mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <Link key={index} to={service.link} className="text-center group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold">View Details</span>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-green-800 group-hover:text-green-600 transition-colors duration-300">{service.name}</h3>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8 sm:mt-12">
          <Button asChild className="bg-green-800 hover:bg-green-700 text-white">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OurServices;