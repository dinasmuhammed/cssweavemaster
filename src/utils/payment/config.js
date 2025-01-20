export const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return '/api';
  
  const currentOrigin = window.location.origin;
  return process.env.NODE_ENV === 'production'
    ? `${currentOrigin}/api`
    : 'http://localhost:3001/api';
};

export const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      console.log('Razorpay already loaded');
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded');
      resolve(true);
    };
    script.onerror = (error) => {
      console.error('Error loading Razorpay script:', error);
      reject(new Error('Failed to load Razorpay script'));
    };
    document.body.appendChild(script);
  });
};

export const getRazorpayConfig = () => {
  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
  if (!keyId) {
    throw new Error('Razorpay Key ID is not configured');
  }

  return {
    keyId,
    currency: 'INR',
    name: "Henna by Fathima",
    description: "Order Payment",
    theme: {
      color: "#607973"
    }
  };
};