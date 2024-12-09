import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const HennaMoments = () => {
  const scrollRef = useRef(null);
  const controls = useAnimation();

  const imageUrls = [
    "https://i.ibb.co/ZhwWrbk/IMG-7475.jpg",
    "https://i.ibb.co/rZbxbTq/Whats-App-Image-2024-12-07-at-23-00-46-3bf0a56b.jpg",
    "https://i.ibb.co/j8HF41P/90k.jpg",
    "https://i.ibb.co/5FRJHsf/81b8546f-49ce-45aa-9408-42486dfdcc9a.jpg",
    "https://i.ibb.co/C1cFHfH/Whats-App-Image-2024-12-07-at-23-45-16-d0897369.jpg",
    "https://i.ibb.co/5KhyqgL/Whats-App-Image-2024-12-07-at-23-03-23-3cd1b34c.jpg"
  ];

  useEffect(() => {
    let isActive = true;

    const startAutoScroll = async () => {
      const container = scrollRef.current;
      if (!container || !isActive) return;

      const scrollWidth = container.scrollWidth - container.clientWidth;
      
      while (isActive) {
        await controls.start({
          x: -scrollWidth,
          transition: { duration: 20, ease: "linear" }
        });
        
        if (isActive) {
          await controls.start({
            x: 0,
            transition: { duration: 0 }
          });
        }
      }
    };

    startAutoScroll();

    // Cleanup function
    return () => {
      isActive = false;
      controls.stop();
    };
  }, [controls]); // Only re-run if controls changes

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
        
        <div ref={scrollRef} className="overflow-hidden">
          <motion.div 
            animate={controls}
            className="flex gap-4"
          >
            {imageUrls.map((url, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-none w-[250px] aspect-square relative overflow-hidden rounded-lg group"
              >
                <img
                  src={url}
                  alt={`Henna Moment ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading={index < 2 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HennaMoments;