import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-cream-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://i.postimg.cc/wBxJsq1n/image.png" 
            alt="About Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Henna by Fathima
          </motion.h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <img 
              src="https://i.postimg.cc/wBxJsq1n/image.png"
              alt="Fathima Shamsudheen"
              className="w-full rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-green-800 text-white p-4 rounded-lg shadow-lg">
              <p className="font-heading text-lg">10+ Years Experience</p>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Welcome to Henna by Fathima, where traditional artistry meets modern elegance. 
                Founded by Fathima Shamsudheen, we've been creating beautiful henna designs 
                for over a decade, bringing joy and beauty to countless celebrations.
              </p>
              <p>
                Our journey began with a simple passion for henna art and has evolved into 
                a full-service henna studio offering bridal services, workshops, and premium 
                organic henna products.
              </p>
              <p>
                We take pride in using only the highest quality organic ingredients in our 
                henna products, ensuring safe and beautiful results for every client.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
              <div className="text-center p-4 bg-cream-200 rounded-lg">
                <p className="text-2xl font-bold text-green-800">1000+</p>
                <p className="text-sm">Happy Clients</p>
              </div>
              <div className="text-center p-4 bg-cream-200 rounded-lg">
                <p className="text-2xl font-bold text-green-800">500+</p>
                <p className="text-sm">Bridal Designs</p>
              </div>
              <div className="text-center p-4 bg-cream-200 rounded-lg">
                <p className="text-2xl font-bold text-green-800">50+</p>
                <p className="text-sm">Workshops</p>
              </div>
              <div className="text-center p-4 bg-cream-200 rounded-lg">
                <p className="text-2xl font-bold text-green-800">10+</p>
                <p className="text-sm">Years Experience</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate('/services')}
                className="bg-green-800 hover:bg-green-700"
              >
                View Our Services
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                variant="outline"
                className="border-green-800 text-green-800 hover:bg-green-50"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Quality",
                description: "We use only the finest organic ingredients in our henna products."
              },
              {
                title: "Creativity",
                description: "Each design is unique and tailored to our client's preferences."
              },
              {
                title: "Excellence",
                description: "We strive for perfection in every design we create."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-cream-100 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-green-800 mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;