import { verifyPayment } from '../../api/razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;
    
    const isValid = verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Here you would typically save the order to your database
    // and perform any other necessary actions

    res.status(200).json({ message: 'Payment verified successfully' });
  } catch (error) {
    console.error('Error in verify-payment API:', error);
    res.status(500).json({ message: 'Failed to verify payment' });
  }
}