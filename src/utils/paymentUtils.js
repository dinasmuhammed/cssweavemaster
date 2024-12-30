const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    // First check if Razorpay is already available globally
    if (window.Razorpay && typeof window.Razorpay === 'function') {
      resolve(window.Razorpay);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      // Ensure Razorpay is available after script loads
      if (window.Razorpay && typeof window.Razorpay === 'function') {
        console.log('Razorpay SDK loaded successfully');
        resolve(window.Razorpay);
      } else {
        console.error('Razorpay SDK failed to initialize properly');
        reject(new Error('Razorpay SDK failed to initialize properly'));
      }
    };
    
    script.onerror = (error) => {
      console.error('Failed to load Razorpay SDK:', error);
      reject(new Error('Failed to load Razorpay SDK'));
    };

    document.body.appendChild(script);
  });
};

export const validatePaymentForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) errors.name = "Name is required";
  if (!formData.email?.trim()) errors.email = "Email is required";
  if (!formData.mobile?.trim()) errors.mobile = "Mobile number is required";
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const initializeRazorpayPayment = async (orderData, amount, customerDetails, onSuccess, onError) => {
  try {
    console.log('Starting Razorpay payment initialization...');
    
    // Load Razorpay SDK
    const RazorpayClass = await loadRazorpayScript();
    console.log('Razorpay SDK loaded, creating order...');

    const apiUrl = process.env.API_URL || 'https://cd184ac6-e88a-46fc-b24e-0c575231c18c.lovableproject.com';
    
    // Create order
    const response = await fetch(`${apiUrl}/api/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to smallest currency unit
        currency: 'INR'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const { order } = await response.json();
    console.log('Order created successfully:', order);

    // Configure Razorpay options
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Henna by Fathima",
      description: "Order Payment",
      order_id: order.id,
      prefill: {
        name: customerDetails.name,
        email: customerDetails.email,
        contact: customerDetails.mobile,
      },
      handler: async function(response) {
        try {
          console.log('Payment successful, verifying...');
          const verifyResponse = await fetch(`${apiUrl}/api/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData
            }),
          });

          if (!verifyResponse.ok) {
            throw new Error('Payment verification failed');
          }

          const data = await verifyResponse.json();
          console.log('Payment verified successfully');
          if (onSuccess) onSuccess(data);
        } catch (error) {
          console.error('Payment verification error:', error);
          if (onError) onError(error);
        }
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal dismissed');
          if (onError) onError(new Error('Payment cancelled'));
        }
      },
      theme: {
        color: "#607973"
      }
    };

    // Create and open Razorpay instance
    console.log('Opening Razorpay payment modal...');
    const razorpay = new RazorpayClass(options);
    razorpay.open();
  } catch (error) {
    console.error('Payment initialization error:', error);
    if (onError) onError(error);
  }
};