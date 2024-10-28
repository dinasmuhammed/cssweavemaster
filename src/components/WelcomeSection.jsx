import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const WelcomeSection = () => {
  return (
    <section className="py-16 md:py-24 bg-cream-100">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Henna by Fathima
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-green-800/80 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Let us adorn you with beautiful bridal henna that makes your special moments unforgettable.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            asChild 
            className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 text-lg"
          >
            <Link to="/services">View Packages</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;