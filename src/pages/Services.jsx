import React from 'react';
import { motion } from 'framer-motion';
import PricingTabs from '../components/services/PricingTabs';
import ServicePackage from '../components/ServicePackage';
import TestimonialCard from '../components/TestimonialCard';
import BookingForm from '../components/services/BookingForm';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Services = () => {
  const packages = [{
    id: 1,
    title: "Bridal Henna",
    image: "https://i.ibb.co/stCpYRJ/IMG-20250115-WA0009.jpg",
    description: "Exclusive bridal designs for your special day"
  }, {
    id: 2,
    title: "Party Henna",
    image: "https://i.ibb.co/P9vLvmg/IMG-20250115-WA0008.jpg",
    description: "Beautiful designs for all occasions"
  }, {
    id: 3,
    title: "Kids Henna",
    image: "https://i.ibb.co/mt1dh33/IMG-20250115-WA0010.jpg",
    description: "Simple and fun designs for children"
  }, {
    id: 4,
    title: "Group Bookings",
    image: "https://i.ibb.co/wSMGnJT/IMG-20250115-WA0013.jpg",
    description: "Special rates for group events"
  }, {
    id: 5,
    title: "Corporate Events",
    image: "https://i.ibb.co/jDxTTsR/IMG-20250115-WA0011.jpg",
    description: "Professional henna services for corporate functions"
  }, {
    id: 6,
    title: "Custom Designs",
    image: "https://i.ibb.co/mt1dh33/IMG-20250115-WA0010.jpg",
    description: "Personalized designs tailored to your preferences",
    interactive: true
  }];
  const testimonials = [{
    name: "Priya Shah",
    rating: 5,
    text: "Absolutely stunning bridal henna! The designs were intricate and beautiful, exactly what I wanted for my wedding."
  }, {
    name: "Aisha Khan",
    rating: 5,
    text: "Professional service and gorgeous designs. The artist was patient and created exactly what I envisioned."
  }, {
    name: "Sarah Patel",
    rating: 5,
    text: "Amazing experience! The designs were perfect and lasted really well. Highly recommend!"
  }];
  return <div className="min-h-screen bg-secondary">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <motion.img initial={{
        scale: 1.1
      }} animate={{
        scale: 1
      }} transition={{
        duration: 1.5
      }} src="https://i.ibb.co/WzrLjQH/f326d2f8-4802-4000-b53b-b987f7a5a291.jpg" alt="Beautiful Henna Design" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5
        }} className="text-center px-4">
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
          <h2 className="text-2xl md:text-3xl font-heading text-center text-primary mb-12">
            Packages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(pkg => <motion.div key={pkg.id} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} whileHover={{
            y: -5
          }} className="relative group overflow-hidden rounded-lg shadow-lg bg-card">
                <div className="aspect-w-3 aspect-h-4 h-64">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-4">
                    <h3 className="text-xl font-heading text-white mb-2">{pkg.title}</h3>
                    <p className="text-white mb-4">{pkg.description}</p>
                    <motion.button whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }} className="bg-secondary text-primary px-6 py-2 rounded-full font-medium hover:bg-accent transition-colors">
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading text-center text-primary mb-12">
            Pricing
          </h2>
          <PricingTabs />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-accent">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading text-center text-primary mb-12">
            Client Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }}>
                <TestimonialCard {...testimonial} />
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Download Button Section */}
      <div className="flex justify-center py-12 bg-card">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} whileHover={{
        scale: 1.05
      }} transition={{
        duration: 0.3
      }}>
          <Button variant="default" className="group flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300" onClick={() => window.open('/workshop-brochure.pdf', '_blank')}>
            Download
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>

      {/* Booking Form Section */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-heading text-center text-primary mb-12">
              Book Now
            </h2>
            <BookingForm />
          </div>
        </div>
      </section>
    </div>;
};
export default Services;