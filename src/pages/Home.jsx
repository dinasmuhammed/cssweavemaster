import React from 'react';
import HeroSection from '../components/HeroSection';
import WelcomeSection from '../components/WelcomeSection';
import WhyHennaByFathima from '../components/WhyHennaByFathima';
import OurServices from '../components/OurServices';
import AboutUs from '../components/AboutUs';
import HennaMoments from '../components/HennaMoments';

const Home = () => {
  return (
    <div className="space-y-16 bg-cream-100">
      <HeroSection />
      <main>
        <WelcomeSection />
        <WhyHennaByFathima />
        <OurServices />
        <AboutUs />
        <HennaMoments />
      </main>
    </div>
  );
};

export default Home;