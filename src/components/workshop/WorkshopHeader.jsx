import React from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const WorkshopHeader = () => {
  const images = [
    "https://i.ibb.co/0Xx1wxn/ba19277a-ac85-4a52-9127-09a7740bd8ed.jpg",
    "https://i.ibb.co/WzCCtNC/7afa2c62-e1cb-4250-9c81-597cafc6a977.jpg",
    "https://i.ibb.co/SNhC0ts/6c4e8a57-276d-4b27-8bcb-61b720c781e9.jpg",
    "https://i.ibb.co/r3SqJdP/072a2867-34cf-4288-aeac-4adb7509b17e.jpg",
    "https://i.ibb.co/dWn0vvS/image.png",
    "https://i.ibb.co/0Xx1wxn/ba19277a-ac85-4a52-9127-09a7740bd8ed.jpg"
  ];

  return (
    <motion.div 
      className="text-center py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.p
        className="text-lg md:text-xl text-green-800 mb-2"
        variants={itemVariants}
      >
        Available Online and Offline | Perfect for Beginners and Advanced Learners
      </motion.p>
      
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-6 text-green-800"
        variants={itemVariants}
      >
        Learn the Art of Henna Application – Join Our Workshop Today!
      </motion.h1>

      <div className="max-w-4xl mx-auto px-4 mb-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <img 
                    src={image}
                    alt={`Workshop image ${index + 1}`}
                    className="w-full aspect-[4/3] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <motion.p 
        className="text-lg text-center mt-8 max-w-3xl mx-auto text-gray-700"
        variants={itemVariants}
      >
        Join us for an exciting Mehendi Workshop where you can learn the art of henna applications! 
        Whether you're a beginner or looking to refine your skills, this workshop is perfect for everyone.
      </motion.p>
    </motion.div>
  );
};

export default WorkshopHeader;