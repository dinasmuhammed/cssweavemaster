import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, rating, text }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">&quot;{text}&quot;</p>
      <p className="text-green-800 font-semibold">{name}</p>
    </div>
  );
};

export default TestimonialCard;