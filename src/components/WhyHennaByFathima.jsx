import React from 'react';
import { Leaf, Hand, GraduationCap, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: <Leaf className="w-8 sm:w-12 h-8 sm:h-12 text-green-800" />,
    title: '100% Organic Products',
    description: 'Handmade, chemical-free henna cones and products.',
  },
  {
    icon: <Hand className="w-8 sm:w-12 h-8 sm:h-12 text-green-800" />,
    title: 'Expert Henna Artist',
    description: 'Unique, personalized designs for brides and special occasions.',
  },
  {
    icon: <GraduationCap className="w-8 sm:w-12 h-8 sm:h-12 text-green-800" />,
    title: 'Henna Workshops',
    description: 'Tips, tutorials, and care guides to ensure the best henna experience.',
  },
  {
    icon: <ShoppingBag className="w-8 sm:w-12 h-8 sm:h-12 text-green-800" />,
    title: 'Easy Online Shopping',
    description: 'Convenient purchase of organic products through online and offline.',
  },
];

const WhyHennaByFathima = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-green-800 mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Henna by Fathima?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {reasons.map((reason, index) => (
            <motion.div 
              key={index} 
              className="text-center p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-cream-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-center mb-3 sm:mb-4">{reason.icon}</div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHennaByFathima;