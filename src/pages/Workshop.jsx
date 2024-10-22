import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const workshopImages = [
  "https://example.com/workshop-image-1.jpg",
  "https://example.com/workshop-image-2.jpg",
  "https://example.com/workshop-image-3.jpg",
  "https://example.com/workshop-image-4.jpg",
  "https://example.com/workshop-image-5.jpg",
];

const Workshop = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-cream-100">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-green-800 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        One day Mehendi Workshop
      </motion.h1>

      <motion.p 
        className="text-lg md:text-xl text-center mb-12 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Join us for an exciting Mehendi Workshop where you can learn the art of henna applications! Whether you're a beginner or looking to refine your skills, this workshop is perfect for everyone.
      </motion.p>

      <div className="flex justify-center items-center mb-16">
        <p className="text-xl mr-4">For more Details</p>
        <Button 
          variant="default" 
          size="lg"
          className="bg-green-800 hover:bg-green-700 text-white"
        >
          Enquire Now
        </Button>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {workshopImages.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt={`Workshop image ${index + 1}`} 
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        ))}
      </motion.div>

      <div className="flex justify-center items-center">
        <p className="text-xl mr-4">Click here for detailed brochure</p>
        <Button 
          variant="outline" 
          size="lg"
          className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white"
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default Workshop;