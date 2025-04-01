
import { api } from './apiUtils';
import { getRazorpayConfig } from '../api/razorpay';

export const validatePaymentForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) errors.name = "Name is required";
  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email format";
  }
  if (!formData.mobile?.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\d{10}$/.test(formData.mobile)) {
    errors.mobile = "Invalid mobile number";
  }
  if (!formData.address?.trim()) errors.address = "Address is required";
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const loadRazorpayScript = async () => {
  if (window.Razorpay) {
    return Promise.resolve();
  }
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Failed to load Razorpay script'));
    document.body.appendChild(script);
  });
};

export const initializeRazorpayPayment = async (orderData, amount, customerDetails, onSuccess, onError) => {
  try {
    console.log('Initializing Razorpay payment with amount:', amount);
    
    // Load Razorpay script if not already loaded
    await loadRazorpayScript();

    // Create order on server
    const data = await api.createOrder(amount);
    console.log('Razorpay order created successfully:', data);
    
    if (!data.order?.id) {
      throw new Error('Invalid order response from server');
    }

    // Get Razorpay config
    const razorpayConfig = getRazorpayConfig();
    
    const options = {
      ...razorpayConfig,
      amount: data.order.amount, // Amount is already in paise from the API
      currency: data.order.currency,
      order_id: data.order.id,
      prefill: {
        name: customerDetails.name,
        email: customerDetails.email,
        contact: customerDetails.mobile,
      },
      handler: async function(response) {
        try {
          // Verify payment on server
          const verifyResult = await api.verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderData
          });

          console.log('Razorpay payment verified successfully');
          if (onSuccess) onSuccess(response);
        } catch (error) {
          console.error('Razorpay payment verification error:', error);
          if (onError) onError(error);
        }
      },
      modal: {
        ondismiss: function() {
          if (onError) onError(new Error('Payment cancelled by user'));
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.error('Razorpay payment initialization error:', error);
    if (onError) onError(error);
  }
};
