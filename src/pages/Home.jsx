import React from 'react';
import HeroSection from '../components/HeroSection';
import OurHappyStore from '../components/OurHappyStore';
import OurHappyClients from '../components/OurHappyClients';
import HennaMoments from '../components/HennaMoments';
import AboutUs from '../components/AboutUs';
import OurServices from '../components/OurServices';
import WhyHennaByFathima from '../components/WhyHennaByFathima';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <OurHappyStore />
      <OurHappyClients />
      <HennaMoments />
      <AboutUs />
      <OurServices />
      <WhyHennaByFathima />
    </div>
  );
};

export default Home;