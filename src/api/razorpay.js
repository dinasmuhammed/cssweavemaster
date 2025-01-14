const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_VMhrs1uuU9TTJq',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'lEV2FCzPMS4n7c23VfnUQd5W'
});

const createOrder = async (amount, currency = 'INR') => {
  try {
    if (!amount || isNaN(amount)) {
      throw new Error('Invalid amount provided');
    }

    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
    };
    
    console.log('Creating Razorpay order with options:', options);
    const order = await razorpay.orders.create(options);
    
    if (!order || !order.id) {
      throw new Error('Invalid order response from Razorpay');
    }
    
    console.log('Order created successfully:', order);
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new Error(error.message || 'Failed to create order');
  }
};

const verifyPayment = (orderId, paymentId, signature) => {
  try {
    const text = `${orderId}|${paymentId}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'lEV2FCzPMS4n7c23VfnUQd5W')
      .update(text)
      .digest('hex');
    
    const isValid = generated_signature === signature;
    console.log('Payment verification result:', { isValid, orderId, paymentId });
    return isValid;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
};

module.exports = {
  createOrder,
  verifyPayment
};