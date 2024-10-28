import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const WelcomeSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-cream-100 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome to Henna by Fathima
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-green-800/80 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Let us adorn you with beautiful bridal henna that makes your special moments unforgettable.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <Button 
              asChild 
              className="bg-green-800 hover:bg-green-700 text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/services">View Our Packages</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;