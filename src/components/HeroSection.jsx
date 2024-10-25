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
    <div className="w-full">
      <section 
        className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[570px] overflow-hidden bg-cover bg-center"
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
                  <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-30" /> {/* Optional overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Henna by Fathima</h1>
            <p className="text-lg sm:text-xl md:text-2xl">Creating beautiful memories with elegant henna designs</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;