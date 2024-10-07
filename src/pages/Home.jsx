import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import OurHappyStore from '../components/OurHappyStore';
import OurHappyClients from '../components/OurHappyClients';
import HennaMoments from '../components/HennaMoments';
import AboutUs from '../components/AboutUs';
import OurServices from '../components/OurServices';
import WhyHennaByFathima from '../components/WhyHennaByFathima';
import NotificationButton from '../components/NotificationButton';

const Home = () => {
  return (
    <div className="space-y-16">
      <HeroSection />
      <OurServices />
      <AboutUs />
      <WhyHennaByFathima />
      <OurHappyClients />
      <HennaMoments />
      <OurHappyStore />
      <div className="text-center space-y-4">
        <Link to="/shop" className="bg-green-800 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition-colors inline-block">
          Visit Our Shop
        </Link>
        <div>
          <NotificationButton 
            message="Welcome to Henna by Fathima! Explore our services and products." 
            title="Welcome"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;