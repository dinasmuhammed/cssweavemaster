const express = require('express');
const cors = require('cors');
const { sendOrderEmail } = require('./src/utils/emailUtils');
const { createOrder, verifyPayment } = require('./src/api/razorpay');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const order = await createOrder(amount, currency);
    res.json({ order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
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
      return res.status(400).json({ error: 'Missing required payment verification parameters' });
    }

    const isValid = verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    res.status(200).json({ message: 'Payment verified successfully' });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

app.post('/api/send-order-email', async (req, res) => {
  try {
    await sendOrderEmail(req.body);
    res.json({ message: 'Order email sent successfully' });
  } catch (error) {
    console.error('Error sending order email:', error);
    res.status(500).json({ error: 'Failed to send order email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});