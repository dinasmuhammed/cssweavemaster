
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
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load Razorpay script'));
        document.body.appendChild(script);
      });
    }

    // Amount should be in rupees here, will be converted to paise in the API
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount, // Send in rupees, API will handle conversion
        currency: 'INR',
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from server:', errorData);
      throw new Error(errorData.error || errorData.details || 'Failed to create order');
    }

    const data = await response.json();
    console.log('Order created successfully:', data);
    
    if (!data.order?.id) {
      throw new Error('Invalid order response from server');
    }

    const { data: secretsData, error: secretsError } = await supabase
      .functions.invoke('get-secrets', {
        body: { keys: ['RAZORPAY_KEY_ID'] }
      });

    if (secretsError || !secretsData.RAZORPAY_KEY_ID) {
      throw new Error('Failed to fetch Razorpay key');
    }

    const options = {
      key: secretsData.RAZORPAY_KEY_ID,
      amount: data.order.amount, // Amount is already in paise from the API
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
            const errorData = await verifyResponse.json();
            throw new Error(errorData.error || 'Payment verification failed');
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
          if (onError) onError(new Error('Payment cancelled by user'));
        }
      },
      theme: {
        color: "#607973"
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.error('Payment initialization error:', error);
    if (onError) onError(error);
  }
};
