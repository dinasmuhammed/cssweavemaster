import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="py-12 sm:py-16 bg-cream-100 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-8 sm:mb-12">About Us</h2>
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <div className="w-full md:w-1/2">
            <div className="aspect-square md:aspect-auto md:h-[500px] relative rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://i.postimg.cc/wBxJsq1n/image.png" 
                alt="Fathima Shamsudheen" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-8 relative">
            <motion.img
              src="https://i.ibb.co/VvLNYZZ/leaf.png"
              alt="Decorative leaf"
              className="absolute -right-4 top-0 w-24 h-auto opacity-60"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 0.6, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-green-800">Meet the Artist</h3>
            <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-green-800">Fathima Shamsudheen - Owner, Founder & Lead Artist</h4>
            <div className="space-y-4 text-sm sm:text-base text-gray-600">
              <p>
                At Henna by Fathima, we believe that just as everyone deserves a diamond, henna is an essential part of joy and celebration. Our passion lies in adorning hands with rich, deep red designs, symbolizing companionship, new beginnings, and the simple pleasure of henna art.
              </p>
              <p>
                We are dedicated to providing a personalized experience tailored to each of our clients. From high-quality products and exceptional services to hands-on workshops, Henna by Fathima adds a touch of beauty and sweetness to every occasion, ensuring that your special moments are truly unforgettable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;