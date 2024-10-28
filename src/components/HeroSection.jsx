import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const HeroSection = () => {
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
    <div className="w-full relative overflow-hidden">
      <section 
        className="relative mx-auto"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          width: '1280px',
          height: '570px',
          marginTop: '153px',
          opacity: 0,
        }}
      >
        <div className="embla absolute inset-0" ref={emblaRef}>
          <div className="embla__container h-full flex" style={{ gap: '0px' }}>
            {images.map((image, index) => (
              <div 
                key={index} 
                className="embla__slide relative flex-[0_0_100%] h-full"
              >
                <motion.div
                  className="absolute inset-0"
                  variants={hoverVariants}
                  whileHover="hover"
                >
                  <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ 
                      backgroundImage: `url(${image})`,
                      width: '1280px'
                    }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;