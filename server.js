require('dotenv').config();
const express = require('express');
const { sendOrderEmail } = require('./src/utils/emailUtils');
const { createOrder } = require('./src/api/razorpay');

const app = express();
app.use(express.json());

app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', couponCode } = req.body;
    
    // Apply coupon discount if valid
    let finalAmount = amount;
    if (couponCode) {
      const validCoupons = {
        'WELCOME10': 10,
        'SPECIAL20': 20,
        'HENNA25': 25
      };
      
      const discountPercentage = validCoupons[couponCode.toUpperCase()];
      if (discountPercentage) {
        finalAmount = amount - (amount * discountPercentage / 100);
      }
    }

    const order = await createOrder(finalAmount, currency);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      error: 'Failed to create order', 
      details: error.message 
    });
  }
});

app.post('/api/send-order-email', async (req, res) => {
  try {
    await sendOrderEmail(req.body);
    res.status(200).json({ message: 'Order email sent successfully' });
  } catch (error) {
    console.error('Error sending order email:', error);
    res.status(500).json({ error: 'Failed to send order email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});