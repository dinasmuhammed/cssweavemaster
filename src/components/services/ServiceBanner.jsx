import React from 'react';
import { motion } from 'framer-motion';

const ServiceBanner = () => {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden">
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        src="https://i.ibb.co/vmcsFYm/IMG-20250115-WA0002.jpg"
        alt="Beautiful Henna Design"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white text-3xl sm:text-4xl lg:text-5xl font-heading text-center px-4"
        >
          Exquisite Henna Artistry
        </motion.h1>
      </div>
    </div>
  );
};

export default ServiceBanner;
