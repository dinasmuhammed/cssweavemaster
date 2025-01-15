import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

const PricingTabs = () => {
  const handPricing = [
    {
      name: "Silver Package",
      
      description: "Simple Arabic design for both hands",
      
    },
    {
      name: "Gold Package",
     
      description: "Full hand Arabic design with intricate patterns",
      
    },
    {
      name: "Platinum Package",
     
      description: "Full arm bridal design with premium details",
      
    },
    {
      name: "Diamond Package",
     
      description: "Exclusive bridal design with crystals and glitter",
     
    }
  ];

  const feetPricing = [
    {
      name: "Simple Package",
      
      description: "Basic design for feet",
    
    },
    {
      name: "Heavy Package",
     
      description: "Intricate bridal design for feet",
     
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Tabs defaultValue="hands" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="hands">Hands</TabsTrigger>
          <TabsTrigger value="feet">Feet</TabsTrigger>
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
                <p className="text-gray-500 text-sm mb-4">Duration: {package_.duration}</p>
                <button className="btn-primary w-full">Request to Book</button>
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
                <p className="text-gray-500 text-sm mb-4">Duration: {package_.duration}</p>
                <button className="btn-primary w-full">Request to Book</button>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingTabs;
