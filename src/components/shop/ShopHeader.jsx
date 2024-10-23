import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';

const ShopHeader = ({ images }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <>
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800 mb-4">
          Shop Our Collections
        </h1>
      </div>

      <div className="relative mb-12">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                <div className="h-[300px] sm:h-[400px]">
                  <img 
                    src={image} 
                    alt={`Shop Collection ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default ShopHeader;