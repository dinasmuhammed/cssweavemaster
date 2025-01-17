import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

const PricingTabs = ({ onBookClick }) => {
  const handPricing = [
    {
      name: "Silver ",
      
      description: "Simple yet elegant party henna designs, perfect for bridesmaids or special occasions. Starting at ₹200 per side, these designs are minimal and customizable. Prices may vary based on the intricacy of the design.",
      
    },
    {
      name: "Gold ",
     
      description: "Semi-bridal henna designs that start from the wrist (where you tie a watch) and extend upwards. These designs offer a perfect balance of simplicity and elegance, ideal for engagement ceremonies or other grand events",
      
    },
    {
      name: "Platinum ",
     
      description: "Mid-length bridal henna designs that begin midway between the wrist and the elbow. These designs are intricate and detailed, perfect for brides seeking a traditional yet modest look.",
      
    },
    {
      name: "Diamond ",
     
      description: "Full bridal henna designs that start from the elbow and are highly intricate. These luxurious designs are tailored to make your special day unforgettable.",
     
    }
  ];

  const feetPricing = [
    {
      name: "Simple ",
      
      description: "Minimalistic henna designs focused on the upper foot area, featuring elegant patterns such as mandalas or custom designs of your choice. Perfect for a subtle and graceful look",
    
    },
    {
      name: "Heavy ",
     
      description: "Intricate henna designs that cover the entire foot up to the ankle. For those who wish to extend the design above the ankle or up to the knee, customization is available upon discussion.",
     
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Tabs defaultValue="hands" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="hands">HANDS</TabsTrigger>
          <TabsTrigger value="feet">FEET</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hands">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {handPricing.map((package_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-green-800 mb-2">{package_.name}</h3>
                <p className="text-2xl font-bold text-green-800 mb-4">{package_.price}</p>
                <p className="text-gray-600 mb-2">{package_.description}</p>
                <p className="text-gray-500 text-sm mb-4">{package_.duration}</p>
                <button 
                  className="btn-primary w-full"
                  onClick={onBookClick}
                >
                  Request to Book
                </button>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="feet">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feetPricing.map((package_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-green-800 mb-2">{package_.name}</h3>
                <p className="text-2xl font-bold text-green-800 mb-4">{package_.price}</p>
                <p className="text-gray-600 mb-2">{package_.description}</p>
                <p className="text-gray-500 text-sm mb-4">{package_.duration}</p>
                <button 
                  className="btn-primary w-full"
                  onClick={onBookClick}
                >
                  Request to Book
                </button>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingTabs;