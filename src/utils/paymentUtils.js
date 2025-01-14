const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      console.log('Using existing Razorpay SDK');
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
        reject(new Error('Failed to initialize Razorpay SDK'));
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
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const initializeRazorpayPayment = async (orderData, amount, customerDetails, onSuccess, onError) => {
  try {
    console.log('Starting payment initialization...', { orderData, amount });
    
    const Razorpay = await loadRazorpayScript();
    
    const apiUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}`;
    
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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create order');
    }

    const data = await response.json();
    console.log('Order created:', data);

    if (!data.order?.id) {
      throw new Error('Invalid order response from server');
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
          console.log('Payment successful, verifying...', response);
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
            const errorData = await verifyResponse.json().catch(() => ({}));
            throw new Error(errorData.message || 'Payment verification failed');
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

    const rzp = new Razorpay(options);
    console.log('Opening payment modal...');
    rzp.open();

  } catch (error) {
    console.error('Payment initialization error:', error);
    if (onError) onError(error);
  }
};