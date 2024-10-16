import React from 'react';

const CancellationAndRefund = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Cancellation and Refund Policy</h1>
      <div className="prose max-w-none">
        <h2>1. Cancellation Policy</h2>
        <p>We understand that circumstances may change. You can cancel your order within 24 hours of placing it without any charges. For cancellations after 24 hours, please contact our customer support team.</p>
        <h2>2. Refund Policy</h2>
        <p>We strive to ensure your satisfaction with every purchase. If you are not completely satisfied with your purchase, you can return it within 30 days of receipt for a full refund of the item price.</p>
        <h3>2.1 Eligibility for Refunds</h3>
        <ul>
          <li>The product must be unused, in the same condition that you received it.</li>
          <li>It must be in the original packaging.</li>
          <li>You must have the receipt or proof of purchase.</li>
        </ul>
        <h3>2.2 Non-refundable Items</h3>
        <p>Certain types of items cannot be returned, including:</p>
        <ul>
          <li>Custom-made or personalized products</li>
          <li>Perishable goods (such as food or flowers)</li>
          <li>Digital products</li>
        </ul>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default CancellationAndRefund;