import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,  // Ensure looping is explicitly set
      skipSnaps: false  // Ensure all slides are considered
    }, 
    [
      Autoplay({ 
        delay: 3000,  // Slide every 3 seconds
        stopOnInteraction: false,  // Continue auto-scrolling even after user interaction
        playOnInit: true  // Start autoplay immediately
      })
    ]
  );
  
  const images = [
    "https://i.ibb.co/nRc8Y29/IMG-0528.jpg",
    "https://i.ibb.co/C7FdMfY/Whats-App-Image-2024-12-07-at-22-53-32-95d14174.jpg",
    "https://i.ibb.co/567J2tf/Whats-App-Image-2024-12-07-at-22-53-32-ad81d123.jpg",
  ];

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

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
