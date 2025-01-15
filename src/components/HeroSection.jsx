import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoplayPlugin from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      skipSnaps: false,
      draggable: true
    }, 
    [AutoplayPlugin()]
  );
  
  const images = [
    "https://i.ibb.co/nRc8Y29/IMG-0528.jpg",
    "https://i.ibb.co/7bHppwL/Whats-App-Image-2025-01-14-at-23-27-10-b9e93189.jpg",
    "https://i.ibb.co/2FSrS78/Whats-App-Image-2025-01-15-at-12-52-50-fe690a03.jpg",
  ];

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    
    return () => {
      if (emblaApi) {
        emblaApi.off('select', onSelect);
      }
    };
  }, [emblaApi]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="relative h-[250px] sm:h-[400px] md:h-[500px] lg:h-[570px] w-full overflow-hidden">
      <div className="relative h-full group touch-pan-y">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full flex">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="embla__slide relative flex-[0_0_100%] h-full"
              >
                <img 
                  src={image} 
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 touch-manipulation"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-green-800" />
        </button>
        
        <button
          onClick={scrollNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 touch-manipulation"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-green-800" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;