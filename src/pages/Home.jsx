import React from 'react';
import HeroSection from '../components/HeroSection';
import WhyHennaByFathima from '../components/WhyHennaByFathima';
import OurServices from '../components/OurServices';
import AboutUs from '../components/AboutUs';
import HennaMoments from '../components/HennaMoments';

const Home = () => {
  return (
    <div className="bg-cream-100">
      <HeroSection />
      <main>
        <WhyHennaByFathima />
        <OurServices />
        <AboutUs />
        <HennaMoments />
      </main>
    </div>
  );
};

export default Home;