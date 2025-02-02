const Razorpay = require('razorpay');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  'https://kgemzehqmlgizepnvlsk.supabase.co',
  process.env.SUPABASE_KEY
);

// Initialize Razorpay
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
    
    const order = await razorpay.orders.create(options);
    
    if (!order || !order.id) {
      throw new Error('Invalid order response from Razorpay');
    }
    
    // Log order creation in Supabase
    await supabase
      .from('payment_logs')
      .insert([{
        order_id: order.id,
        amount: amount,
        currency: currency,
        status: 'created',
        created_at: new Date().toISOString()
      }]);
    
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

    const text = `${orderId}|${paymentId}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');
    
    const isValid = generated_signature === signature;

    // Update payment status in Supabase
    await supabase
      .from('payment_logs')
      .update({ 
        status: isValid ? 'verified' : 'failed',
        payment_id: paymentId,
        verified_at: new Date().toISOString()
      })
      .match({ order_id: orderId });

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