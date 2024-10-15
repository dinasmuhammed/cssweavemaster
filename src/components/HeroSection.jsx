import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const HeroSection = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const images = [
    "https://i.postimg.cc/14x50HJf/image.png",
    "https://i.postimg.cc/WbSYckSB/Screenshot-2024-10-08-095057.png",
    "https://i.postimg.cc/y8dQ18bk/Screenshot-2024-10-08-095107.png",
  ];

  useEffect(() => {
    let animationFrameId;
    let time = 0;

    const animate = () => {
      const x = Math.sin(time) * 10; // Adjust the 10 to increase/decrease horizontal movement
      const y = Math.cos(time) * 10; // Adjust the 10 to increase/decrease vertical movement
      setOffset({ x, y });

      time += 0.01; // Adjust to change animation speed
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-screen overflow-hidden bg-cream-100">
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
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(1.1)`,
                  }}
                />
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