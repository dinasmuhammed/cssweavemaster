import React from 'react';
import { motion } from 'framer-motion';
import BookingRequestForm from './BookingRequestForm';

const ServicePackage = ({ title, details, images, isReversed }) => {
  return (
    <motion.div 
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 sm:gap-8 items-center`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full lg:w-1/2 space-y-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-800">{title}</h3>
        <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
          {details.map((detail, index) => (
            <li key={index} className="text-gray-700">{detail}</li>
          ))}
        </ul>
        <div className="pt-4">
          <BookingRequestForm />
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`${title} design ${index + 1}`}
            className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ServicePackage;