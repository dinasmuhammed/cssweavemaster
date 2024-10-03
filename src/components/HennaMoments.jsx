import React from 'react';

const HennaMoments = () => {
  const images = [
    '/henna1.jpg',
    '/henna2.jpg',
    '/henna3.jpg',
    '/henna4.jpg',
    '/henna5.jpg',
    '/henna6.jpg',
  ];

  return (
    <section className="py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-4">Henna Moments</h2>
        <p className="text-center mb-8">Follow our instagram page for more @hennabyfathima</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Henna Moment ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HennaMoments;