// Ensure Razorpay script is loaded properly
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    document.body.appendChild(script);
  });
};

export const initializeRazorpayPayment = async (orderData, amount, customerDetails, onSuccess, onError) => {
  try {
    // Ensure Razorpay script is loaded
    await loadRazorpayScript();
    
    if (typeof window.Razorpay !== 'function') {
      throw new Error('Razorpay SDK failed to load');
    }

    // Create order on server
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to smallest currency unit
        currency: 'INR',
        orderData
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create order');
    }

    const data = await response.json();
    
    if (!data.order?.id) {
      throw new Error('Invalid order response from server');
    }

    // Initialize Razorpay options
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
          const verifyResponse = await fetch('/api/verify-payment', {
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

          if (onSuccess) onSuccess(response);
        } catch (error) {
          console.error('Payment verification error:', error);
          if (onError) onError(error);
        }
      },
      modal: {
        ondismiss: function() {
          if (onError) onError(new Error('Payment cancelled by user'));
        }
      },
      theme: {
        color: "#607973"
      }
    };

    // Create Razorpay instance and open payment modal
    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.error('Payment initialization error:', error);
    if (onError) onError(error);
  }
};