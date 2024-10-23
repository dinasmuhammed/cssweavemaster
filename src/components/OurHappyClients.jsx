import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sona K',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.',
  },
  {
    name: 'Aisha M',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'The attention to detail in Fathima\'s henna designs is truly remarkable. My wedding day was made even more special.',
  },
  {
    name: 'Priya S',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'I love the quality of Henna by Fathima products. The designs are vibrant and long-lasting. Highly recommended!',
  },
  {
    name: 'Zara K',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'Attending Fathima\'s workshop was an amazing experience. Her teaching style is patient and informative.',
  },
];

const OurHappyClients = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-green-800 mb-6 sm:mb-8 md:mb-12">Our Happy Clients</h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <Card className="bg-white p-4 sm:p-6 h-full flex flex-col shadow-lg relative">
                  <Quote className="absolute top-4 left-4 text-green-800 opacity-20 w-6 h-6 sm:w-8 sm:h-8" />
                  <CardContent className="flex flex-col items-center text-center pt-4">
                    <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 border-4 border-green-800">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-base sm:text-lg mb-2 text-green-800">{testimonial.name}</h3>
                    <p className="text-sm sm:text-base text-gray-600 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default OurHappyClients;