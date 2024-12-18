import React from 'react';
import HeroSection from '../components/HeroSection';
import WelcomeSection from '../components/WelcomeSection';
import OurServices from '../components/OurServices';
import OurHappyClients from '../components/OurHappyClients';
import HennaMoments from '../components/HennaMoments';
import WhyHennaByFathima from '../components/WhyHennaByFathima';
import OurHappyStore from '../components/OurHappyStore';

const Index = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <WelcomeSection />
      <OurServices />
      <WhyHennaByFathima />
      <OurHappyClients />
      <HennaMoments />
      <OurHappyStore />
    </div>
  );
};

export default Index;