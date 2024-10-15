import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-screen bg-cream-100 overflow-hidden">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="w-full md:w-1/2 z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Welcome to Henna by Fathima!
          </h1>
          <p className="text-xl text-green-700 mb-8">
            Let us adorn you with beautiful bridal henna that makes your special moments unforgettable.
          </p>
          <Button asChild className="bg-green-800 hover:bg-green-700 text-white">
            <Link to="/services">View Packages</Link>
          </Button>
        </div>
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full">
          <img 
            src="https://i.postimg.cc/14x50HJf/image.png" 
            alt="Henna design on hands" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <img 
        src="https://i.postimg.cc/vBr7WJnv/leaf10-removebg-preview.png" 
        alt="Decorative leaf" 
        className="absolute bottom-0 left-0 w-1/4 opacity-50"
      />
      <img 
        src="https://i.postimg.cc/vBr7WJnv/leaf10-removebg-preview.png" 
        alt="Decorative leaf" 
        className="absolute top-0 right-0 w-1/4 transform rotate-180 opacity-50"
      />
    </section>
  );
};

export default HeroSection;