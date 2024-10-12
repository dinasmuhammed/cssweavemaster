import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import WhyHennaByFathima from '../components/WhyHennaByFathima';
import OurServices from '../components/OurServices';
import HennaMoments from '../components/HennaMoments';
import AboutUs from '../components/AboutUs';
import HeroSection from '../components/HeroSection';

const Home = () => {
  return (
    <div className="space-y-16 bg-cream-100">
      {/* Hero Section */}
      <HeroSection />

      {/* New Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Welcome to Henna by Fathima!</h2>
          <p className="text-xl mb-8">
            Let us adorn you with beautiful bridal henna<br />
            that makes your special moments unforgettable.
          </p>
          <Button asChild className="bg-green-800 hover:bg-green-700 text-white">
            <Link to="/services">View Packages</Link>
          </Button>
        </div>
      </section>

      {/* Why Henna by Fathima Section */}
      <WhyHennaByFathima />

      {/* Our Services Section */}
      <OurServices />

      {/* About Us Section */}
      <AboutUs />

      {/* Henna Moments Section */}
      <HennaMoments />
    </div>
  );
};

export default Home;