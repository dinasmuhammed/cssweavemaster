const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    document.body.appendChild(script);
  });
};

export const validatePaymentForm = (formData) => {
  const errors = {};
  if (!formData.name?.trim()) errors.name = "Name is required";
  if (!formData.email?.trim()) errors.email = "Email is required";
  if (!formData.mobile?.trim()) errors.mobile = "Mobile number is required";
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const initializeRazorpayPayment = async (orderData, amount, customerDetails, onSuccess, onError) => {
  try {
    // Ensure Razorpay script is loaded
    await loadRazorpayScript();

    // Create order on server
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        currency: 'INR'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const { order } = await response.json();

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

          if (onSuccess) {
            onSuccess(response);
          }
        } catch (error) {
          if (onError) {
            onError(error);
          }
        }
      },
      modal: {
        ondismiss: function() {
          if (onError) {
            onError(new Error('Payment cancelled'));
          }
        }
      }
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
};