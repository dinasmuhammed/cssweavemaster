import React from 'react';
import { motion } from 'framer-motion';
import BookingRequestForm from '../BookingRequestForm';

const PackageCard = ({ title, price, features, image }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-green-800 mb-2">{title}</h3>
        <p className="text-2xl font-bold text-green-800 mb-4">{price}</p>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <span className="mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
        
        <BookingRequestForm />
      </div>
    </motion.div>
  );
};

export default PackageCard;