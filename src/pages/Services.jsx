import React from 'react';
import { motion } from 'framer-motion';
import ServicePackage from '../components/ServicePackage';
import PricingTabs from '../components/services/PricingTabs';
import PricingToggle from '../components/services/PricingToggle';

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const bridalPackage = {
    title: "Bridal Henna Package",
    details: [
      "Full bridal henna design for hands and feet",
      "Complimentary trial session",
      "Natural organic henna paste",
      "Touch-up service available",
      "Duration: 4-6 hours"
    ],
    images: [
      "https://i.ibb.co/nRc8Y29/IMG-0528.jpg",
      "https://i.ibb.co/vmcsFYm/IMG-20250115-WA0002.jpg",
      "https://i.ibb.co/FBFVzHg/Whats-App-Image-2024-12-07-at-23-54-31-3f69a50b.jpg",
      "https://i.ibb.co/r2gjMxV/Whats-App-Image-2024-12-07-at-23-57-57-e16b4952.jpg"
    ]
  };

  const partyPackage = {
    title: "Party Henna Package",
    details: [
      "Customizable designs for any occasion",
      "Group bookings available",
      "Perfect for events and celebrations",
      "Natural organic henna paste",
      "Duration: 15-30 minutes per person"
    ],
    images: [
      "https://i.ibb.co/FBFVzHg/Whats-App-Image-2024-12-07-at-23-54-31-3f69a50b.jpg",
      "https://i.ibb.co/r2gjMxV/Whats-App-Image-2024-12-07-at-23-57-57-e16b4952.jpg",
      "https://i.ibb.co/nRc8Y29/IMG-0528.jpg",
      "https://i.ibb.co/vmcsFYm/IMG-20250115-WA0002.jpg"
    ]
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-cream-50"
    >
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <motion.img
          src="https://i.ibb.co/vmcsFYm/IMG-20250115-WA0002.jpg"
          alt="Henna Services Banner"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <motion.div
            className="text-center text-white px-4"
            variants={itemVariants}
          >
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Our Services</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Experience the art of traditional henna with our customized packages
            </p>
          </motion.div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        <ServicePackage {...bridalPackage} />
        <ServicePackage {...partyPackage} isReversed />
      </div>

      {/* Pricing Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-serif text-center text-green-800 mb-12"
            variants={itemVariants}
          >
            Our Pricing
          </motion.h2>
          <PricingToggle />
          <PricingTabs />
        </div>
      </div>
    </motion.div>
  );
};

export default Services;