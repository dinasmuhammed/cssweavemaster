import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0 bg-gray-300">
        {/* Replace with actual hero image */}
        <img src="/placeholder-hero.jpg" alt="Hero" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome to Henna by Fathima!</h1>
          <p className="text-xl md:text-2xl text-white mb-8">Let us adorn you with beautiful bridal henna that makes your special moments unforgettable.</p>
          <button className="bg-green-800 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition-colors">Book Now</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;