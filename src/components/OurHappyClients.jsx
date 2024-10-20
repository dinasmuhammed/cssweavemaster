import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Aisha M.',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'I was amazed by the intricate designs Fathima created for my wedding henna. Her attention to detail and creativity made my special day even more beautiful. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Priya S.',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'The henna products I ordered from Henna by Fathima were of exceptional quality. The colors were vibrant, and the designs lasted much longer than expected. Will definitely order again!',
    rating: 5,
  },
  {
    name: 'Zara K.',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'Attending Fathima\'s henna workshop was an enlightening experience. Her teaching style is patient and thorough. I learned so much and can\'t wait to practice my new skills!',
    rating: 5,
  },
  {
    name: 'Rahul D.',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'I surprised my wife with a henna kit from Henna by Fathima, and she was overjoyed. The quality of the products and the beautiful designs have made her a loyal customer.',
    rating: 5,
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
    <section className="py-8 sm:py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-8 sm:mb-12">Our Happy Clients</h2>
        <Carousel className="w-full max-w-4xl mx-auto" selectedIndex={activeIndex} setSelectedIndex={setActiveIndex}>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="p-2 sm:p-4">
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center relative">
                  <Quote className="absolute top-2 sm:top-4 left-2 sm:left-4 text-green-800 opacity-20 w-8 sm:w-12 h-8 sm:h-12" />
                  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 sm:mb-6 object-cover border-2 sm:border-4 border-green-800" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-green-800">{testimonial.name}</h3>
                  <div className="flex justify-center mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic text-sm sm:text-base md:text-lg">&ldquo;{testimonial.text}&rdquo;</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 hidden sm:flex" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default OurHappyClients;