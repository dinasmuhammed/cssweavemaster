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
          <p>At Henna by Fathima, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and safeguard your information.</p>
          
          <h3 className="text-xl font-semibold text-green-600 mt-6 mb-3">1. Information We Collect</h3>
          <p>We may collect the following information when you interact with our services:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Personal Information:</strong> Name, email address, phone number, and other details provided during bookings or inquiries.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, and pages visited.</li>
          </ul>

          <h3 className="text-xl font-semibold text-green-600 mt-6 mb-3">2. How We Use Your Information</h3>
          <p>Your personal information is used to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Process and manage bookings or inquiries.</li>
            <li>Provide customer support and respond to your requests.</li>
            <li>Improve our services and website functionality.</li>
            <li>Send promotional offers, updates, and other relevant communications (with your consent).</li>
          </ul>

          <h3 className="text-xl font-semibold text-green-600 mt-6 mb-3">3. How We Share Your Information</h3>
          <p>We do not sell or rent your personal information to third parties. We may share your data:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>With trusted service providers who assist us in operating our website and services (e.g., hosting providers).</li>
            <li>When required by law, to comply with legal obligations or protect our rights.</li>
          </ul>

          <h3 className="text-xl font-semibold text-green-600 mt-6 mb-3">4. Data Security</h3>
          <p>We implement appropriate security measures to protect your information from unauthorized access or disclosure. However, please be aware that no method of transmission over the internet is completely secure.</p>

          <h3 className="text-xl font-semibold text-green-600 mt-6 mb-3">5. Your Rights</h3>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access and review your personal information.</li>
            <li>Request corrections to inaccurate data.</li>
            <li>Withdraw your consent for receiving promotional communications.</li>
            <li>Request the deletion of your personal information.</li>
          </ul>

          <h3 className="text-xl font-semibold text-green-600 mt-6 mb-3">6. Cookies</h3>
          <p>We may use cookies to enhance your experience on our website. Cookies help us understand your preferences and provide personalized content. You can adjust your browser settings to refuse cookies if you prefer.</p>

          <h3 className="text-xl font-semibold text-green-600 mt-6 mb-3">7. Changes to This Policy</h3>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and you are encouraged to review it regularly.</p>

          <h3 className="text-xl font-semibold text-green-600 mt-6 mb-3">8. Contact Us</h3>
          <p>If you have any questions or concerns about our Privacy Policy, please contact us at: <a href="tel:+918086647124" className="text-green-800 hover:underline">+91 8086647124</a></p>
        </section>
      </div>
    </div>
  );
};

export default ShippingAndPrivacy;