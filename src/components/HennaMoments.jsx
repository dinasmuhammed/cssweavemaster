import React from 'react';
import { motion } from 'framer-motion';

const HennaMoments = () => {
  const images = [
    'https://i.postimg.cc/FsDg0Dcx/Screenshot-2024-10-06-095020.png',
    'https://i.postimg.cc/7Y6TrDGg/Screenshot-2024-10-06-095122.png',
    'https://i.postimg.cc/J0t7vr60/Screenshot-2024-10-06-095141.png',
    'https://i.postimg.cc/rpJ8p07z/Screenshot-2024-10-06-095158.png',
    'https://i.postimg.cc/7hT8Sft3/Screenshot-2024-10-06-095212.png',
    'https://i.postimg.cc/gjRcmSpb/Screenshot-2024-10-06-095258.png',
  ];

  return (
    <section className="py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-4">Henna Moments</h2>
        <p className="text-center mb-8">Follow our instagram page for more @hennabyfathima</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ 
                y: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }
              }}
            >
              <img 
                src={image} 
                alt={`Henna Moment ${index + 1}`} 
                className="w-full h-40 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HennaMoments;