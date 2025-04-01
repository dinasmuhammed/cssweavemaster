
const express = require('express');
const cors = require('cors');
const { sendOrderEmail } = require('./src/utils/emailUtils');
const crypto = require('crypto');

const app = express();

// Razorpay keys (updated with live keys)
const RAZORPAY_KEY_ID = 'rzp_live_VMhrs1uuU9TTJq';
const RAZORPAY_KEY_SECRET = 'lEV2FCzPMS4n7c23VfnUQd5W';

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
    const { amount, currency } = req.body;
    
    if (!amount) {
      console.error('Missing amount in request body:', req.body);
      return res.status(400).json({ error: 'Amount is required' });
    }

    console.log('Creating order with amount:', amount, 'currency:', currency);
    
    // Convert amount to paise if it's in rupees
    const amountInPaise = amount < 100 ? Math.round(amount * 100) : amount;
    
    // Make request to Razorpay API
    const Razorpay = require('razorpay');
    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET
    });
    
    const orderOptions = {
      amount: amountInPaise,
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`
    };
    
    const order = await razorpay.orders.create(orderOptions);
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

    // Verify the payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");
      
    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      console.error('Invalid payment signature');
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Send order confirmation email
    try {
      await sendOrderEmail(orderData);
      console.log('Order confirmation email sent successfully');
    } catch (emailError) {
      console.error('Error sending order email:', emailError);
      // Continue with payment success even if email fails
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
