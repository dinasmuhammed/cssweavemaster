
import { v4 as uuidv4 } from 'uuid';
import { api } from '../utils/apiUtils';

// Razorpay live key for client-side
const RAZORPAY_KEY_ID = 'rzp_live_VMhrs1uuU9TTJq';

export const createOrder = async (amount, currency = 'INR') => {
  try {
    if (!amount || isNaN(amount)) {
      throw new Error('Invalid amount provided');
    }

    // Convert amount to paise if needed (if it's in rupees)
    const amountInPaise = amount < 100 ? Math.round(amount * 100) : amount;

    const options = {
      amount: amountInPaise,
      currency,
      receipt: `rcpt_${uuidv4()}`,
    };

    console.log('Creating Razorpay order with options:', { ...options, amount_in_rupees: amountInPaise / 100 });
    
    // Use the API utility to communicate with server
    const responseData = await api.createOrder(amountInPaise, currency);

    if (!responseData || !responseData.order?.id) {
      throw new Error('Invalid order response from Razorpay');
    }

    return responseData.order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

export const verifyPayment = async (orderId, paymentId, signature) => {
  try {
    if (!orderId || !paymentId || !signature) {
      throw new Error('Missing required payment verification parameters');
    }

    // Use the API utility to verify payment
    const data = await api.verifyPayment({
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature
    });
    
    return data.success || data.message === 'Payment verified successfully';
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    throw error;
  }
};

// Export for client-side use
export const getRazorpayConfig = () => ({
  key_id: RAZORPAY_KEY_ID,
  currency: 'INR',
  name: "Henna by Fathima",
  description: "Order Payment",
  theme: {
    color: "#607973"
  }
});
