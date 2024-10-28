import React from 'react';
import HeroSection from '../components/HeroSection';
import WelcomeSection from '../components/WelcomeSection';
import WhyHennaByFathima from '../components/WhyHennaByFathima';
import OurServices from '../components/OurServices';
import AboutUs from '../components/AboutUs';
import HennaMoments from '../components/HennaMoments';
import OurHappyClients from '../components/OurHappyClients';
import OurHappyStore from '../components/OurHappyStore';

const Home = () => {
  return (
    <div className="space-y-8 sm:space-y-16 bg-white">
      <HeroSection />
      <main className="px-4 sm:px-6 lg:px-8">
        <WelcomeSection />
        <WhyHennaByFathima />
        <OurServices />
        <AboutUs />
        <HennaMoments />
        <OurHappyClients />
        <OurHappyStore />
      </main>
    </div>
  );
};

export default Home;