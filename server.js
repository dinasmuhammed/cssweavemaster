const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const { sendOrderEmail } = require('./src/utils/emailUtils');
require('dotenv').config();

const app = express();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID,
  key_secret: process.env.VITE_RAZORPAY_KEY_SECRET
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;
    
    if (!amount) {
      console.error('Missing amount in request body:', req.body);
      return res.status(400).json({ error: 'Amount is required' });
    }

    console.log('Creating order with amount:', amount, 'currency:', currency);
    
    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Convert to smallest currency unit (paise)
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    console.log('Razorpay order options:', options);

    const order = await razorpay.orders.create(options);
    console.log('Order created successfully:', order);
    
    if (!order || !order.id) {
      console.error('Invalid order response:', order);
      return res.status(500).json({ error: 'Failed to create order: Invalid response' });
    }
    
    res.json({ order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      error: 'Failed to create order', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

app.post('/api/verify-payment', async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderData 
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error('Missing payment verification parameters:', req.body);
      return res.status(400).json({ error: 'Missing required payment verification parameters' });
    }

    console.log('Verifying payment:', {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id
    });

    // Verify payment signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.VITE_RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    const isValid = generated_signature === razorpay_signature;

    if (!isValid) {
      console.error('Invalid payment signature');
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    try {
      await sendOrderEmail(orderData);
      console.log('Order confirmation email sent successfully');
    } catch (emailError) {
      console.error('Error sending order email:', emailError);
    }

    console.log('Payment verified successfully');
    res.status(200).json({ message: 'Payment verified successfully' });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      error: 'Payment verification failed', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});