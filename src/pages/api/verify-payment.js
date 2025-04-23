
import { supabase } from '../../utils/supabaseClient';
import crypto from 'crypto';

// Get Razorpay secret key from environment variables
const RAZORPAY_KEY_SECRET = import.meta.env.VITE_RAZORPAY_KEY_SECRET || 'lEV2FCzPMS4n7c23VfnUQd5W';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing required payment details' });
    }
    
    // Verify the Razorpay payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");
    
    const isValid = expectedSignature === razorpay_signature;
    
    if (!isValid) {
      // Update payment status in Supabase
      await supabase
        .from('payment_logs')
        .update({ 
          status: 'invalid_signature',
          verified_at: new Date().toISOString(),
          metadata: {
            verification_error: 'Invalid signature',
            verified_at: new Date().toISOString()
          }
        })
        .eq('order_id', razorpay_order_id);
        
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Update payment status in Supabase
    await supabase
      .from('payment_logs')
      .update({ 
        status: 'verified',
        payment_id: razorpay_payment_id,
        verified_at: new Date().toISOString(),
        metadata: {
          verified_at: new Date().toISOString()
        }
      })
      .eq('order_id', razorpay_order_id);

    // Payment is valid, return success response
    res.status(200).json({ 
      success: true,
      message: 'Payment verified successfully',
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id
    });
  } catch (error) {
    console.error('Error in verify-payment API:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to verify payment',
      error: error.message
    });
  }
}
