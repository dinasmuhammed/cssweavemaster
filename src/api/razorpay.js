const Razorpay = require('razorpay');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL || 'https://kgemzehqmlgizepnvlsk.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnZW16ZWhxbWxnaXplcG52bHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5OTYyOTIsImV4cCI6MjA1MTU3MjI5Mn0.zeQu-Gh7saqytq4B93PtEh2gpKjKUT4zvD70vovckBw'
);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = async (amount, currency = 'INR') => {
  try {
    console.log('Creating order with amount:', amount, 'currency:', currency);
    
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
      console.log('Order logged in Supabase');
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
    console.log('Verifying payment:', { orderId, paymentId });
    
    if (!orderId || !paymentId || !signature) {
      throw new Error('Missing required payment verification parameters');
    }

    const text = `${orderId}|${paymentId}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');
    
    const isValid = generated_signature === signature;
    console.log('Signature verification result:', isValid);

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
      console.log('Payment verification logged in Supabase');
    } catch (supabaseError) {
      console.error('Error updating payment log in Supabase:', supabaseError);
      // Continue with verification even if logging fails
    }

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