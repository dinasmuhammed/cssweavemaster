import { supabase } from '../../lib/supabase';

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

export const getRazorpayConfig = async () => {
  try {
    const { data: secrets, error } = await supabase
      .from('secrets')
      .select('value')
      .in('name', ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'])
      .throwOnError();

    if (error) throw error;

    const config = {
      keyId: secrets.find(s => s.name === 'RAZORPAY_KEY_ID')?.value || import.meta.env.VITE_RAZORPAY_KEY_ID,
      keySecret: secrets.find(s => s.name === 'RAZORPAY_KEY_SECRET')?.value,
      currency: 'INR',
      name: "Henna by Fathima",
      description: "Order Payment",
      theme: {
        color: "#607973"
      }
    };

    return config;
  } catch (error) {
    console.error('Error fetching Razorpay config:', error);
    throw error;
  }
};