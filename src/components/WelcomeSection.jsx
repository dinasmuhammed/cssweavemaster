import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const WelcomeSection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h2 
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to Henna by Fathima
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-primary/80 mb-8 max-w-3xl mx-auto"
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
          <Button asChild className="btn-primary">
            <Link to="/services">View Packages</Link>
          </Button>
        </motion.div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <motion.img 
          src="/images/pattern-left.png" 
          alt="Decorative pattern" 
          className="absolute -left-16 top-0 w-64 opacity-10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.img 
          src="/images/pattern-right.png" 
          alt="Decorative pattern" 
          className="absolute -right-16 bottom-0 w-64 opacity-10"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
};

export default WelcomeSection;