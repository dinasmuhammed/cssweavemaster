import React from 'react';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Althaf Muhammad',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: "Henna by Fathima, and it's one of the few unique stores for Mehndi products. They had exactly what I needed and a great selection of other items too. I'm really happy with the quality and will definitely shop there again. Highly recommended",
  },
  {
    name: 'Hanan P',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: "I recently discovered that Henna by Fathima is one of the few unique store with Mehndi products. Not only did they have the item I was looking for, but they also offer wide variety of products in this sector. I'm thrilled with the quality and will definitely shop at your store again in the future. Highly recommended!",
  },
  {
    name: 'Priya S',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: 'I love the quality of Henna by Fathima products. The designs are vibrant and long-lasting. Highly recommended!',
  },
  {
    name: 'Zara K',
    image: 'https://i.ibb.co/4jVpvqQ/image.png',
    text: "Attending Fathima's workshop was an amazing experience. Her teaching style is patient and informative.",
  },
];

const OurHappyClients = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-cream-100 via-white to-cream-100"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800 tracking-tight">Our Happy Clients</h2>
        </motion.div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 relative">
                    <Quote className="absolute top-4 left-4 text-green-800 opacity-20 w-6 h-6 sm:w-8 sm:h-8" />
                    <CardContent className="flex flex-col items-center text-center pt-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Avatar className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 border-4 border-green-800 ring-2 ring-cream-200 ring-offset-2">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <h3 className="font-semibold text-base sm:text-lg mb-2 text-green-800 tracking-wide">{testimonial.name}</h3>
                      <p className="text-sm sm:text-base text-gray-600/90 italic leading-relaxed">"{testimonial.text}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2" />
          </div>
        </Carousel>
      </div>
    </motion.section>
  );
};

export default OurHappyClients;