import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const PricingToggle = () => {
  const handPricing = [
    { design: "Simple Arabic", price: "₹500" },
    { design: "Full Hand Arabic", price: "₹1000" },
    { design: "Bridal Simple", price: "₹1500" },
    { design: "Bridal Full Hand", price: "₹2500" },
  ];

  const feetPricing = [
    { design: "Simple Design", price: "₹400" },
    { design: "Full Feet", price: "₹800" },
    { design: "Bridal Simple", price: "₹1200" },
    { design: "Bridal Full Feet", price: "₹2000" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto p-6"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-green-800 text-center mb-8">Our Pricing</h2>
      
      <Tabs defaultValue="hands" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="hands">Hands</TabsTrigger>
          <TabsTrigger value="feet">Feet</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hands">
          <div className="grid gap-4">
            {handPricing.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center p-4 bg-cream-100 rounded-lg"
              >
                <span className="font-medium">{item.design}</span>
                <span className="text-green-800 font-bold">{item.price}</span>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="feet">
          <div className="grid gap-4">
            {feetPricing.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center p-4 bg-cream-100 rounded-lg"
              >
                <span className="font-medium">{item.design}</span>
                <span className="text-green-800 font-bold">{item.price}</span>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default PricingToggle;