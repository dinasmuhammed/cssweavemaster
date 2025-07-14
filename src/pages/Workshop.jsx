import React from 'react';
import { motion } from 'framer-motion';
import WorkshopHeader from '../components/workshop/WorkshopHeader';
import WorkshopOptions from '../components/workshop/WorkshopOptions';
import WorkshopForm from '../components/workshop/WorkshopForm';
import TestimonialCarousel from '../components/workshop/TestimonialCarousel';
import { Users, Clock, Award, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Workshop = () => {
  const benefits = [
    {
      icon: Users,
      title: "Learn with Peers",
      description: "Join a community of henna enthusiasts and learn together in a supportive environment."
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Choose from various workshop timings that fit your schedule and availability."
    },
    {
      icon: Award,
      title: "Professional Certificate",
      description: "Receive a certificate of completion that validates your henna artistry skills."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/20">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary mb-6">
              Henna Art Workshop
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Master the ancient art of henna with our comprehensive workshops. From beginner basics to advanced techniques.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => document.getElementById('workshop-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Register Now
              </Button>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => window.open('/workshop-brochure.pdf', '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading text-primary mb-4">
              Why Choose Our Workshop?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our workshops are designed to provide hands-on experience with expert guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-secondary hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Header Component */}
      <section className="py-16 px-4 bg-accent/20">
        <div className="container mx-auto">
          <WorkshopHeader />
        </div>
      </section>

      {/* Workshop Options Component */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <WorkshopOptions />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading text-primary mb-4">
              What Our Students Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from our satisfied workshop participants
            </p>
          </motion.div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="workshop-form" className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-background rounded-lg p-8 shadow-lg"
          >
            <h2 className="text-3xl md:text-4xl font-heading text-center text-primary mb-8">
              Register for Workshop
            </h2>
            <WorkshopForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Workshop;