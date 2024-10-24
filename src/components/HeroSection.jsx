import React, { useState } from 'react';
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
      className="relative w-full h-screen max-w-[1280px] mx-auto overflow-hidden bg-cream-100"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="embla absolute inset-0" ref={emblaRef}>
        <div className="embla__container h-full flex">
          {images.map((image, index) => (
            <div key={index} className="embla__slide relative w-full h-full flex-[0_0_100%]">
              <motion.div
                className="absolute inset-0"
                variants={hoverVariants}
                whileHover="hover"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${image})` }}
                />
                <div className="absolute inset-0 bg-black/40" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
  );
};

export default HeroSection;