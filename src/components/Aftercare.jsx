import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';

const Aftercare = () => {
  const tips = [
    "Keep the henna on for a minimum of 5 hours. Overnight is ideal.",
    "Keep the henna warm both before and after removal.",
    "Remove the henna without using water. Use a natural oil to help remove stubborn areas.",
    "Avoid water as much as possible for the first 24 hours after removing the paste.",
    "Apply a natural oil or aftercare balm throughout the day to protect your stain."
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-cream-100 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-green-800 animate-pulse" />
        <h2 className="text-3xl font-bold text-green-800 tracking-tight">Aftercare</h2>
        <Sparkles className="w-5 h-5 text-green-800 animate-pulse" />
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-green-700/90 mb-6 italic tracking-wide"
      >
        "To achieve a deep and vibrant Mehendi stain, it's essential to follow these aftercare practices"
      </motion.p>

      <motion.ul className="space-y-4">
        {tips.map((tip, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="flex items-start gap-3 group"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.3 }}
              className="mt-1"
            >
              <Check className="w-5 h-5 text-green-800 flex-shrink-0" />
            </motion.div>
            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
              {tip}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default Aftercare;