import React from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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
    "https://i.ibb.co/NrscTxL/Whats-App-Image-2024-12-10-at-11-08-19-b0e5c368.jpg",
    "https://i.ibb.co/txK3K1B/Whats-App-Image-2024-12-10-at-11-11-08-73f875f9.jpg",
    "https://i.ibb.co/zSGCh4p/Whats-App-Image-2024-12-10-at-11-11-07-75eb6e21.jpg",
    "https://i.ibb.co/XpdTN8t/Whats-App-Image-2024-12-10-at-11-11-08-ab70107e.jpg",
    "https://i.ibb.co/svQrJVz/Whats-App-Image-2024-12-10-at-11-11-09-7321bedc.jpg",
    "https://i.ibb.co/LYzqmt0/Whats-App-Image-2024-12-10-at-11-11-56-8d444683.jpg"
  ];

  return (
    <motion.div 
      className="text-center py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.p
        className="text-green-800 font-medium text-xs sm:text-sm md:text-base mb-2"
        variants={itemVariants}
      >
        Available Online and Offline | Perfect for Beginners and Advanced Learners
      </motion.p>
      <br />
      <br />
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-6 text-green-800"
        variants={itemVariants}
      >
        Learn the Art of Henna Application – Join Our Workshop Today!
      </motion.h1>
<br />
      <br />
      <br />
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

      <motion.div
        className="mt-6"
        variants={itemVariants}
      >
        <a
          href="https://drive.google.com/file/d/1-GABqdAgeDW67-sfH25WVkFq6Dq_DLx9/view"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-green-800 hover:text-green-900 font-medium"
        >
          <Download className="w-4 h-4" />
          Download Brochure
        </a>
      </motion.div>
    </motion.div>
  );
};

export default WorkshopHeader;
