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

export const initializeRazorpayPayment = async (orderData, amount, customerDetails, onSuccess, onError) => {
  try {
    console.log('Initializing payment with amount:', amount);
    
    if (!window.Razorpay) {
      console.log('Loading Razorpay script...');
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      await new Promise((resolve) => {
        script.onload = resolve;
        document.body.appendChild(script);
      });
      console.log('Razorpay script loaded successfully');
    }

    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to smallest currency unit (paise)
        currency: 'INR',
        orderData
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating order:', errorData);
      throw new Error(errorData.message || 'Failed to create order');
    }

    const data = await response.json();
    console.log('Order created:', data);
    
    if (!data.order?.id) {
      console.error('Invalid order response:', data);
      throw new Error('Invalid order response from server');
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
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
        console.log('Payment successful:', response);
        try {
          const verifyResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/verify-payment`, {
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
            const errorData = await verifyResponse.json();
            console.error('Payment verification failed:', errorData);
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
          if (onError) onError(new Error('Payment cancelled by user'));
        }
      },
      theme: {
        color: "#607973"
      }
    };

    console.log('Initializing Razorpay with options:', options);
    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.error('Payment initialization error:', error);
    if (onError) onError(error);
  }
};