import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const services = [
  { 
    name: 'Bridal Henna Package', 
    image: 'https://i.postimg.cc/2SGPxtQr/Screenshot-2024-10-13-173602.png',
    description: 'Exclusive bridal henna designs for your special day'
  },
  { 
    name: 'Henna Products', 
    image: 'https://i.postimg.cc/sDddf7fd/Screenshot-2024-10-13-173328.png',
    description: 'Premium quality organic henna products'
  },
  { 
    name: 'Party Henna', 
    image: 'https://i.postimg.cc/MGXrmpZm/Screenshot-2024-10-13-173745.png',
    description: 'Beautiful designs for all occasions'
  },
  { 
    name: 'Workshops', 
    image: 'https://i.postimg.cc/bNxXZrdG/Screenshot-2024-10-13-173523.png',
    description: 'Learn the art of henna application'
  },
];

const OurServices = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-serif text-center text-[#1B4B40] mb-16">Our Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="mb-4 overflow-hidden mx-auto">
                <motion.img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-auto object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h3 className="text-lg font-serif text-[#1B4B40] mb-2">{service.name}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            asChild 
            className="bg-[#1B4B40] hover:bg-[#143830] text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Link to="/services" className="flex items-center gap-2">
              View Packages
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;