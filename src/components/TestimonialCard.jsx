import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, rating, text }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center mb-2 space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 sm:w-5 h-4 sm:h-5 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-4 text-sm sm:text-base italic">&quot;{text}&quot;</p>
      <p className="text-green-800 font-semibold text-sm sm:text-base">{name}</p>
    </div>
  );
};

export default TestimonialCard;