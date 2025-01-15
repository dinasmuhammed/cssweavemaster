const Razorpay = require('razorpay');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://aibpalskveawzdqyjwaq.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpYnBhbHNrdmVhd3pkcXlqd2FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2MzE5MTksImV4cCI6MjA1MTIwNzkxOX0.tpd64y6jHkHxJ_2KHlePfYswBdTU4FNUuEfvF8qC0DY'
);

// Initialize Razorpay with environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_VMhrs1uuU9TTJq',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'lEV2FCzPMS4n7c23VfnUQd5W'
});

const createOrder = async (amount, currency = 'INR') => {
  try {
    if (!amount || isNaN(amount)) {
      throw new Error('Invalid amount provided');
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to smallest currency unit (paise)
      currency,
      receipt: `receipt_${Date.now()}`,
    };
    
    console.log('Creating Razorpay order with options:', options);
    const order = await razorpay.orders.create(options);
    
    if (!order || !order.id) {
      console.error('Invalid order response from Razorpay:', order);
      throw new Error('Invalid order response from Razorpay');
    }
    
    // Log order creation in Supabase
    try {
      await supabase
        .from('payment_logs')
        .insert([{
          order_id: order.id,
          amount: amount,
          currency: currency,
          status: 'created',
          created_at: new Date().toISOString()
        }]);
    } catch (supabaseError) {
      console.error('Error logging to Supabase:', supabaseError);
      // Continue with order creation even if logging fails
    }
    
    console.log('Order created successfully:', order);
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

const verifyPayment = async (orderId, paymentId, signature) => {
  try {
    if (!orderId || !paymentId || !signature) {
      throw new Error('Missing required payment verification parameters');
    }

    console.log('Verifying payment:', { orderId, paymentId });
    const text = `${orderId}|${paymentId}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'lEV2FCzPMS4n7c23VfnUQd5W')
      .update(text)
      .digest('hex');
    
    const isValid = generated_signature === signature;

    // Log payment verification in Supabase
    try {
      await supabase
        .from('payment_logs')
        .update({ 
          status: isValid ? 'verified' : 'failed',
          payment_id: paymentId,
          verified_at: new Date().toISOString()
        })
        .match({ order_id: orderId });
    } catch (supabaseError) {
      console.error('Error updating payment log in Supabase:', supabaseError);
      // Continue with verification even if logging fails
    }

    console.log('Payment verification result:', { isValid, orderId, paymentId });
    return isValid;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

module.exports = {
  createOrder,
  verifyPayment
};