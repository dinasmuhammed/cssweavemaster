import { motion } from 'framer-motion';

const WorkshopOptions = () => {
  const scrollToForm = () => {
    const formElement = document.querySelector('#workshop-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        onClick={scrollToForm}
      >
        <h3 className="text-2xl font-bold text-green-800 mb-4">Online Mehendi Workshop</h3>
        <p className="text-gray-700">Learn from the comfort of your home with live interactive sessions and a DIY kit provided.</p>
      </motion.div>

      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        onClick={scrollToForm}
      >
        <h3 className="text-2xl font-bold text-green-800 mb-4">One-Day Mehendi Workshop (Offline)</h3>
        <p className="text-gray-700">Get hands-on training and create beautiful henna designs in just one day!</p>
      </motion.div>
    </div>
  );
};

export default WorkshopOptions;