import React from 'react';
import WorkshopHeader from '../components/workshop/WorkshopHeader';
import WorkshopOptions from '../components/workshop/WorkshopOptions';
import WorkshopForm from '../components/workshop/WorkshopForm';
import TestimonialCarousel from '../components/workshop/TestimonialCarousel';

const Workshop = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-cream-100">
      <WorkshopHeader />
      <WorkshopOptions />
      <TestimonialCarousel />
      <WorkshopForm />
    </div>
  );
};

export default Workshop;