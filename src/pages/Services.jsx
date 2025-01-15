import React from 'react';
import { motion } from 'framer-motion';
import PricingTabs from '../components/services/PricingTabs';
import ServicePackage from '../components/ServicePackage';
import TestimonialCard from '../components/TestimonialCard';
import BookingForm from '../components/services/BookingForm';

const Services = () => {
  const testimonials = [
    {
      name: "Priya Shah",
      rating: 5,
      text: "Absolutely stunning bridal henna! The designs were intricate and beautiful, exactly what I wanted for my wedding."
    },
    {
      name: "Aisha Khan",
      rating: 5,
      text: "Professional service and gorgeous designs. The artist was patient and created exactly what I envisioned."
    },
    {
      name: "Sarah Patel",
      rating: 5,
      text: "Amazing experience! The designs were perfect and lasted really well. Highly recommend!"
    }
  ];

  const packages = [
    {
      title: "Bridal Henna",
      details: [
        "Full hands and feet coverage",
        "Intricate traditional designs",
        "Premium natural henna",
        "Touch-up service included"
      ],
      images: [
        "https://i.ibb.co/nRc8Y29/IMG-0528.jpg",
        "https://i.ibb.co/nRc8Y29/IMG-0528.jpg"
      ]
    },
    {
      title: "Party Henna",
      details: [
        "Customizable designs",
        "Quick application",
        "Perfect for events",
        "Modern or traditional patterns"
      ],
      images: [
        "https://i.ibb.co/nRc8Y29/IMG-0528.jpg",
        "https://i.ibb.co/nRc8Y29/IMG-0528.jpg"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="https://i.ibb.co/nRc8Y29/IMG-0528.jpg"
          alt="Beautiful Henna Design"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center px-4"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-white mb-4">
              Exquisite Henna Artistry
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
              From Bridal Mehendi to Party Henna, we create designs that make your moments unforgettable
            </p>
          </motion.div>
        </div>
      </div>

      {/* Packages Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading text-center text-green-800 mb-12">
            Our Packages
          </h2>
          <div className="space-y-16">
            {packages.map((pkg, index) => (
              <ServicePackage
                key={index}
                title={pkg.title}
                details={pkg.details}
                images={pkg.images}
                isReversed={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading text-center text-green-800 mb-12">
            Our Pricing
          </h2>
          <PricingTabs />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-cream-50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading text-center text-green-800 mb-12">
            Client Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 px-4 bg-cream-100">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-heading text-center text-green-800 mb-12">
            Book Your Session
          </h2>
          <BookingForm />
        </div>
      </section>
    </div>
  );
};

export default Services;