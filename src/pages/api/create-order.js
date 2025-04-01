
import { createOrder } from '../../api/razorpay';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency = 'INR' } = req.body;

    if (!amount) {
      console.error('Missing amount in request:', req.body);
      return res.status(400).json({ error: 'Amount is required' });
    }

    console.log('Creating Razorpay order with amount:', amount, 'currency:', currency);
    const order = await createOrder(amount, currency);
    
    if (!order || !order.id) {
      console.error('Invalid order response:', order);
      return res.status(500).json({ error: 'Invalid order response from Razorpay' });
    }

    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Error in create-order API:', error);
    return res.status(500).json({ 
      error: 'Failed to create order',
      details: error.message || 'Unknown error occurred'
    });
  }
}
