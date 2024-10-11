import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import WhyHennaByFathima from '../components/WhyHennaByFathima';
import OurServices from '../components/OurServices';
import AboutUs from '../components/AboutUs';
import HennaMoments from '../components/HennaMoments';

const Home = () => {
  return (
    <div className="space-y-16 bg-cream-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-cream-100">
        <div className="absolute inset-0">
          <img 
            src="https://i.postimg.cc/14x50HJf/image.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Henna by Fathima!</h1>
          <p className="text-xl md:text-2xl mb-8">Let us adorn you with beautiful bridal henna that makes your special moments unforgettable.</p>
          <Button asChild className="bg-green-800 hover:bg-green-700 text-white">
            <Link to="/services">View Packages</Link>
          </Button>
        </div>
      </section>

      {/* Why Henna by Fathima Section */}
      <WhyHennaByFathima />

      {/* Our Services Section */}
      <OurServices />

      {/* About Us Section */}
      <AboutUs />

      {/* Henna Moments Section */}
      <HennaMoments />
    </div>
  );
};

export default Home;