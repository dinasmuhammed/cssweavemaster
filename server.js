const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();

// Initialize Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://cd184ac6-e88a-46fc-b24e-0c575231c18c.lovableproject.com'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Webhook handler for Razorpay events
app.post('/api/razorpay-webhook', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    const isValid = razorpay.webhooks.verifySignature(
      JSON.stringify(req.body),
      signature,
      secret
    );

    if (!isValid) {
      throw new Error('Invalid webhook signature');
    }

    // Log webhook event
    await supabase
      .from('webhook_logs')
      .insert({
        event_type: req.body.event,
        payload: req.body,
        status: 'received'
      });

    // Process the webhook event
    const event = req.body.event;
    const paymentId = req.body.payload.payment?.entity?.id;

    if (event === 'payment.captured') {
      await supabase
        .from('razorpay_payments')
        .update({ 
          status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('payment_id', paymentId);
    }

    res.json({ status: 'success' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ 
      error: 'Webhook processing failed',
      details: error.message
    });
  }
});

app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', orderData } = req.body;
    
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    // Update Supabase payment record with order details
    if (orderData?.paymentLogId) {
      await supabase
        .from('razorpay_payments')
        .update({ 
          order_id: order.id,
          status: 'created'
        })
        .eq('id', orderData.paymentLogId);
    }
    
    res.json({ order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      error: 'Failed to create order', 
      details: error.message
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

    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    const isValid = generated_signature === razorpay_signature;

    if (!isValid) {
      // Update payment status in Supabase
      if (orderData?.paymentLogId) {
        await supabase
          .from('razorpay_payments')
          .update({ 
            status: 'failed',
            error_message: 'Invalid payment signature'
          })
          .eq('id', orderData.paymentLogId);
      }
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Update payment status in Supabase
    if (orderData?.paymentLogId) {
      await supabase
        .from('razorpay_payments')
        .update({ 
          status: 'completed',
          payment_id: razorpay_payment_id
        })
        .eq('id', orderData.paymentLogId);
    }

    res.status(200).json({ message: 'Payment verified successfully' });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      error: 'Payment verification failed', 
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
