import React from 'react';

const TravelFee = () => {
  return (
    <div className="bg-cream-100 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-green-800 mb-6">Travel Fee</h2>
      <p className="mb-4 text-lg">We provide professional henna services in India</p>
      <p className="font-semibold mb-4 text-lg">Our travel fees are as follows:</p>
      <ul className="space-y-2 list-disc list-inside mb-6 text-lg">
        <li>Within Calicut: Free</li>
        <li>Within Kerala: ₹200 - ₹500 (depending on the exact location)</li>
        <li>Outside Kerala: To be discussed during consultation</li>
      </ul>
      <p className="mb-2 text-lg">For destination weddings, please contact us for an estimated cost.</p>
      <p className="text-lg">Feel free to reach out for further details and to book your appointment.</p>
    </div>
  );
};

export default TravelFee;