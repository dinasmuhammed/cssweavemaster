const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      console.log('Razorpay SDK already loaded');
      resolve(window.Razorpay);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      if (window.Razorpay) {
        console.log('Razorpay SDK loaded successfully');
        resolve(window.Razorpay);
      } else {
        reject(new Error('Razorpay SDK failed to load'));
      }
    };
    
    script.onerror = () => {
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
    console.log('Starting payment initialization...');
    
    // Load Razorpay SDK
    await loadRazorpayScript();
    
    const apiUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`;
    
    // Create order
    const response = await fetch(`${apiUrl}/api/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        currency: 'INR'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const data = await response.json();
    console.log('Order created:', data);

    if (!data.order || !data.order.id) {
      throw new Error('Invalid order response');
    }

    const options = {
      key: 'rzp_live_VMhrs1uuU9TTJq',
      amount: data.order.amount,
      currency: data.order.currency,
      name: "Henna by Fathima",
      description: "Order Payment",
      order_id: data.order.id,
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

          console.log('Payment verified successfully');
          if (onSuccess) onSuccess(response);
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
    const RazorpayCheckout = window.Razorpay;
    const rzp = new RazorpayCheckout(options);
    console.log('Opening payment modal...');
    rzp.open();

  } catch (error) {
    console.error('Payment initialization error:', error);
    if (onError) onError(error);
  }
};