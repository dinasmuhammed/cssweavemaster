import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const workshopImages = [
  "https://i.ibb.co/0Xx1wxn/ba19277a-ac85-4a52-9127-09a7740bd8ed.jpg",
  "https://i.ibb.co/WzCCtNC/7afa2c62-e1cb-4250-9c81-597cafc6a977.jpg",
  "https://i.ibb.co/SNhC0ts/6c4e8a57-276d-4b27-8bcb-61b720c781e9.jpg",
  "https://i.ibb.co/r3SqJdP/072a2867-34cf-4288-aeac-4adb7509b17e.jpg",
  "https://i.ibb.co/dWn0vvS/image.png",
];

const Workshop = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    location: '',
    workshopType: 'offline',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mkgnanlb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success("Workshop enquiry submitted successfully!");
        setFormData({
          name: '',
          contact: '',
          location: '',
          workshopType: 'offline',
          message: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-cream-100">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-green-800 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Learn the Art of Henna Application – Join Our Workshop Today!
      </motion.h1>

      <motion.h2 
        className="text-xl md:text-2xl text-center mb-12 text-green-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Available Online and Offline | Perfect for Beginners and Advanced Learners
      </motion.h2>

      <motion.p 
        className="text-lg text-center mb-12 max-w-3xl mx-auto text-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Join us for an exciting Mehendi Workshop where you can learn the art of henna applications! 
        Whether you're a beginner or looking to refine your skills, this workshop is perfect for everyone.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-green-800 mb-4">Online Mehendi Workshop</h3>
          <p className="text-gray-700">Learn from the comfort of your home with live interactive sessions and a DIY kit provided.</p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-green-800 mb-4">One-Day Mehendi Workshop (Offline)</h3>
          <p className="text-gray-700">Get hands-on training and create beautiful henna designs in just one day!</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-16">
        {workshopImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image}
              alt={`Workshop image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">Join Now</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              id="contact"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Workshop Type</Label>
            <RadioGroup
              value={formData.workshopType}
              onValueChange={(value) => setFormData({ ...formData, workshopType: value })}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="offline" id="offline" />
                <Label htmlFor="offline">Offline</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online">Online</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="message">Additional Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="min-h-[100px]"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Enquire Now'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Workshop;