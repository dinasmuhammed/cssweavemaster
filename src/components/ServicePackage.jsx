import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import BookingForm from './BookingForm';

const ServicePackage = ({ title, details, images, buttonText, isReversed }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookingClick = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 mb-12 sm:mb-16`}>
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="overflow-hidden"
              style={{
                width: '213px',
                height: '293px',
                margin: '0 auto'
              }}
            >
              <img
                src={image}
                alt={`${title} image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">{title}</h3>
        <ul className="list-disc list-inside mb-6 space-y-2">
          {details.map((detail, index) => (
            <li key={index} className="text-gray-700">{detail}</li>
          ))}
        </ul>
        <Button 
          onClick={handleBookingClick}
          className="bg-[#607973] hover:bg-[#4c615c] text-white w-full sm:w-auto"
        >
          {buttonText}
        </Button>
      </div>

      <BookingForm 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        packageTitle={title}
      />
    </div>
  );
};

export default ServicePackage;