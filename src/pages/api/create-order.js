import { createOrder } from '../../api/razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'INR' } = req.body;
    const order = await createOrder(amount, currency);
    
    // Log the order creation for debugging
    console.log('Order created:', order);
    
    res.status(200).json(order);
  } catch (error) {
    console.error('Error in create-order API:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
}