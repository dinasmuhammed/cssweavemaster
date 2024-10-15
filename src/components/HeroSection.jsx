import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef(null);
  const images = [
    "https://i.postimg.cc/14x50HJf/image.png",
    "https://i.postimg.cc/WbSYckSB/Screenshot-2024-10-08-095057.png",
    "https://i.postimg.cc/y8dQ18bk/Screenshot-2024-10-08-095107.png",
  ];

  useEffect(() => {
    let interval;
    if (!isHovering) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        if (carouselRef.current) {
          carouselRef.current.scrollTo({
            left: carouselRef.current.scrollLeft + carouselRef.current.offsetWidth,
            behavior: 'smooth'
          });
        }
      }, 5000); // Change image every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isHovering, images.length]);

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
      className="relative w-full overflow-hidden bg-cream-100"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Carousel className="w-full">
        <CarouselContent ref={carouselRef}>
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-full">
              <motion.div
                className="relative w-full h-screen"
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
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => {
              setCurrentIndex(index);
              if (carouselRef.current) {
                carouselRef.current.scrollTo({
                  left: index * carouselRef.current.offsetWidth,
                  behavior: 'smooth'
                });
              }
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;