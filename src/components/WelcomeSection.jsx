import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const WelcomeSection = () => {
  return (
    <section 
      className="mx-auto py-8 sm:py-12 md:py-16 lg:py-24" 
      style={{ 
        backgroundColor: '#FCEBD033',
        width: '1280px',
        height: '265px',
        flexShrink: 0
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            className="flex items-center justify-center gap-1 sm:gap-2 mb-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-green-800 animate-pulse" />
            <span className="text-green-800 font-medium text-sm sm:text-base">Premium Henna Services</span>
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-green-800 animate-pulse" />
          </motion.div>
          
          <motion.h2 
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-green-800 mb-3 sm:mb-4 md:mb-6 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Welcome to Henna by Fathima
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-green-800/80 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
              className="bg-[#00332B] hover:bg-[#004D40] text-white w-[140px] sm:w-[169px] h-[40px] sm:h-[46px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-sm sm:text-base group"
            >
              <Link to="/services" className="flex items-center justify-center gap-2">
                View Packages
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;