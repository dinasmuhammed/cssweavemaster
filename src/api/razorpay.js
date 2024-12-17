const Razorpay = require('razorpay');

const RAZORPAY_KEY_ID = "rzp_live_lhUJoR9PnyhX0q";
const RAZORPAY_SECRET = "vmfoRGD7O162U98luOgz38Dv";

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET,
});

const createOrder = async (amount, currency = 'INR') => {
  try {
    if (!amount || amount <= 0) {
      throw new Error('Invalid amount');
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to smallest currency unit (paise)
      currency,
      receipt: `order_${Date.now()}`,
      payment_capture: 1
    };
    
    const order = await razorpay.orders.create(options);
    console.log('Razorpay order created:', order);
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new Error(`Failed to create order: ${error.message}`);
  }
};

const verifyPayment = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  try {
    const crypto = require('crypto');
    const generated_signature = crypto
      .createHmac('sha256', RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');
      
    return generated_signature === razorpay_signature;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  RAZORPAY_KEY_ID
};