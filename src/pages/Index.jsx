import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import WelcomeSection from '../components/WelcomeSection';
import OurServices from '../components/OurServices';
import OurHappyClients from '../components/OurHappyClients';
import HennaMoments from '../components/HennaMoments';
import WhyHennaByFathima from '../components/WhyHennaByFathima';
import OurHappyStore from '../components/OurHappyStore';

const Index = () => {
  const navigate = useNavigate();

  // Using React.useEffect to ensure proper initialization
  React.useEffect(() => {
    // Initialize any necessary functionality here
    console.log('Index component mounted');
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col w-full">
      <HeroSection onNavigate={handleNavigation} />
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