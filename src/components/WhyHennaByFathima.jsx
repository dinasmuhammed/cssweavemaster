import React from 'react';
import { Leaf, Hand, GraduationCap, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: <Leaf className="w-12 h-12 text-[#1B4B40]" />,
    title: '100% Organic Products',
    description: 'Handmade, chemical-free henna cones and products.',
  },
  {
    icon: <Hand className="w-12 h-12 text-[#1B4B40]" />,
    title: 'Expert Henna Artist',
    description: 'Unique, personalized designs for brides and special occasions.',
  },
  {
    icon: <GraduationCap className="w-12 h-12 text-[#1B4B40]" />,
    title: 'Henna Workshops',
    description: 'Tips, tutorials, and care guides to ensure the best henna experience.',
  },
  {
    icon: <ShoppingBag className="w-12 h-12 text-[#1B4B40]" />,
    title: 'Easy Online Shopping',
    description: 'Convenient purchase of organic products through online and offline.',
  },
];

const WhyHennaByFathima = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl sm:text-3xl font-serif text-center text-[#1B4B40] mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Henna by Fathima?
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-6">
                {reason.icon}
              </div>
              <h3 className="text-lg font-serif text-[#1B4B40] mb-2">{reason.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHennaByFathima;