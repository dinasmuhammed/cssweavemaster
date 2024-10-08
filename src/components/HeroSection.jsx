import React from 'react';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const HeroSection = () => {
  const images = [
    "https://i.postimg.cc/14x50HJf/image.png",
    "https://i.postimg.cc/WbSYckSB/Screenshot-2024-10-08-095057.png",
    "https://i.postimg.cc/y8dQ18bk/Screenshot-2024-10-08-095107.png",
  ];

  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-full h-full">
              <div className="relative w-full h-full">
                <img 
                  src={image} 
                  alt={`Hero ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center px-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-4">Welcome to Henna by Fathima!</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-white mb-4 sm:mb-8">Let us adorn you with beautiful bridal henna that makes your special moments unforgettable.</p>
                    <Button className="bg-green-800 hover:bg-green-700 text-white text-sm sm:text-base">Book Now</Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default HeroSection;
