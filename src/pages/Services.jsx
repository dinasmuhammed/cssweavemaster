import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import PricingTabs from '../components/services/PricingTabs';
import ServicePackage from '../components/ServicePackage';
import TestimonialCard from '../components/TestimonialCard';
import BookingForm from '../components/services/BookingForm';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Services = () => {
  const bookingRef = useRef(null);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const packages = [
    {
      id: 1,
      title: "party henna",
      image: "https://i.ibb.co/stCpYRJ/IMG-20250115-WA0009.jpg",
      description: ""
    },
    {
      id: 2,
      title: "Bridal Henna",
      image: "https://i.ibb.co/P9vLvmg/IMG-20250115-WA0008.jpg",
      description: "Exclusive bridal designs for your special day"
    },
    {
      id: 3,
      title: "haldi Henna",
      image: "https://i.ibb.co/mt1dh33/IMG-20250115-WA0010.jpg",
      description: "Simple and fun designs for children"
    },
    {
      id: 4,
      title: "Group Bookings",
      image: "https://i.ibb.co/wSMGnJT/IMG-20250115-WA0013.jpg",
      description: "Special rates for group events"
    },
    {
      id: 5,
      title: "Corporate Events",
      image: "https://i.ibb.co/jDxTTsR/IMG-20250115-WA0011.jpg",
      description: "Professional henna services for corporate functions"
    },
    {
      id: 6,
      title: "Custom Designs",
      image: "https://i.ibb.co/mt1dh33/IMG-20250115-WA0010.jpg",
      description: "Personalized designs tailored to your preferences",
      interactive: true
    }
  ];

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

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="https://i.ibb.co/WzrLjQH/f326d2f8-4802-4000-b53b-b987f7a5a291.jpg"
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

      {/* Packages Grid Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading text-center text-green-800 mb-12">
            Packages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="relative group overflow-hidden rounded-lg shadow-lg"
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-4">
                    <h3 className="text-xl font-heading text-white mb-2">{pkg.title}</h3>
                    <p className="text-white mb-4">{pkg.description}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-cream-100 text-green-800 px-6 py-2 rounded-full font-medium hover:bg-cream-200 transition-colors"
                      onClick={scrollToBooking}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading text-center text-green-800 mb-12">
            Pricing
          </h2>
          <PricingTabs onBookClick={scrollToBooking} />
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

      {/* Download Button Section */}
      <div className="flex justify-center py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="secondary"
            className="group flex items-center gap-2 px-6 py-3 bg-transparent text-green-800 font-medium rounded-lg border-2 border-green-800 hover:bg-green-100 transition-all duration-300"
            onClick={() => window.open('https://drive.google.com/file/d/1-fRCsLtt8Movc7CCq-sw9UtgEth-V0vj/view', '_blank')}
          >
            <ArrowDown className="text-green-800 group-hover:text-green-900" />
            Aftercare Details
          </Button>
        </motion.div>
      </div>

      {/* Booking Form Section */}
      <section 
        ref={bookingRef} 
        className="py-16 px-4 bg-cream-100 scroll-mt-16 border-t border-green-800/10"
      >
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-green-800/10 backdrop-blur-sm relative overflow-hidden">
            {/* Premium decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-800 to-green-900 opacity-80" />
            <div className="absolute top-0 right-0 w-24 h-24 -translate-y-1/2 translate-x-1/2 bg-gradient-to-br from-cream-100 to-cream-200 rounded-full opacity-20" />
            
            <h2 className="text-2xl md:text-3xl font-heading text-center text-green-800 mb-8 relative">
              Book Now
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-green-800/20 rounded-full" />
            </h2>
            
            <div className="relative bg-white/95 rounded-xl p-6 shadow-sm border border-green-800/5">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
