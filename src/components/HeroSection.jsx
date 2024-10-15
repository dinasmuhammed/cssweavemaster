import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://i.postimg.cc/14x50HJf/image.png",
    "https://i.postimg.cc/WbSYckSB/Screenshot-2024-10-08-095057.png",
    "https://i.postimg.cc/y8dQ18bk/Screenshot-2024-10-08-095107.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

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
    <section className="relative h-screen w-full overflow-hidden bg-cream-100">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-full h-full">
              <motion.div
                className="relative w-full h-full"
                variants={hoverVariants}
                whileHover="hover"
              >
                <motion.img 
                  src={image} 
                  alt={`Hero ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-300 ease-out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentIndex ? 1 : 0 }}
                  transition={{ duration: 1 }}
                />
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-white text-2xl md:text-4xl font-bold text-center px-4">
                    Discover the Art of Henna
                  </p>
                </motion.div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;