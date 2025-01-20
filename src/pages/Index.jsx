import React from 'react';
import HeroSection from '../components/HeroSection';
import WhyHennaByFathima from '../components/WhyHennaByFathima';
import OurServices from '../components/OurServices';
import OurHappyClients from '../components/OurHappyClients';
import RazorpayTest from '../components/RazorpayTest';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyHennaByFathima />
      <OurServices />
      <OurHappyClients />
      <RazorpayTest />
    </div>
  );
};

export default Index;