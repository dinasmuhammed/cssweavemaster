import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "https://i.postimg.cc/14x50HJf/image.png",
  "https://i.postimg.cc/WbSYckSB/Screenshot-2024-10-08-095057.png",
  "https://i.postimg.cc/y8dQ18bk/Screenshot-2024-10-08-095107.png",
];

const HeroSection = () => {
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setHoverPosition({ x, y });
  };

  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen">
      <Carousel className="w-full h-full" opts={{ loop: true }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div 
                className="relative w-full h-full overflow-hidden"
                onMouseMove={handleMouseMove}
              >
                <img
                  src={image}
                  alt={`Hero image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out"
                  style={{
                    transform: `scale(1.1) translate(${(hoverPosition.x - 0.5) * 10}px, ${(hoverPosition.y - 0.5) * 10}px)`,
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-center">
                    Welcome to Henna by Fathima
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 text-center max-w-2xl">
                    Experience the art of henna with our professional services and products
                  </p>
                  <Button asChild className="bg-green-800 hover:bg-green-700 text-white">
                    <Link to="/shop">Shop Now</Link>
                  </Button>
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