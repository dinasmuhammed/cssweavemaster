import React from 'react';
import { motion } from 'framer-motion';
import ServicePackage from '../components/ServicePackage';
import AdditionalInfo from '../components/AdditionalInfo';
import Aftercare from '../components/Aftercare';
import TravelFee from '../components/TravelFee';
import TestimonialCard from '../components/TestimonialCard';
import { Instagram } from 'lucide-react';
import BookingRequestForm from '../components/BookingRequestForm';

const testimonials = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Absolutely stunning bridal henna! The designs were intricate and beautiful."
  },
  {
    name: "Priya K.",
    rating: 5,
    text: "Amazing experience! The designs were exactly what I wanted for my wedding."
  },
  {
    name: "Aisha R.",
    rating: 5,
    text: "Professional service and gorgeous designs. Highly recommend!"
  }
];

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">
          Our Services
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          From Bridal Mehendi to Party Henna, We Create Designs That Make Your Moments Unforgettable
        </p>
      </motion.div>

      <section className="mb-16">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-green-800 mb-8 text-center"
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
            "https://i.postimg.cc/2SGPxtQr/Screenshot-2024-10-13-173602.png",
            "https://i.postimg.cc/sDddf7fd/Screenshot-2024-10-13-173328.png",
            "https://i.postimg.cc/MGXrmpZm/Screenshot-2024-10-13-173745.png"
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
            "https://i.postimg.cc/bNxXZrdG/Screenshot-2024-10-13-173523.png",
            "https://i.postimg.cc/2SGPxtQr/Screenshot-2024-10-13-173602.png",
            "https://i.postimg.cc/sDddf7fd/Screenshot-2024-10-13-173328.png"
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
            "https://i.postimg.cc/MGXrmpZm/Screenshot-2024-10-13-173745.png",
            "https://i.postimg.cc/bNxXZrdG/Screenshot-2024-10-13-173523.png",
            "https://i.postimg.cc/2SGPxtQr/Screenshot-2024-10-13-173602.png"
          ]}
          buttonText="Request to Book"
          isReversed={false}
        />
      </section>

      {/* Gallery Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">Our Work</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <img src="https://i.postimg.cc/2SGPxtQr/Screenshot-2024-10-13-173602.png" alt="Henna design" className="w-full h-64 object-cover rounded-lg" />
          <img src="https://i.postimg.cc/sDddf7fd/Screenshot-2024-10-13-173328.png" alt="Henna design" className="w-full h-64 object-cover rounded-lg" />
          <img src="https://i.postimg.cc/MGXrmpZm/Screenshot-2024-10-13-173745.png" alt="Henna design" className="w-full h-64 object-cover rounded-lg" />
          <img src="https://i.postimg.cc/bNxXZrdG/Screenshot-2024-10-13-173523.png" alt="Henna design" className="w-full h-64 object-cover rounded-lg" />
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-600 mb-2">See more of our work on Instagram!</p>
          <a 
            href="https://instagram.com/hennabyfathima" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-800 hover:text-green-700"
          >
            <Instagram className="w-5 h-5 mr-2" />
            @hennabyfathima
          </a>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">Client Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">Book Your Service</h2>
        <div className="max-w-2xl mx-auto">
          <BookingRequestForm />
        </div>
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
