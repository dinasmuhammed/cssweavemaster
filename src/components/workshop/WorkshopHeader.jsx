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
        Learn the Art of Henna Application <br /> Join Our Workshop Today!
      </motion.h1>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img 
          src="https://i.ibb.co/0Xx1wxn/ba19277a-ac85-4a52-9127-09a7740bd8ed.jpg"
          alt="Workshop session 1"
          className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        />
        <img 
          src="https://i.ibb.co/WzCCtNC/7afa2c62-e1cb-4250-9c81-597cafc6a977.jpg"
          alt="Workshop session 2"
          className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        />
        <img 
          src="https://i.ibb.co/SNhC0ts/6c4e8a57-276d-4b27-8bcb-61b720c781e9.jpg"
          alt="Workshop session 3"
          className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        />
      </motion.div>

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
