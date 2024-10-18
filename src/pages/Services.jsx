import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ServicePackage from '../components/ServicePackage';
import AdditionalInfo from '../components/AdditionalInfo';
import Aftercare from '../components/Aftercare';
import TravelFee from '../components/TravelFee';

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const services = [
    { title: "BRIDAL & ENGAGEMENT HENNA", link: "/services#bridal" },
    { title: "HENNA PRODUCTS", link: "/services#products" },
    { title: "PARTY HENNA", link: "/services#party" },
    { title: "WORKSHOPS", link: "/services#workshops" },
    { title: "ADDITIONAL INFO", link: "/services#additional-info" },
    { title: "AFTERCARE", link: "/services#aftercare" },
    { title: "TRAVEL FEE", link: "/services#travel-fee" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <motion.h1 
        className="text-3xl sm:text-4xl font-bold text-green-800 mb-8 sm:mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={service.link} className="block p-6 bg-cream-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-green-800 text-center">{service.title}</h2>
            </Link>
          </motion.div>
        ))}
      </div>

      <section id="bridal" className="mb-12 sm:mb-16">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-green-800 mb-6 sm:mb-8 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          BRIDAL & ENGAGEMENT HENNA
        </motion.h2>
        
        <ServicePackage
          title="SILVER PACKAGE"
          details={[
            "Bridal Hands (both front and back sides)",
            "Includes Henna Care Aftercare",
            "1-2 Hours with Natural Application"
          ]}
          images={[
            "https://example.com/bridal-henna-1.jpg",
            "https://example.com/bridal-henna-2.jpg",
            "https://example.com/bridal-henna-3.jpg",
            "https://example.com/bridal-henna-4.jpg",
          ]}
          buttonText="Request to Book"
          isReversed={false}
        />

        <ServicePackage
          title="GOLD PACKAGE"
          details={[
            "Bridal Hands (both front and back sides)",
            "Bridal Feet (top side)",
            "Includes Henna Care Aftercare",
            "2-3 Hours with Natural Application"
          ]}
          images={[
            "https://example.com/bridal-henna-5.jpg",
            "https://example.com/bridal-henna-6.jpg",
            "https://example.com/bridal-henna-7.jpg",
            "https://example.com/bridal-henna-8.jpg",
          ]}
          buttonText="Request to Book"
          isReversed={true}
        />

        <ServicePackage
          title="PLATINUM PACKAGE"
          details={[
            "Bridal Full Arms",
            "Bridal Full Legs",
            "Includes Henna Care Aftercare",
            "4-5 Hours with Natural Application"
          ]}
          images={[
            "https://example.com/bridal-henna-9.jpg",
            "https://example.com/bridal-henna-10.jpg",
            "https://example.com/bridal-henna-11.jpg",
            "https://example.com/bridal-henna-12.jpg",
          ]}
          buttonText="Request to Book"
          isReversed={false}
        />
      </section>

      <section id="products" className="mb-12 sm:mb-16">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-green-800 mb-6 sm:mb-8 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          HENNA PRODUCTS
        </motion.h2>
        
        <ServicePackage
          title="HENNA PRODUCTS"
          details={[
            "High-quality henna cones",
            "Natural henna powder",
            "Henna aftercare products",
            "DIY henna kits"
          ]}
          images={[
            "https://example.com/henna-product-1.jpg",
            "https://example.com/henna-product-2.jpg",
            "https://example.com/henna-product-3.jpg",
            "https://example.com/henna-product-4.jpg",
          ]}
          buttonText="Shop Now"
          isReversed={false}
        />
      </section>

      <section id="party" className="mb-12 sm:mb-16">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-green-800 mb-6 sm:mb-8 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          PARTY HENNA
        </motion.h2>
        
        <ServicePackage
          title="SIMPLE DESIGNS"
          details={[
            "Small to medium sized designs",
            "15-20 Minutes with Natural Application"
          ]}
          images={[
            "https://example.com/party-henna-1.jpg",
            "https://example.com/party-henna-2.jpg",
            "https://example.com/party-henna-3.jpg",
            "https://example.com/party-henna-4.jpg",
          ]}
          buttonText="Request to Book"
          isReversed={true}
        />
      </section>

      <section id="workshops" className="mb-12 sm:mb-16">
        <motion.h2 
          className="text-2xl sm:text-3xl font-bold text-green-800 mb-6 sm:mb-8 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          WORKSHOPS
        </motion.h2>
        
        <ServicePackage
          title="HENNA WORKSHOPS"
          details={[
            "Learn henna application techniques",
            "Understand henna mixing and cone preparation",
            "Practice various henna designs",
            "Small group sessions for personalized attention"
          ]}
          images={[
            "https://example.com/workshop-1.jpg",
            "https://example.com/workshop-2.jpg",
            "https://example.com/workshop-3.jpg",
            "https://example.com/workshop-4.jpg",
          ]}
          buttonText="Book Workshop"
          isReversed={true}
        />
      </section>

      <div id="additional-info" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AdditionalInfo />
        </motion.div>
        <motion.div id="aftercare"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Aftercare />
        </motion.div>
      </div>

      <motion.div id="travel-fee"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <TravelFee />
      </motion.div>
    </div>
  );
};

export default Services;
