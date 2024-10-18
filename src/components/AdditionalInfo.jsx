import React from 'react';

const AdditionalInfo = () => {
  return (
    <div className="bg-cream-100 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-green-800 mb-6">Additional Info</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-3">Manicures/Pedicures</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Should be completed before your henna booking.</li>
            <li>Henna will not go on your nails.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-3">Hair Removal (Recommended)</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Plan any hair removal before your booking.</li>
            <li>Waxing should be done at least 24 hours prior to avoid reactions from open pores.</li>
            <li>Hair removal ensures the henna stain is unaffected and allows for easier and cleaner application.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-3">Clean Skin</h3>
          <ul className="list-disc list-inside">
            <li>Ensure your skin is free of creams, oils, or any barriers on the day of booking</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-green-700 mb-3">Temperature</h3>
          <ul className="list-disc list-inside">
            <li>Keep the room warm; heat during application is essential for a dark stain.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;