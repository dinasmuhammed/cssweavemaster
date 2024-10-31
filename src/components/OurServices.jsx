import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const services = [
  { name: 'Bridal Henna Package', image: 'https://i.postimg.cc/2SGPxtQr/Screenshot-2024-10-13-173602.png' },
  { name: 'Henna Products', image: 'https://i.postimg.cc/sDddf7fd/Screenshot-2024-10-13-173328.png' },
  { name: 'Party Henna', image: 'https://i.postimg.cc/MGXrmpZm/Screenshot-2024-10-13-173745.png' },
  { name: 'Workshops', image: 'https://i.postimg.cc/bNxXZrdG/Screenshot-2024-10-13-173523.png' },
];

const OurServices = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-12 sm:py-16 bg-gradient-to-b from-white via-cream-100 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 tracking-tight">Our Services</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <motion.img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold p-4 text-green-800 tracking-wide group-hover:text-green-700 transition-colors">
                  {service.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            asChild 
            className="bg-green-800 hover:bg-green-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Link to="/services" className="flex items-center gap-2">
              View Packages
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OurServices;