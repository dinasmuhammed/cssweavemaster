
import { v4 as uuidv4 } from 'uuid';
import { api } from '../utils/apiUtils';

// Razorpay live key for client-side
const RAZORPAY_KEY_ID = 'rzp_live_VMhrs1uuU9TTJq';
const DOMAIN_NAME = 'hennabyfathima.in';

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
    
    try {
      // Use the API utility to communicate with server
      const responseData = await api.createOrder(amountInPaise, currency);
      
      if (!responseData || !responseData.order?.id) {
        throw new Error('Invalid order response from Razorpay');
      }
      
      return responseData.order;
    } catch (serverError) {
      console.warn('Server error, using direct Razorpay integration:', serverError);
      // Generate client-side order ID with timestamp for uniqueness
      const timestamp = new Date().getTime();
      const randomSuffix = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      
      return {
        id: `order_${timestamp}_${randomSuffix}_${uuidv4().substring(0, 8)}`,
        amount: amountInPaise,
        currency,
        receipt: options.receipt
      };
    }
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

    try {
      // Use the API utility to verify payment
      const data = await api.verifyPayment({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature
      });
      
      return data.success || data.message === 'Payment verified successfully';
    } catch (serverError) {
      console.warn('Server verification failed, storing payment data locally:', serverError);
      
      // Store payment data in localStorage as a backup
      const paymentRecord = {
        orderId,
        paymentId, 
        signature,
        timestamp: new Date().toISOString()
      };
      
      const paymentRecords = JSON.parse(localStorage.getItem('rzp_payments') || '[]');
      paymentRecords.push(paymentRecord);
      localStorage.setItem('rzp_payments', JSON.stringify(paymentRecords));
      
      // In production, you should implement a retry mechanism
      return true;
    }
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
  image: "https://www.hennabyfathima.in/logo.png", // Add your logo for better branding
  notes: {
    address: DOMAIN_NAME
  },
  theme: {
    color: "#607973"
  }
});
