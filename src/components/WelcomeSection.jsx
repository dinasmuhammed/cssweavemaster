import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const WelcomeSection = () => {
  return (
    <section className="flex justify-center items-center py-8 sm:py-12 md:py-16 lg:py-24" style={{ backgroundColor: '#FCEBD033' }}>
      <div className="w-full max-w-[1280px] min-h-[200px] sm:min-h-[265px] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
         <motion.div 
            className="flex items-center justify-center gap-1 sm:gap-2 mb-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="text-green-800 font-medium text-xs sm:text-sm md:text-base">Your One-Stop Destination for All Things Henna</span>
          </motion.div>
          
          <motion.h2 
            className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-green-800 mb-2 sm:mb-3 md:mb-6 tracking-tight px-2"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Welcome to Henna by Fathima
          </motion.h2>

           
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-green-800/80 mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            From premium bridal services to quality henna products and engaging workshops, we have everything to make your henna journey special.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <Button 
              asChild 
              className="bg-[#00332B] hover:bg-[#004D40] text-white w-[140px] sm:w-[169px] h-[40px] sm:h-[46px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-sm sm:text-base group"
            >
              <Link to="/shop" className="flex items-center justify-center gap-2">
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
