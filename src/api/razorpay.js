
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createOrder = async (amount, currency = 'INR') => {
  try {
    console.log('Creating order with amount:', amount, 'currency:', currency);
    
    if (!amount || isNaN(amount)) {
      throw new Error('Invalid amount provided');
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to smallest currency unit (paise)
      currency,
      receipt: `rcpt_${uuidv4()}`,
    };
    
    const order = await razorpay.orders.create(options);
    
    if (!order || !order.id) {
      throw new Error('Invalid order response from Razorpay');
    }
    
    // Log order creation in Supabase
    const { error: logError } = await supabase
      .from('payment_logs')
      .insert([{
        order_id: order.id,
        amount: amount,
        currency: currency,
        status: 'created',
        created_at: new Date().toISOString(),
        metadata: { receipt: options.receipt }
      }]);

    if (logError) {
      console.error('Error logging payment:', logError);
    }
    
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

export const verifyPayment = async (orderId, paymentId, signature) => {
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
    const { error: updateError } = await supabase
      .from('payment_logs')
      .update({ 
        status: isValid ? 'verified' : 'failed',
        payment_id: paymentId,
        verified_at: new Date().toISOString(),
        metadata: {
          signature_valid: isValid,
          verification_time: new Date().toISOString()
        }
      })
      .match({ order_id: orderId });

    if (updateError) {
      console.error('Error updating payment status:', updateError);
    }

    return isValid;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
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
    throw error;
  }
};
