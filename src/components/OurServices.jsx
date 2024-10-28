import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const services = [
  { name: 'Bridal Henna Package', image: 'https://i.postimg.cc/2SGPxtQr/Screenshot-2024-10-13-173602.png' },
  { name: 'Henna Products', image: 'https://i.postimg.cc/sDddf7fd/Screenshot-2024-10-13-173328.png' },
  { name: 'Party Henna', image: 'https://i.postimg.cc/MGXrmpZm/Screenshot-2024-10-13-173745.png' },
  { name: 'Workshops', image: 'https://i.postimg.cc/bNxXZrdG/Screenshot-2024-10-13-173523.png' },
];

const OurServices = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 w-screen relative" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-green-800 mb-6 sm:mb-8 md:mb-10">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="text-center rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold p-4">{service.name}</h3>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <Button 
            asChild 
            className="bg-green-800 hover:bg-green-700 text-white text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 transition-all duration-300 hover:scale-105"
          >
            <Link to="/services">View Packages</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OurServices;