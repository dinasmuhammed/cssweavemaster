import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from 'react-router-dom';

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
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen overflow-hidden bg-cream-100">
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
                  <div className="text-center px-4 max-w-3xl relative">
                    {/* Top-left leaf */}
                    
                    
                    {/* Top-right leaf */}
                   
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Welcome to Henna by Fathima!</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-6">
                      Let us adorn you with beautiful bridal henna<br />
                      that makes your special moments unforgettable.
                    </p>
                    <Button asChild className="bg-green-800 hover:bg-green-700 text-white text-sm sm:text-base px-6 py-3">
                      <Link to="/services">View Packages</Link>
                    </Button>
                    
                    {/* Bottom-left leaf */}
                    <img src="https://i.postimg.cc/8zbXPZXW/leaf-top-left.png" alt="Leaf" className="absolute bottom-0 left-0 w-24 h-24 -translate-x-full translate-y-full transform rotate-180" />
                    
                    {/* Bottom-right leaf */}
                    <img src="https://i.postimg.cc/8zbXPZXW/leaf-top-left.png" alt="Leaf" className="absolute bottom-0 right-0 w-24 h-24 translate-x-full translate-y-full transform scale-x-[-1] rotate-180" />
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
