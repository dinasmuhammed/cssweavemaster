import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getOptimizedImageUrl, preloadImage } from '../utils/imageOptimization';

const HeroSection = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true }, 
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  
  const images = [
    "https://i.ibb.co/7j9LYMb/de63f2db-8f22-4eae-a1ef-46b35d650281.jpg",
    "https://i.ibb.co/3cjTGVn/8c42239e-0621-47c4-a44e-83c65d650281.jpg",
    "https://i.ibb.co/7CX7vg6/5bc5421c-e0e5-4f18-93ba-7f984c576832.jpg",
  ];

  useEffect(() => {
    // Preload all hero images
    images.forEach(preloadImage);
    
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="relative h-[250px] sm:h-[400px] md:h-[500px] lg:h-[570px] w-full overflow-hidden">
      <div 
        className="relative h-full group touch-pan-y"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full flex">
            <AnimatePresence mode="wait">
              {images.map((image, index) => (
                <motion.div 
                  key={index} 
                  className="embla__slide relative flex-[0_0_100%] h-full"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ 
                    opacity: selectedIndex === index ? 1 : 0,
                    scale: selectedIndex === index ? 1 : 1.1,
                  }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                >
                  <img 
                    src={getOptimizedImageUrl(image)} 
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={scrollPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 touch-manipulation"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-green-800" />
        </button>
        
        <button
          onClick={scrollNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 touch-manipulation"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-green-800" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;