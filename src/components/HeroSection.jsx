import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <img 
          src="https://i.postimg.cc/14x50HJf/image.png" 
          alt="Hero" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome to Henna by Fathima!</h1>
          <p className="text-xl md:text-2xl text-white mb-8">Let us adorn you with beautiful bridal henna that makes your special moments unforgettable.</p>
          <Button className="bg-green-800 hover:bg-green-700 text-white">Book Now</Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;