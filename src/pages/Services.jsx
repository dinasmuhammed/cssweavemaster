import React from 'react';
import { motion } from 'framer-motion';
import ServicePackage from '../components/ServicePackage';
import AdditionalInfo from '../components/AdditionalInfo';
import Aftercare from '../components/Aftercare';
import TravelFee from '../components/TravelFee';

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <motion.h1 
        className="text-3xl sm:text-4xl font-bold text-green-800 mb-8 sm:mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h1>
      
      <section className="mb-12 sm:mb-16">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-green-800 mb-6 sm:mb-8 text-center"
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

      <section className="mb-12 sm:mb-16">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-green-800 mb-6 sm:mb-8 text-center"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AdditionalInfo />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Aftercare />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <TravelFee />
      </motion.div>
    </div>
  );
};

export default Services;
