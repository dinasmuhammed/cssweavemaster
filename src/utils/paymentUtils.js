import { supabase } from '../lib/supabase';
import { toast } from "sonner";

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
    await loadRazorpayScript();

    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        currency: 'INR',
        orderData
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const { order } = await response.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
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
          // Log payment attempt to Supabase
          await supabase.from('payment_logs').insert([
            {
              order_id: order.id,
              payment_id: response.razorpay_payment_id,
              amount: amount,
              status: 'processing',
              customer_details: customerDetails
            }
          ]);

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

          // Update payment status in Supabase
          await supabase
            .from('payment_logs')
            .update({ status: 'completed' })
            .match({ order_id: order.id });

          toast.success("Payment successful!");
          if (onSuccess) onSuccess(response);
        } catch (error) {
          console.error('Payment verification error:', error);
          // Update payment status in Supabase
          await supabase
            .from('payment_logs')
            .update({ 
              status: 'failed',
              error_message: error.message 
            })
            .match({ order_id: order.id });

          toast.error(error.message || "Payment verification failed");
          if (onError) onError(error);
        }
      },
      modal: {
        ondismiss: async function() {
          // Log cancelled payment in Supabase
          await supabase
            .from('payment_logs')
            .update({ status: 'cancelled' })
            .match({ order_id: order.id });

          toast.error("Payment cancelled");
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
    toast.error(error.message || "Failed to initialize payment");
    if (onError) onError(error);
  }
};