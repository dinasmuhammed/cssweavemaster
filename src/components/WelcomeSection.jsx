import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const WelcomeSection = () => {
  return (
    <section className="py-16 bg-cream-100 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800 mb-4">Welcome to Henna by Fathima!</h2>
        <p className="text-lg sm:text-xl md:text-2xl text-green-800 mb-8 max-w-3xl mx-auto">
          Let us adorn you with beautiful bridal henna that makes your special moments unforgettable.
        </p>
        <Button asChild className="bg-green-800 hover:bg-green-700 text-white text-lg px-8 py-3">
          <Link to="/services">View Packages</Link>
        </Button>
      </div>
      <div className="absolute top-0 left-0 w-1/2 h-full opacity-20">
        <img src="https://i.postimg.cc/vBr7WJnv/leaf10-removebg-preview.png" alt="Henna leaves" className="w-full h-full object-contain object-left-top transform scale-150" />
      </div>
      <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-20 transform rotate-180">
        <img src="https://i.postimg.cc/vBr7WJnv/leaf10-removebg-preview.png" alt="Henna leaves" className="w-full h-full object-contain object-right-bottom transform scale-150" />
      </div>
    </section>
  );
};

export default WelcomeSection;