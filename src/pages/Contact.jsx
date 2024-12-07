import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/mwpkjkdn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800 mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">We'd love to hear from you. Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-200 focus:border-green-500 focus:ring-green-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-200 focus:border-green-500 focus:ring-green-500"
                  placeholder="+91 12345 67890"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address (Optional)</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-gray-200 focus:border-green-500 focus:ring-green-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border-gray-200 focus:border-green-500 focus:ring-green-500 min-h-[150px]"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-green-800 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:sticky lg:top-8 space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-green-800 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-cream-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-green-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">hennabyfathima.in@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-cream-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-green-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 8086647124</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-cream-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-800" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">Henna by Fathima Mehndi Studio, South Koduvally, Koduvally, Kozhikode, Kerala - 673572</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.804472477242!2d75.9017245!3d11.3489877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64371e0cd4cd9%3A0x6bc7783ba1876049!2sHenna%20by%20Fathima%20Mehndi%20Studio!5e0!3m2!1sen!2sin!4v1728914176105!5m2!1sen!2sin" 
                width="100%" 
                height="300" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Henna by Fathima Mehndi Studio Location"
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;