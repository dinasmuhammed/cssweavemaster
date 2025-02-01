import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/shop');
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-[#F5F5F5] overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#023634] mb-6">
            Welcome to Henna by Fathima
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the art of traditional henna designs and natural henna products
          </p>
          <Button
            onClick={handleExplore}
            className="bg-[#023634] text-white hover:bg-[#023634]/90"
          >
            Explore Our Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;