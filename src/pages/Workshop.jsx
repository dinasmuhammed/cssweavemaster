import React from 'react';
import WorkshopHeader from '../components/workshop/WorkshopHeader';
import WorkshopOptions from '../components/workshop/WorkshopOptions';
import WorkshopGallery from '../components/workshop/WorkshopGallery';
import WorkshopForm from '../components/workshop/WorkshopForm';

const Workshop = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-cream-100">
      <WorkshopHeader />
      <WorkshopOptions />
      <WorkshopGallery />
      <WorkshopForm />
    </div>
  );
};

export default Workshop;