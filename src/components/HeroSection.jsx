import React from 'react';

const HeroSection = () => {
  React.useEffect(() => {
    console.log('HeroSection mounted');
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-6">
          Welcome to Henna by Fathima
        </h1>
        <p className="text-xl md:text-2xl text-green-800 mb-8">
          Premium Bridal Mehndi Artist & Organic Henna Products
        </p>
      </div>
    </section>
  );
};

export default HeroSection;