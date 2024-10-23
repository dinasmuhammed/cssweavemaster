import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  
  const images = [
    "https://i.ibb.co/7j9LYMb/de63f2db-8f22-4eae-a1ef-46b35d650281.jpg",
    "https://i.ibb.co/3cjTGVn/8c42239e-0621-47c4-a44e-83c65d184231.jpg",
    "https://i.ibb.co/7CX7vg6/5bc5421c-e0e5-4f18-93ba-7f984c576832.jpg",
  ];

  const hoverVariants = {
    hover: {
      scale: 1.05,
      filter: "brightness(1.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section 
      className="relative w-full h-screen overflow-hidden bg-cream-100 -mt-[64px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="embla absolute inset-0" ref={emblaRef}>
        <div className="embla__container h-full">
          {images.map((image, index) => (
            <div key={index} className="embla__slide w-full h-full">
              <motion.div
                className="relative w-full h-full"
                variants={hoverVariants}
                whileHover="hover"
              >
                <motion.img 
                  src={image} 
                  alt={`Hero ${index + 1}`} 
                  className="w-full h-full object-cover object-center transition-transform duration-300 ease-out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => {
              setCurrentIndex(index);
              if (emblaRef.current) {
                emblaRef.current.scrollTo(index);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;