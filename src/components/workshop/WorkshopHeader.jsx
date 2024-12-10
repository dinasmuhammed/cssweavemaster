import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const WorkshopHeader = () => {
  return (
    <motion.div 
      className="text-center py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-6 text-green-800"
        variants={itemVariants}
      >
        Learn the Art of Henna Application – Join Our Workshop Today!
      </motion.h1>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        variants={containerVariants}
      >
        <motion.div variants={imageVariants}>
          <img 
            src="https://i.ibb.co/0Xx1wxn/ba19277a-ac85-4a52-9127-09a7740bd8ed.jpg"
            alt="Workshop session 1"
            className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
        <motion.div variants={imageVariants}>
          <img 
            src="https://i.ibb.co/WzCCtNC/7afa2c62-e1cb-4250-9c81-597cafc6a977.jpg"
            alt="Workshop session 2"
            className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
        <motion.div variants={imageVariants}>
          <img 
            src="https://i.ibb.co/SNhC0ts/6c4e8a57-276d-4b27-8bcb-61b720c781e9.jpg"
            alt="Workshop session 3"
            className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </motion.div>

      <motion.p 
        className="text-lg text-center mb-12 max-w-3xl mx-auto text-gray-700"
        variants={itemVariants}
      >
        Join us for an exciting Mehendi Workshop where you can learn the art of henna applications! 
        Whether you're a beginner or looking to refine your skills, this workshop is perfect for everyone.
      </motion.p>
    </motion.div>
  );
};

export default WorkshopHeader;