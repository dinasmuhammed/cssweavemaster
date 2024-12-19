import { toast } from "sonner";
import { RAZORPAY_CONFIG, validatePaymentAmount } from './paymentConfig';

const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
    document.body.appendChild(script);
  });
};

export const validatePaymentForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) errors.name = "Name is required";
  if (!formData.address?.trim()) errors.address = "Address is required";
  if (!formData.area?.trim()) errors.area = "Area is required";
  if (!formData.state?.trim()) errors.state = "State is required";
  if (!formData.district?.trim()) errors.district = "District is required";
  if (!formData.mobile?.trim()) errors.mobile = "Mobile number is required";
  else if (!/^\d{10}$/.test(formData.mobile)) errors.mobile = "Invalid mobile number";
  if (!formData.email?.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email format";
  if (!formData.pincode?.trim()) errors.pincode = "Pincode is required";
  else if (!/^\d{6}$/.test(formData.pincode)) errors.pincode = "Invalid pincode";

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const initializeRazorpayPayment = async (orderData, amount, customerDetails, onSuccess, onError) => {
  try {
    if (!validatePaymentAmount(amount)) {
      throw new Error('Invalid payment amount');
    }

    await loadRazorpayScript();

    if (!window.Razorpay) {
      throw new Error('Razorpay SDK failed to load');
    }

    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        currency: RAZORPAY_CONFIG.currency,
        receipt: orderData.orderId,
        notes: {
          orderDetails: JSON.stringify(orderData)
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create order');
    }

    const { order } = await response.json();
    
    const options = {
      key: process.env.RAZORPAY_KEY_ID || window.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: RAZORPAY_CONFIG.name,
      description: RAZORPAY_CONFIG.description,
      order_id: order.id,
      prefill: {
        name: customerDetails.name,
        email: customerDetails.email,
        contact: customerDetails.mobile,
      },
      notes: {
        address: customerDetails.address,
      },
      theme: RAZORPAY_CONFIG.theme,
      handler: async function(response) {
        try {
          const verifyResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: {
                ...orderData,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id
              }
            }),
          });

          if (!verifyResponse.ok) {
            throw new Error('Payment verification failed');
          }

          const emailResponse = await fetch('/api/send-order-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...orderData,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id
            }),
          });

          if (!emailResponse.ok) {
            console.error('Failed to send order email');
          }

          toast.success("Payment successful!");
          if (onSuccess) onSuccess(response);
        } catch (error) {
          console.error('Error in payment verification or email:', error);
          toast.error(error.message || "Payment verification failed");
          if (onError) onError(error);
        }
      },
      modal: {
        ondismiss: function() {
          toast.error("Payment cancelled");
          if (onError) onError(new Error('Payment cancelled'));
        },
        escape: false,
        backdropclose: false
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      toast.error(response.error.description || "Payment failed");
      if (onError) onError(new Error(response.error.description));
    });
    
    rzp.open();
    
  } catch (error) {
    console.error('Error initializing payment:', error);
    toast.error(error.message || "Failed to initialize payment");
    if (onError) onError(error);
  }
};