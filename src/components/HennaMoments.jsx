import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HennaMoments = () => {
  const images = [
    'https://i.postimg.cc/FsDg0Dcx/Screenshot-2024-10-06-095020.png',
    'https://i.postimg.cc/7Y6TrDGg/Screenshot-2024-10-06-095122.png',
    'https://i.postimg.cc/J0t7vr60/Screenshot-2024-10-06-095141.png',
    'https://i.postimg.cc/rpJ8p07z/Screenshot-2024-10-06-095158.png',
    'https://i.postimg.cc/7hT8Sft3/Screenshot-2024-10-06-095212.png',
    'https://i.postimg.cc/gjRcmSpb/Screenshot-2024-10-06-095258.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-4">Henna Moments</h2>
        <p className="text-center mb-8">Follow our instagram page for more @hennabyfathima</p>
        <div className="relative h-24 overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              className="absolute top-0 left-0 w-full h-full flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Henna Moment ${index + 1}`}
                  className="h-full w-1/6 object-cover"
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HennaMoments;