import { supabase } from '../lib/supabase';
import { toast } from "sonner";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    document.body.appendChild(script);
  });
};

// Get the API base URL based on environment
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return '/api';
  
  const currentOrigin = window.location.origin;
  return process.env.NODE_ENV === 'production'
    ? `${currentOrigin}/api`
    : 'http://localhost:3001/api';
};

export const initializeRazorpayPayment = async (orderData, amount, customerDetails, onSuccess, onError) => {
  try {
    console.log('Loading Razorpay script...');
    await loadRazorpayScript();
    console.log('Initializing payment with amount:', amount);

    const apiBaseUrl = getApiBaseUrl();
    console.log('Using API base URL:', apiBaseUrl);

    // Get user if logged in, but proceed even if not authenticated
    const { data: { user } } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }));
    let paymentRecord = null;

    if (user) {
      try {
        const { data: record, error: insertError } = await supabase
          .from('payments')
          .insert([{
            user_id: user.id,
            amount: amount,
            currency: 'INR',
            status: 'pending',
            customer_details: customerDetails
          }])
          .select()
          .single();

        if (insertError) {
          console.error('Failed to create payment record:', insertError);
        } else {
          paymentRecord = record;
        }
      } catch (dbError) {
        console.error('Database operation failed:', dbError);
      }
    }

    console.log('Creating order with Razorpay...');
    const response = await fetch(`${apiBaseUrl}/create-order`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        amount: Math.round(amount),
        currency: 'INR',
        orderData: {
          ...orderData,
          paymentId: paymentRecord?.id
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Order creation failed:', errorData);
      throw new Error(errorData.error || 'Failed to create order');
    }

    const { order } = await response.json();
    console.log('Order created:', order);

    if (!order || !order.id) {
      throw new Error('Invalid order response');
    }

    // Update payment record with Razorpay order ID
    if (user && paymentRecord) {
      await supabase
        .from('payments')
        .update({ razorpay_order_id: order.id })
        .eq('id', paymentRecord.id)
        .catch(console.error);
    }

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
          console.log('Payment successful, verifying...', response);
          
          if (user && paymentRecord) {
            await supabase
              .from('payments')
              .update({ 
                status: 'success',
                razorpay_payment_id: response.razorpay_payment_id
              })
              .eq('id', paymentRecord.id)
              .catch(console.error);
          }

          const verifyResponse = await fetch(`${apiBaseUrl}/verify-payment`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: {
                ...orderData,
                paymentId: paymentRecord?.id
              }
            }),
          });

          if (!verifyResponse.ok) {
            throw new Error('Payment verification failed');
          }

          console.log('Payment verified successfully');
          toast.success("Payment successful!");
          if (onSuccess) onSuccess(response);
        } catch (error) {
          console.error('Payment verification error:', error);
          
          if (user && paymentRecord) {
            await supabase
              .from('payments')
              .update({ 
                status: 'failed',
                error_message: error.message 
              })
              .eq('id', paymentRecord.id)
              .catch(console.error);
          }

          toast.error(error.message || "Payment verification failed");
          if (onError) onError(error);
        }
      },
      modal: {
        ondismiss: async function() {
          console.log('Payment modal dismissed');
          if (user && paymentRecord) {
            await supabase
              .from('payments')
              .update({ 
                status: 'failed',
                error_message: 'Payment cancelled by user'
              })
              .eq('id', paymentRecord.id)
              .catch(console.error);
          }

          toast.error("Payment cancelled");
          if (onError) onError(new Error('Payment cancelled by user'));
        }
      },
      theme: {
        color: "#607973"
      }
    };

    console.log('Opening Razorpay payment modal...');
    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.error('Payment initialization error:', error);
    toast.error(error.message || "Failed to initialize payment");
    if (onError) onError(error);
  }
};