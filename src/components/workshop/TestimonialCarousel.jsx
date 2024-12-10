import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TestimonialCarousel = () => {
  const videos = [
    "https://www.youtube.com/embed/YOUR_FIRST_VIDEO_ID",
    "https://www.youtube.com/embed/YOUR_SECOND_VIDEO_ID"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 mb-12">
      <h2 className="text-2xl font-bold text-center text-green-800 mb-6">What Our Students Say</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {videos.map((videoUrl, index) => (
            <CarouselItem key={index} className="md:basis-1/2">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={videoUrl}
                  title={`Testimonial video ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                ></iframe>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;