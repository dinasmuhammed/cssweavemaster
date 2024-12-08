import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HennaMoments = () => {
  const imageUrls = [
    "https://i.ibb.co/C1cFHfH/Whats-App-Image-2024-12-07-at-23-45-16-d0897369.jpg",
    "https://i.ibb.co/ZhwWrbk/IMG-7475.jpg",
    "https://i.ibb.co/CVwqgwf/IMG-7693.jpg",
    "https://i.ibb.co/rZbxbTq/Whats-App-Image-2024-12-07-at-23-00-46-3bf0a56b.jpg",
    "https://i.ibb.co/svfHh06/90055-FAD-BEFB-4852-AAC5-D9-D07-C2-EC3-DB.jpg",
    "https://i.ibb.co/5FRJHsf/81b8546f-49ce-45aa-9408-42486dfdcc9a.jpg",
    "https://i.ibb.co/QXbLTZY/Whats-App-Image-2024-12-07-at-23-04-55-9d16470d.jpg",
    "https://i.ibb.co/Gvqzfbf/Whats-App-Image-2024-12-07-at-23-03-23-1f1fc0e8.jpg",
    "https://i.ibb.co/5KhyqgL/Whats-App-Image-2024-12-07-at-23-03-23-3cd1b34c.jpg"
    
  ];
  const totalImages = 9;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      if (!isHovering) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
      }
    }, 3000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [isHovering]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-4">Henna Moments</h2>
        <p className="text-center mb-8 sm:mb-12 text-sm sm:text-base text-gray-600">
          Follow our instagram page{' '}
          <a 
            href="https://www.instagram.com/hennabyfathima__/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-green-800 hover:text-green-600 transition-colors font-semibold"
          >
            @hennabyfathima__
          </a>
        </p>
        <div 
          className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-lg"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              className="absolute top-0 left-0 w-full h-full flex"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(isMobile ? 3 : 6)].map((_, index) => (
                <img
                  key={index}
                  src={imageUrls[(currentIndex + index) % imageUrls.length]}
                  alt={`Henna Moment ${currentIndex + index + 1}`}
                  className={`h-full ${isMobile ? 'w-1/3' : 'w-1/6'} object-cover`}
                />
              ))}
            </motion.div>
          </AnimatePresence>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2 transition-opacity duration-300 opacity-0 hover:opacity-100 focus:opacity-100 z-10"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-green-800" />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2 transition-opacity duration-300 opacity-0 hover:opacity-100 focus:opacity-100 z-10"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-green-800" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HennaMoments;
