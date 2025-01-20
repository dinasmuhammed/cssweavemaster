import { supabase } from '../lib/supabase';
import { loadRazorpayScript } from '../utils/payment/config';

export const createPaymentRecord = async (orderDetails) => {
  try {
    const { data, error } = await supabase
      .from('payment_records')
      .insert([{
        amount: orderDetails.amount,
        currency: orderDetails.currency || 'INR',
        status: 'initiated',
        customer_details: orderDetails.customerDetails
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating payment record:', error);
    throw error;
  }
};

export const updatePaymentRecord = async (orderId, updateData) => {
  try {
    const { data, error } = await supabase
      .from('payment_records')
      .update(updateData)
      .eq('order_id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating payment record:', error);
    throw error;
  }
};

export const initializePayment = async (orderDetails) => {
  try {
    // Load Razorpay script
    await loadRazorpayScript();

    // Create initial payment record
    const paymentRecord = await createPaymentRecord(orderDetails);

    // Create Razorpay order
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: orderDetails.amount,
        currency: orderDetails.currency || 'INR',
        orderData: {
          ...orderDetails,
          paymentLogId: paymentRecord.id
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const { order } = await response.json();

    // Update payment record with order ID
    await updatePaymentRecord(order.id, {
      order_id: order.id,
      status: 'created'
    });

    return {
      order,
      paymentRecord
    };
  } catch (error) {
    console.error('Payment initialization error:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentDetails) => {
  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentDetails),
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    await updatePaymentRecord(paymentDetails.razorpay_order_id, {
      payment_id: paymentDetails.razorpay_payment_id,
      status: 'completed'
    });

    return await response.json();
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};