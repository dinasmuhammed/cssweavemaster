import React from 'react';
import { Leaf, Hand, GraduationCap, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: <Leaf className="w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 text-green-800" />,
    title: '100% Organic Products',
    description: 'Handmade, chemical-free henna cones and products.',
  },
  {
    icon: <Hand className="w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 text-green-800" />,
    title: 'Expert Henna Artist',
    description: 'Unique, personalized designs for brides and special occasions.',
  },
  {
    icon: <GraduationCap className="w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 text-green-800" />,
    title: 'Henna Workshops',
    description: 'Tips, tutorials, and care guides to ensure the best henna experience.',
  },
  {
    icon: <ShoppingBag className="w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 text-green-800" />,
    title: 'Easy Online Shopping',
    description: 'Convenient purchase of organic products through online and offline.',
  },
];

const WhyHennaByFathima = () => {
  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-b from-white to-cream-100">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center text-green-800 mb-6 sm:mb-8 md:mb-12"
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
              className="text-center p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border border-cream-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="flex justify-center mb-4 sm:mb-6"
                whileHover={{ 
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
              >
                {reason.icon}
              </motion.div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 text-green-800">{reason.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHennaByFathima;