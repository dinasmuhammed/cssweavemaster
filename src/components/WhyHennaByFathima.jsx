import React from 'react';
import { Leaf, Hand, GraduationCap, ShoppingBag } from 'lucide-react';

const reasons = [
  {
    icon: <Leaf className="w-12 h-12 text-green-800" />,
    title: '100% Organic Products',
    description: 'Handmade, chemical-free henna cones and products.',
  },
  {
    icon: <Hand className="w-12 h-12 text-green-800" />,
    title: 'Expert Henna Artist',
    description: 'Unique, personalized designs for brides and special occasions.',
  },
  {
    icon: <GraduationCap className="w-12 h-12 text-green-800" />,
    title: 'Henna Workshops',
    description: 'Tips, tutorials, and care guides to ensure the best henna experience.',
  },
  {
    icon: <ShoppingBag className="w-12 h-12 text-green-800" />,
    title: 'Easy Online Shopping',
    description: 'Convenient purchase of organic products through online and offline.',
  },
];

const WhyHennaByFathima = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Why Henna by Fathima?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHennaByFathima;