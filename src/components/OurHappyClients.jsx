import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: 'Sona K',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
  },
  {
    name: 'Sona K',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
  },
  {
    name: 'Sona K',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
  },
  {
    name: 'Sona K',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
  },
];

const OurHappyClients = () => {
  return (
    <section className="py-12 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-8">Our Happy Clients</h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="bg-white p-6 h-full flex flex-col">
                  <CardContent className="flex flex-col items-center text-center">
                    <Avatar className="w-16 h-16 mb-4">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold mb-2">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
};

export default OurHappyClients;