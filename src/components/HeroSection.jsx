import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

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
    <div className="w-full">
      <section 
        className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[570px] overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="embla absolute inset-0" ref={emblaRef}>
          <div className="embla__container h-full flex">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="embla__slide relative w-full flex-[0_0_100%] h-full"
              >
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  variants={hoverVariants}
                  whileHover="hover"
                >
                  <img 
                    src={image}
                    alt={`Hero slide ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="max-w-[1280px] mx-auto w-full px-4">
                    <div className="flex flex-col items-center text-center">
                      <motion.h1 
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        Welcome to Henna by Fathima
                      </motion.h1>
                      <motion.p 
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 sm:mb-8 max-w-2xl px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        Experience the art of traditional and modern henna designs
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="w-full sm:w-auto px-4"
                      >
                        <Button asChild className="w-full sm:w-auto bg-green-800 hover:bg-green-700 text-white px-6 py-3">
                          <Link to="/services">Explore Our Services</Link>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
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
    </div>
  );
};

export default HeroSection;