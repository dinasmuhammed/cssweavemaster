import React from 'react';

const Shipping = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Shipping Information</h1>
      <div className="prose max-w-none">
        <h2>1. Shipping Methods</h2>
        <p>We offer the following shipping methods:</p>
        <ul>
          <li>Standard Shipping (5-7 business days)</li>
          <li>Express Shipping (2-3 business days)</li>
          <li>International Shipping (10-14 business days)</li>
        </ul>
        <h2>2. Shipping Costs</h2>
        <p>Shipping costs are calculated based on the weight of your order and your location. You can view the shipping cost at checkout before completing your purchase.</p>
        <h2>3. Order Tracking</h2>
        <p>Once your order has been shipped, you will receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.</p>
        <h2>4. International Shipping</h2>
        <p>We ship internationally to most countries. Please note that international orders may be subject to import duties and taxes, which are the responsibility of the recipient.</p>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default Shipping;