import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    name: 'Hanan P',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'I recently discovered that Henna by Fathima is one of the few unique store with Mehndi products .  Not only did they have the item I was looking for, but they also offer wide variety of products in this sector. I’m thrilled with the quality and will definitely shop at your store again in the future. Highly recommended!',
  },
  
];

const OurHappyClients = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Our Happy Clients</h2>
        <Carousel className="w-full max-w-4xl mx-auto" selectedIndex={activeIndex} setSelectedIndex={setActiveIndex}>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="p-4">
                <div className="bg-cream-100 p-6 rounded-lg text-center">
                  <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                  <h3 className="text-xl font-bold mb-2">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.text}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default OurHappyClients;
