import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from 'lucide-react';

const ServicePackage = ({ title, details, images, buttonText, isReversed }) => {
  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 mb-12 items-center`}>
      <div className="w-full md:w-1/2">
        <Card className="overflow-hidden shadow-lg">
          <div className="grid grid-cols-3 gap-2 p-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden"
                style={{
                  width: '213px',
                  height: '293px',
                  flexShrink: 0
                }}
              >
                <img
                  src={image}
                  alt={`${title} image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="w-full md:w-1/2 space-y-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-green-800">
          {title}
        </h3>
        
        <ul className="space-y-3">
          {details.map((detail, index) => (
            <li 
              key={index}
              className="flex items-center space-x-3 text-gray-700"
            >
              <Check className="w-5 h-5 text-green-800 flex-shrink-0" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        <div>
          <Button 
            className="bg-[#023634] text-white hover:bg-[#023634]/90"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicePackage;