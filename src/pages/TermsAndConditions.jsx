import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Terms and Conditions</h1>
      <div className="prose max-w-none">
        <p>Welcome to Henna by Fathima. These terms and conditions outline the rules and regulations for the use of our website.</p>
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing this website, you accept these terms and conditions in full. Do not continue to use Henna by Fathima's website if you do not accept all of the terms and conditions stated on this page.</p>
        <h2>2. Intellectual Property Rights</h2>
        <p>Other than the content you own, under these terms, Henna by Fathima and/or its licensors own all the intellectual property rights and materials contained in this website.</p>
        <h2>3. Restrictions</h2>
        <p>You are specifically restricted from all of the following:</p>
        <ul>
          <li>publishing any website material in any other media;</li>
          <li>selling, sublicensing and/or otherwise commercializing any website material;</li>
          <li>publicly performing and/or showing any website material;</li>
          <li>using this website in any way that is or may be damaging to this website;</li>
          <li>using this website in any way that impacts user access to this website;</li>
        </ul>
        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default TermsAndConditions;