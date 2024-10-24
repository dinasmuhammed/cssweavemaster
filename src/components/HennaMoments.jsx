import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HennaMoments = () => {
  const imageUrls = [
    "https://i.postimg.cc/9Q94vdZQ/Screenshot-2024-10-08-101001.png",
    "https://i.postimg.cc/WzfvSHLd/81e36964-d066-49ec-a655-e08a82b68d95.jpg",
    "https://i.ibb.co/r3SqJdP/072a2867-34cf-4288-aeac-4adb7509b17e.jpg",
    "https://i.postimg.cc/xTJDngVP/466e2ef6-8869-4e92-aee0-9ed18a4ab7fa.jpg",
    "https://i.postimg.cc/5tJZ5VYP/Screenshot-2024-10-13-172431.png",
    "https://i.postimg.cc/ydYt5yTc/Screenshot-2024-10-13-172527.png"
  ];
  const totalImages = 450;

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
    <section className="py-8 sm:py-12 md:py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-4">Henna Moments</h2>
        <p className="text-center mb-8 text-sm sm:text-base">Follow our instagram page for more @hennabyfathima</p>
        <div 
          className="relative h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-lg"
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