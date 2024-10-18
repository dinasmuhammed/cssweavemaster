import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
  {
    name: 'Aisha M.',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'I was amazed by the intricate designs Fathima created for my wedding henna. Her attention to detail and creativity made my special day even more beautiful. Highly recommended!',
  },
  {
    name: 'Priya S.',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'The henna products I ordered from Henna by Fathima were of exceptional quality. The colors were vibrant, and the designs lasted much longer than expected. Will definitely order again!',
  },
  {
    name: 'Zara K.',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'Attending Fathima\'s henna workshop was an enlightening experience. Her teaching style is patient and thorough. I learned so much and can\'t wait to practice my new skills!',
  },
  {
    name: 'Rahul D.',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'I surprised my wife with a henna kit from Henna by Fathima, and she was overjoyed. The quality of the products and the beautiful designs have made her a loyal customer.',
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
    <section className="py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Our Happy Clients</h2>
        <Carousel className="w-full max-w-4xl mx-auto" selectedIndex={activeIndex} setSelectedIndex={setActiveIndex}>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="p-4">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                  <h3 className="text-xl font-bold mb-2 text-green-800">{testimonial.name}</h3>
                  <p className="text-gray-600 italic">&ldquo;{testimonial.text}&rdquo;</p>
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