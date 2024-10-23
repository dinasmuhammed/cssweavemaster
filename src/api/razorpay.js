const RAZORPAY_KEY_ID = "rzp_live_lhUJoR9PnyhX0q";
const RAZORPAY_SECRET = "vmfoRGD7O162U98luOgz38Dv";

const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET,
});

export const createOrder = async (amount, currency = 'INR') => {
  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: `order_${Date.now()}`,
      payment_capture: 1
    });
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new Error('Failed to create order');
  }
};

export const verifyPayment = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  const crypto = require('crypto');
  const generated_signature = crypto
    .createHmac('sha256', RAZORPAY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');
    
  return generated_signature === razorpay_signature;
};