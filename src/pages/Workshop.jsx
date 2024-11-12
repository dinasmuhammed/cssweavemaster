import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { toast } from "sonner";

const workshopImages = [
  "https://i.ibb.co/0Xx1wxn/ba19277a-ac85-4a52-9127-09a7740bd8ed.jpg",
  "https://i.ibb.co/WzCCtNC/7afa2c62-e1cb-4250-9c81-597cafc6a977.jpg",
  "https://i.ibb.co/SNhC0ts/6c4e8a57-276d-4b27-8bcb-61b720c781e9.jpg",
  "https://i.ibb.co/r3SqJdP/072a2867-34cf-4288-aeac-4adb7509b17e.jpg",
  "https://i.ibb.co/dWn0vvS/image.png",
];

const Workshop = () => {
  const handleEnquiry = () => {
    const phoneNumber = "918086647124";
    const message = encodeURIComponent("Hey, can you please explain about the workshop? I have seen the work from your website.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDownload = () => {
    // Replace this URL with your actual brochure PDF URL
    const brochureUrl = '/src/workshop-brochure.pdf';
    
    fetch(brochureUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workshop-brochure.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success("Brochure downloaded successfully!");
      })
      .catch(error => {
        console.error('Error downloading the brochure:', error);
        toast.error("Failed to download brochure. Please try again later.");
      });
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-cream-100">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-green-800 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        One day Mehendi Workshop
      </motion.h1>

      <motion.p 
        className="text-lg md:text-xl text-center mb-12 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Join us for an exciting Mehendi Workshop where you can learn the art of henna applications! Whether you're a beginner or looking to refine your skills, this workshop is perfect for everyone.
      </motion.p>

      <div className="flex justify-center items-center mb-16">
        <p className="text-xl mr-4">For more Details</p>
        <Button 
          variant="default" 
          size="lg"
          className="bg-green-800 hover:bg-green-700 text-white"
          onClick={handleEnquiry}
        >
          Enquire Now
        </Button>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {workshopImages.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt={`Workshop image ${index + 1}`} 
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        ))}
      </motion.div>

      <div className="flex justify-center items-center">
        <p className="text-xl mr-4">Click here for detailed brochure</p>
        <Button 
          variant="outline" 
          size="lg"
          className="border-green-800 text-green-800 hover:bg-green-800 hover:text-white flex items-center gap-2"
          onClick={handleDownload}
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default Workshop;
