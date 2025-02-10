
import { createOrder } from '../../api/razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'INR' } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const order = await createOrder(amount, currency);
    console.log('Order created:', order);
    
    if (!order || !order.id) {
      return res.status(500).json({ error: 'Invalid order response from Razorpay' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error('Error in create-order API:', error);
    res.status(500).json({ 
      error: 'Failed to create order',
      details: error.message
    });
  }
}
