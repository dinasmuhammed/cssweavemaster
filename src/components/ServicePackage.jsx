import React from 'react';
import { motion } from 'framer-motion';
import BookingRequestForm from './BookingRequestForm';

const ServicePackage = ({ title, details, images, isReversed }) => {
  return (
    <motion.div 
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 mb-16 items-center`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full lg:w-1/2">
        <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">{title}</h3>
        <ul className="list-disc list-inside mb-6 space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="text-gray-700">{detail}</li>
          ))}
        </ul>
        <BookingRequestForm />
      </div>
      
      <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${title} design ${index + 1}`}
            className="w-full h-auto rounded-lg shadow-md"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ServicePackage;