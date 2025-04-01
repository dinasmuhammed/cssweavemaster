
import { verifyPayment } from '../../api/razorpay';

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
    const isValid = await verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

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
