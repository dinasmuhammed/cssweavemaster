import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const ServicePackage = ({ title, details, images, buttonText, isReversed }) => (
  <motion.div 
    className={`mb-12 flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className={`md:w-1/2 ${isReversed ? 'md:pl-8' : 'md:pr-8'}`}>
      <h3 className="text-2xl font-semibold mb-4 text-green-800">{title}</h3>
      <ul className="list-disc list-inside mb-6 space-y-2">
        {details.map((detail, index) => (
          <li key={index} className="text-gray-700">{detail}</li>
        ))}
      </ul>
      <Button className="bg-green-800 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105">
        {buttonText}
      </Button>
    </div>
    <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 md:mt-0">
      {images.map((src, index) => (
        <motion.img 
          key={index} 
          src={src} 
          alt={`${title} - Image ${index + 1}`} 
          className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  </motion.div>
);

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-4xl font-bold text-green-800 mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h1>
      
      <section className="mb-16">
        <motion.h2 
          className="text-3xl font-bold text-green-800 mb-8 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          BRIDAL & ENGAGEMENT HENNA
        </motion.h2>
        
        <ServicePackage
          title="SILVER PACKAGE"
          details={[
            "Bridal Hands (both front and back sides)",
            "Includes Henna Care Aftercare",
            "1-2 Hours with Natural Application"
          ]}
          images={[
            "https://example.com/bridal-henna-1.jpg",
            "https://example.com/bridal-henna-2.jpg",
            "https://example.com/bridal-henna-3.jpg",
            "https://example.com/bridal-henna-4.jpg",
          ]}
          buttonText="Request to Book"
          isReversed={false}
        />

        <ServicePackage
          title="GOLD PACKAGE"
          details={[
            "Bridal Hands (both front and back sides)",
            "Bridal Feet (top side)",
            "Includes Henna Care Aftercare",
            "2-3 Hours with Natural Application"
          ]}
          images={[
            "https://example.com/bridal-henna-5.jpg",
            "https://example.com/bridal-henna-6.jpg",
            "https://example.com/bridal-henna-7.jpg",
            "https://example.com/bridal-henna-8.jpg",
          ]}
          buttonText="Request to Book"
          isReversed={true}
        />

        <ServicePackage
          title="PLATINUM PACKAGE"
          details={[
            "Bridal Full Arms",
            "Bridal Full Legs",
            "Includes Henna Care Aftercare",
            "4-5 Hours with Natural Application"
          ]}
          images={[
            "https://example.com/bridal-henna-9.jpg",
            "https://example.com/bridal-henna-10.jpg",
            "https://example.com/bridal-henna-11.jpg",
            "https://example.com/bridal-henna-12.jpg",
          ]}
          buttonText="Request to Book"
          isReversed={false}
        />
      </section>

      <section>
        <motion.h2 
          className="text-3xl font-bold text-green-800 mb-8 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          PARTY HENNA
        </motion.h2>
        
        <ServicePackage
          title="SIMPLE DESIGNS"
          details={[
            "Small to medium sized designs",
            "15-20 Minutes with Natural Application"
          ]}
          images={[
            "https://example.com/party-henna-1.jpg",
            "https://example.com/party-henna-2.jpg",
            "https://example.com/party-henna-3.jpg",
            "https://example.com/party-henna-4.jpg",
          ]}
          buttonText="Request to Book"
          isReversed={true}
        />
      </section>

      <motion.p 
        className="text-sm text-gray-600 mt-12 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Note: The final amount charged will be dependent on the complexity of the design and the customer's requirements.
        The exact price will be finalized after the work is completed.
      </motion.p>
    </div>
  );
};

export default Services;