import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative bg-cream-100">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img 
              src="https://i.postimg.cc/14x50HJf/image.png" 
              alt="Bridal Henna" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <img 
              src="https://i.postimg.cc/WbSYckSB/Screenshot-2024-10-08-095057.png" 
              alt="Henna Artist" 
              className="w-full h-auto rounded-lg shadow-lg mb-8"
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-4">Welcome to Henna by Fathima!</h1>
            <p className="text-lg mb-6">
              Let us adorn you with beautiful bridal henna<br />
              that makes your special moments unforgettable.
            </p>
            <Button asChild className="bg-green-800 hover:bg-green-700 text-white">
              <Link to="/services">View Packages</Link>
            </Button>
          </div>
        </div>
      </div>
      <img 
        src="https://i.postimg.cc/8zbXPZXW/leaf-top-left.png" 
        alt="Decorative Leaf" 
        className="absolute bottom-0 left-0 w-24 h-24 transform -translate-x-1/2 translate-y-1/2"
      />
      <img 
        src="https://i.postimg.cc/8zbXPZXW/leaf-top-left.png" 
        alt="Decorative Leaf" 
        className="absolute top-0 right-0 w-24 h-24 transform translate-x-1/2 -translate-y-1/2 scale-x-[-1]"
      />
    </section>
  );
};

export default HeroSection;