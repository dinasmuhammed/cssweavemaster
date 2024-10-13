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
  "https://i.postimg.cc/Kj3LYHX1/basic-mehendi.jpg",
  "https://i.postimg.cc/3xZQH8Hv/premium-bridal.jpg",
  "https://i.postimg.cc/CKbjSySR/image.png",
  "https://i.postimg.cc/hjrTQ9Jg/image.png",
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
    <section className="relative h-screen">
      <Carousel className="w-full h-full" opts={{ loop: true }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div 
                className="relative w-full h-screen overflow-hidden"
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
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center">
                    Henna by Fathima
                  </h1>
                  <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-center">
                    Exquisite Henna Designs for Your Special Moments
                  </p>
                  <Button asChild className="bg-green-800 hover:bg-green-700 text-white">
                    <Link to="/services">View Our Services</Link>
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