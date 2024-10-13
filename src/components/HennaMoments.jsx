import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HennaMoments = () => {
  const imageUrls = [
    "https://i.postimg.cc/9Q94vdZQ/Screenshot-2024-10-08-101001.png",
    "https://i.postimg.cc/WzfvSHLd/81e36964-d066-49ec-a655-e08a82b68d95.jpg",
    "https://i.postimg.cc/tJcKFnWP/IMG-4258.avif",
    "https://i.postimg.cc/xTJDngVP/466e2ef6-8869-4e92-aee0-9ed18a4ab7fa.jpg",
    "https://i.postimg.cc/5tJZ5VYP/Screenshot-2024-10-13-172431.png",
    "https://i.postimg.cc/ydYt5yTc/Screenshot-2024-10-13-172527.png"
  ];
  const totalImages = 450;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
      }
    }, 3000);

    return () => clearInterval(interval);
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
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-4">Henna Moments</h2>
        <p className="text-center mb-6 sm:mb-8">Follow our instagram page for more @hennabyfathima</p>
        <div 
          className="relative h-0 pb-[60%] sm:pb-[40%] md:pb-[30%] lg:pb-[20%] overflow-hidden"
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
              {[...Array(6)].map((_, index) => (
                <img
                  key={index}
                  src={imageUrls[(currentIndex + index) % imageUrls.length]}
                  alt={`Henna Moment ${currentIndex + index + 1}`}
                  className="h-full w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 object-cover"
                />
              ))}
            </motion.div>
          </AnimatePresence>
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 transition-opacity duration-300 opacity-0 hover:opacity-100"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-6 h-6 text-green-800" />
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 transition-opacity duration-300 opacity-0 hover:opacity-100"
            onClick={handleNext}
          >
            <ChevronRight className="w-6 h-6 text-green-800" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HennaMoments;