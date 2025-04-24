
import { supabase } from '../utils/supabaseClient';
import { initializeRazorpayPayment } from '../utils/paymentUtils';
import { toast } from "sonner";

export const processPayment = async (orderData, customerDetails) => {
  try {
    // First create an order record in Supabase
    const { data: orderRecord, error: orderError } = await supabase
      .from('payment_logs')
      .insert([{
        order_id: orderData.orderId,
        amount: orderData.amount,
        currency: 'INR',
        status: 'initiated',
        metadata: {
          items: orderData.items,
          customer: customerDetails,
          initiated_at: new Date().toISOString()
        }
      }])
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order record:', orderError);
      toast.error('Unable to process payment. Please try again.');
      return null;
    }

    // Initialize Razorpay payment
    const response = await initializeRazorpayPayment(orderData, customerDetails);
    
    if (response?.success) {
      // Update the order record with payment details
      await supabase
        .from('payment_logs')
        .update({
          payment_id: response.paymentId,
          status: response.verified ? 'completed' : 'pending_verification',
          metadata: {
            ...orderRecord.metadata,
            payment_completed_at: new Date().toISOString(),
            payment_status: response.verified ? 'verified' : 'pending_verification'
          }
        })
        .eq('order_id', orderData.orderId);

      return response;
    }

    return null;
  } catch (error) {
    console.error('Payment processing error:', error);
    toast.error('Payment processing failed. Please try again.');
    return null;
  }
};

export const getPaymentStatus = async (orderId) => {
  try {
    const { data, error } = await supabase
      .from('payment_logs')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching payment status:', error);
    return null;
  }
};
