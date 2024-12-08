import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const services = [
  { 
    name: 'Bridal Henna Package', 
    image: 'https://i.postimg.cc/2SGPxtQr/Screenshot-2024-10-13-173602.png',
    description: 'Exclusive bridal henna designs for your special day',
    link: '/services'
  },
  { 
    name: 'Henna Products', 
    image: 'https://i.ibb.co/r2gjMxV/Whats-App-Image-2024-12-07-at-23-57-57-e16b4952.jpg',
    description: 'Premium quality organic henna products',
    link: '/shop'
  },
  { 
    name: 'Party Henna', 
    image: 'https://i.ibb.co/FBFVzHg/Whats-App-Image-2024-12-07-at-23-54-31-3f69a50b.jpg',
    description: 'Beautiful designs for all occasions',
    link: '/services'
  },
  { 
    name: 'Workshops', 
    image: 'https://i.postimg.cc/bNxXZrdG/Screenshot-2024-10-13-173523.png',
    description: 'Learn the art of henna application',
    link: '/workshop'
  },
];

const OurServices = () => {
  return (
    <section className="py-8 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-center text-[#1B4B40] mb-8 sm:mb-12 md:mb-16">Our Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <Link to={service.link} className="block">
                <div className="relative mb-4 overflow-hidden mx-auto aspect-[213/293] max-w-[213px] cursor-pointer" style={{ width: '213px', height: '293px' }}>
                  <motion.img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <h3 className="text-base sm:text-lg font-serif text-[#1B4B40] mb-2">{service.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            asChild 
            className="bg-[#1B4B40] hover:bg-[#143830] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto"
          >
            <Link to="/services" className="flex items-center justify-center gap-2">
              <span className="text-sm sm:text-base">View Packages</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;
