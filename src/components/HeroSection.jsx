import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef(null);
  const images = [
    "https://i.ibb.co/7j9LYMb/de63f2db-8f22-4eae-a1ef-46b35d650281.jpg",
    "https://i.ibb.co/3cjTGVn/8c42239e-0621-47c4-a44e-83c65d184231.jpg",
    "https://i.ibb.co/7CX7vg6/5bc5421c-e0e5-4f18-93ba-7f984c576832.jpg",
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
        <CarouselContent ref={carouselRef} className="w-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-full p-0">
              <motion.div
                className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-screen"
                variants={hoverVariants}
                whileHover="hover"
              >
                <motion.img 
                  src={image} 
                  alt={`Hero ${index + 1}`} 
                  className="w-full h-full object-cover object-center transition-transform duration-300 ease-out"
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
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
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