import React from 'react';
import HeroSection from '../components/HeroSection';
import WelcomeSection from '../components/WelcomeSection';
import OurServices from '../components/OurServices';
import OurHappyClients from '../components/OurHappyClients';
import HennaMoments from '../components/HennaMoments';

const Index = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <WelcomeSection />
      <OurServices />
      <OurHappyClients />
      <HennaMoments />
    </div>
  );
};

export default Index;