export const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return '/api';
  
  const currentOrigin = window.location.origin;
  return process.env.NODE_ENV === 'production'
    ? `${currentOrigin}/api`
    : 'http://localhost:3001/api';
};

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    document.body.appendChild(script);
  });
};