import React from 'react';

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-800">
    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M12 6C14 8 16 10 16 12C16 14 14 16 12 16C10 16 8 14 8 12C8 10 10 8 12 6Z" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const HandIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-800">
    <path d="M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M12 18C12 15.7909 13.7909 14 16 14" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-800">
    <path d="M12 4L3 9L12 14L21 9L12 4Z" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M7 11.5V16.5L12 19L17 16.5V11.5" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-800">
    <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" />
    <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const reasons = [
  {
    icon: <LeafIcon />,
    title: '100% Organic Products',
    description: 'Handmade, chemical-free henna cones and products.',
  },
  {
    icon: <HandIcon />,
    title: 'Expert Henna Artist',
    description: 'Unique, personalized designs for brides and special occasions.',
  },
  {
    icon: <GraduationCapIcon />,
    title: 'Henna Workshops',
    description: 'Tips, tutorials, and care guides to ensure the best henna experience.',
  },
  {
    icon: <ShoppingBagIcon />,
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