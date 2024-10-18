import React from 'react';

const Aftercare = () => {
  return (
    <div className="bg-cream-100 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-green-800 mb-6">Aftercare</h2>
      <p className="text-xl font-semibold text-green-700 mb-6 italic">
        "To achieve a deep and vibrant Mehendi stain, it's essential to follow these aftercare practices"
      </p>
      <ul className="space-y-4 list-disc list-inside">
        <li>Keep the henna on for a minimum of 5 hours. Overnight is ideal.</li>
        <li>Keep the henna warm both before and after removal.</li>
        <li>Remove the henna without using water. Use a natural oil to help remove stubborn areas.</li>
        <li>Avoid water as much as possible for the first 24 hours after removing the paste.</li>
        <li>Apply a natural oil or aftercare balm throughout the day to protect your stain.</li>
      </ul>
    </div>
  );
};

export default Aftercare;