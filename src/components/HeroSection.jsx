import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const images = [
    "https://i.postimg.cc/14x50HJf/image.png",
    "https://i.postimg.cc/WbSYckSB/Screenshot-2024-10-08-095057.png",
    "https://i.postimg.cc/y8dQ18bk/Screenshot-2024-10-08-095107.png",
  ];

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen overflow-hidden">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-full h-full">
              <div className="relative w-full h-full">
                <img 
                  src={image} 
                  alt={`Hero ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-300 ease-out"
                  style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.1)`,
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center px-4 max-w-3xl">
                    <img 
                      src="https://i.postimg.cc/T3N2Cfkz/image.png" 
                      alt="Henna by Fathima Logo" 
                      className="mx-auto mb-8 w-64 h-auto"
                    />
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mb-4 sm:mb-8">Let us adorn you with beautiful bridal henna that makes your special moments unforgettable.</p>
                    <Button className="bg-green-800 hover:bg-green-700 text-white text-sm sm:text-base">Book Now</Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
};

export default HeroSection;