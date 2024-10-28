import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from 'lucide-react';

const ServicePackage = ({ title, details, images, buttonText, isReversed }) => {
  return (
    <motion.div 
      className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 mb-12 items-center`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full md:w-1/2">
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="grid grid-cols-3 gap-2 p-2">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-square overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={image}
                  alt={`${title} image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <div className="w-full md:w-1/2 space-y-6">
        <motion.h3 
          className="text-2xl sm:text-3xl font-bold text-green-800"
          initial={{ opacity: 0, x: isReversed ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.ul 
          className="space-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {details.map((detail, index) => (
            <motion.li 
              key={index}
              className="flex items-center space-x-3 text-gray-700"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Check className="w-5 h-5 text-green-800 flex-shrink-0" />
              <span>{detail}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {buttonText}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServicePackage;