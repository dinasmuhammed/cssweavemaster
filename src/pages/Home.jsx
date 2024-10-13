import React from 'react';
import WhyHennaByFathima from '../components/WhyHennaByFathima';
import OurServices from '../components/OurServices';
import HennaMoments from '../components/HennaMoments';
import AboutUs from '../components/AboutUs';
import HeroSection from '../components/HeroSection';

const Home = () => {
  return (
    <div className="space-y-16 bg-cream-100">
      <HeroSection />
      <WhyHennaByFathima />
      <OurServices />
      <AboutUs />
      <HennaMoments />
    </div>
  );
};

export default Home;