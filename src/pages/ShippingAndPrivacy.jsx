import React from 'react';

const ShippingAndPrivacy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Shipping & Privacy Policy</h1>
      <div className="prose max-w-none">
        <section>
          <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">Shipping Information</h2>
          <h3>1. Shipping Methods</h3>
          <p>We offer the following shipping methods:</p>
          <ul>
            <li>Standard Shipping (5-7 business days)</li>
            <li>Express Shipping (2-3 business days)</li>
            <li>International Shipping (10-14 business days)</li>
          </ul>
          <h3>2. Shipping Costs</h3>
          <p>Shipping costs are calculated based on the weight of your order and your location. You can view the shipping cost at checkout before completing your purchase.</p>
          <h3>3. Order Tracking</h3>
          <p>Once your order has been shipped, you will receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.</p>
          <h3>4. International Shipping</h3>
          <p>We ship internationally to most countries. Please note that international orders may be subject to import duties and taxes, which are the responsibility of the recipient.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-4">Privacy Policy</h2>
          <p>At Henna by Fathima, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.</p>
          <h3>1. Information We Collect</h3>
          <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.</p>
          <h3>2. How We Use Your Information</h3>
          <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
          <h3>3. Will Your Information Be Shared With Anyone?</h3>
          <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
          <h3>4. Do We Use Cookies And Other Tracking Technologies?</h3>
          <p>We may use cookies and similar tracking technologies to access or store information.</p>
        </section>
      </div>
    </div>
  );
};

export default ShippingAndPrivacy;