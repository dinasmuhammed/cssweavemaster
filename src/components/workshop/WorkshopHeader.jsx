import { motion } from 'framer-motion';

const WorkshopHeader = () => {
  return (
    <>
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
    </>
  );
};

export default WorkshopHeader;