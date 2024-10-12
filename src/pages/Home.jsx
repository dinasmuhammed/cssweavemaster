import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import WhyHennaByFathima from '../components/WhyHennaByFathima';
import OurServices from '../components/OurServices';
import HennaMoments from '../components/HennaMoments';

const Home = () => {
  return (
    <div className="space-y-16 bg-cream-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-cream-100">
        <div className="absolute inset-0 grid grid-cols-2">
          <img 
            src="https://i.postimg.cc/14x50HJf/image.png" 
            alt="Bridal Henna" 
            className="w-full h-full object-cover"
          />
          <img 
            src="https://i.postimg.cc/WbSYckSB/Screenshot-2024-10-08-095057.png" 
            alt="Bride Portrait" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative text-center z-10 px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-800">Welcome to Henna by Fathima!</h1>
          <p className="text-xl md:text-2xl mb-8 text-green-800">
            Let us adorn you with beautiful bridal henna<br />
            that makes your special moments unforgettable.
          </p>
          <Button asChild className="bg-green-800 hover:bg-green-700 text-white">
            <Link to="/services">View Packages</Link>
          </Button>
        </div>
        <img 
          src="https://i.postimg.cc/8zbXPZXW/leaf-top-left.png" 
          alt="Decorative Leaf" 
          className="absolute top-0 left-0 w-24 h-24"
        />
        <img 
          src="https://i.postimg.cc/8zbXPZXW/leaf-top-left.png" 
          alt="Decorative Leaf" 
          className="absolute bottom-0 right-0 w-24 h-24 transform rotate-180"
        />
      </section>

      {/* Why Henna by Fathima Section */}
      <WhyHennaByFathima />

      {/* Our Services Section */}
      <OurServices />

      {/* Henna Moments Section */}
      <HennaMoments />
    </div>
  );
};

export default Home;