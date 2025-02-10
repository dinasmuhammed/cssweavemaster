
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const createOrder = async (amount, currency = 'INR') => {
  try {
    if (!amount || isNaN(amount)) {
      throw new Error('Invalid amount provided');
    }

    const { data, error } = await supabase
      .functions.invoke('get-secrets', {
        body: { keys: ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'] }
      });

    if (error) {
      console.error('Error fetching Razorpay keys:', error);
      throw new Error('Failed to fetch Razorpay keys');
    }

    const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = data;

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay keys not found');
    }

    const options = {
      amount: amount,
      currency,
      receipt: `rcpt_${uuidv4()}`,
    };

    console.log('Creating order with options:', { ...options });
    
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)
      },
      body: JSON.stringify(options)
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Razorpay API error:', responseData);
      throw new Error(responseData.error?.description || 'Failed to create Razorpay order');
    }

    if (!responseData || !responseData.id) {
      throw new Error('Invalid order response from Razorpay');
    }

    // Log order creation
    await supabase
      .from('payment_logs')
      .insert([{
        order_id: responseData.id,
        amount: amount,
        currency: currency,
        status: 'created',
        created_at: new Date().toISOString(),
        metadata: { receipt: options.receipt }
      }]);

    return responseData;
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

    const { data: { RAZORPAY_KEY_SECRET } } = await supabase
      .functions.invoke('get-secrets', {
        body: { keys: ['RAZORPAY_KEY_SECRET'] }
      });

    if (!RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay secret key not found');
    }

    const text = `${orderId}|${paymentId}`;
    const generated_signature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');
    
    const isValid = generated_signature === signature;

    // Update payment status in Supabase
    await supabase
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

    return isValid;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};
