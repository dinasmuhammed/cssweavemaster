import { supabase } from '../../lib/supabase';
import { toast } from "sonner";
import { getApiBaseUrl, loadRazorpayScript } from './config';

export const initializeRazorpayPayment = async (orderData, amount, customerDetails, onSuccess, onError) => {
  try {
    console.log('Loading Razorpay script...');
    await loadRazorpayScript();
    
    // Log payment initialization
    const { data: paymentLog, error: logError } = await supabase
      .from('payment_logs')
      .insert([{
        amount: amount,
        customer_details: customerDetails,
        status: 'initiated',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (logError) {
      console.error('Error logging payment initiation:', logError);
    }

    const apiBaseUrl = getApiBaseUrl();
    console.log('Using API base URL:', apiBaseUrl);

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
          paymentLogId: paymentLog?.id
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const { order } = await response.json();
    console.log('Order created:', order);

    // Update payment log with order ID
    if (paymentLog?.id) {
      await supabase
        .from('payment_logs')
        .update({ 
          razorpay_order_id: order.id,
          status: 'order_created'
        })
        .eq('id', paymentLog.id);
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
          
          if (paymentLog?.id) {
            await supabase
              .from('payment_logs')
              .update({ 
                status: 'payment_successful',
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                completed_at: new Date().toISOString()
              })
              .eq('id', paymentLog.id);
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
                paymentLogId: paymentLog?.id
              }
            }),
          });

          if (!verifyResponse.ok) {
            throw new Error('Payment verification failed');
          }

          toast.success("Payment successful!");
          if (onSuccess) onSuccess(response);
        } catch (error) {
          console.error('Payment verification error:', error);
          
          if (paymentLog?.id) {
            await supabase
              .from('payment_logs')
              .update({ 
                status: 'verification_failed',
                error_message: error.message 
              })
              .eq('id', paymentLog.id);
          }

          toast.error(error.message || "Payment verification failed");
          if (onError) onError(error);
        }
      },
      modal: {
        ondismiss: async function() {
          console.log('Payment modal dismissed');
          if (paymentLog?.id) {
            await supabase
              .from('payment_logs')
              .update({ 
                status: 'cancelled',
                error_message: 'Payment cancelled by user'
              })
              .eq('id', paymentLog.id);
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