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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="text-center">
              <img src={service.image} alt={service.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold">{service.name}</h3>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild className="bg-green-800 hover:bg-green-700 text-white">
            <Link to="/services">View Packages</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OurServices;