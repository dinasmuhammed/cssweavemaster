import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const WelcomeSection = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-cream-100 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-4 font-heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Henna by Fathima!
        </motion.h2>
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-800 mb-6 sm:mb-8 max-w-3xl mx-auto font-sans"
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
          <Button asChild className="bg-green-800 hover:bg-green-700 text-white text-sm sm:text-base md:text-lg px-6 sm:px-8 py-2 sm:py-3 transition-all duration-300 hover:scale-105">
            <Link to="/services">View Packages</Link>
          </Button>
        </motion.div>
      </div>
      <motion.div 
        className="absolute top-0 left-0 w-1/4 h-full"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.img 
          src="https://i.postimg.cc/vBr7WJnv/leaf10-removebg-preview.png" 
          alt="Henna leaves" 
          className="w-full h-full object-contain object-left-top"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      <motion.div 
        className="absolute bottom-0 right-0 w-1/4 h-full transform rotate-180"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.img 
          src="https://i.postimg.cc/vBr7WJnv/leaf10-removebg-preview.png" 
          alt="Henna leaves" 
          className="w-full h-full object-contain object-left-top"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  );
};

export default WelcomeSection;