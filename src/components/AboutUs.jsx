import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden" style={{ backgroundColor: '#FCEBD033' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-6 sm:mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h2>
        
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="aspect-square md:aspect-auto md:h-[500px] relative rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://i.postimg.cc/wBxJsq1n/image.png" 
                alt="Fathima Shamsudheen" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 md:pl-8 relative space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-green-800">Meet the Artist</h3>
              <h4 className="text-lg sm:text-xl font-semibold text-green-800">
                Fathima Shamsudheen - Owner, Founder & Lead Artist
              </h4>
            </div>
            
            <div className="space-y-4 text-sm sm:text-base text-gray-600">
              <p className="leading-relaxed">
                At Henna by Fathima, we believe that just as everyone deserves a diamond, henna is an essential part of joy and celebration. Our passion lies in adorning hands with rich, deep red designs, symbolizing companionship, new beginnings, and the simple pleasure of henna art.
              </p>
              <p className="leading-relaxed">
                We are dedicated to providing a personalized experience tailored to each of our clients. From high-quality products and exceptional services to hands-on workshops, Henna by Fathima adds a touch of beauty and sweetness to every occasion, ensuring that your special moments are truly unforgettable.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;