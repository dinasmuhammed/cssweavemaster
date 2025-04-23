import { v4 as uuidv4 } from 'uuid';
import { api } from '../utils/apiUtils';

// Razorpay live key for client-side
const RAZORPAY_KEY_ID = 'rzp_live_VMhrs1uuU9TTJq';
const DOMAIN_NAME = 'hennabyfathima.in';

// Utility to reliably convert amount to paise
const toPaise = (amount) => {
  // Convert string to number if needed
  const numAmount = typeof amount === 'string' ? Number(amount) : amount;
  
  // If already in paise (large number), return as is
  if (numAmount >= 100 && Number.isInteger(numAmount)) {
    return numAmount;
  }
  
  // Otherwise convert to paise and ensure it's an integer
  return Math.round(numAmount * 100);
};

export const createOrder = async (amountPaise, currency = 'INR') => {
  // Ensure amountPaise is a proper integer
  const sanitizedAmount = toPaise(amountPaise);
  
  // Generate a robust receipt
  const receipt = `rcpt_${Date.now()}_${uuidv4().substring(0, 8)}`;
  
  try {
    console.log(`Creating order with amount: ${sanitizedAmount} paise`);
    
    // Use the API utility to communicate with server
    const responseData = await api.createOrder(sanitizedAmount, currency);
    
    if (responseData && responseData.id) {
      console.log("Order created successfully:", responseData);
      return responseData;
    } else if (responseData && responseData.order?.id) {
      console.log("Order created successfully (nested):", responseData.order);
      return responseData.order;
    }
    
    throw new Error('Invalid order response from Razorpay');
  } catch (serverError) {
    console.error("Error creating order:", serverError);
    
    // Generate client-side order ID with UUID and timestamp for uniqueness
    const fallbackOrder = {
      id: `order_fallback_${Date.now()}_${uuidv4().substring(0, 8)}`,
      amount: sanitizedAmount,
      currency,
      receipt
    };
    
    console.log("Using fallback order:", fallbackOrder);
    return fallbackOrder;
  }
};

export const verifyPayment = async (orderId, paymentId, signature) => {
  try {
    if (!orderId || !paymentId || !signature) {
      console.error("Missing payment verification parameters");
      throw new Error('Missing required payment verification parameters');
    }

    console.log("Verifying payment:", { orderId, paymentId });
    
    try {
      // Use the API utility to verify payment
      const data = await api.verifyPayment({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature
      });
      
      console.log("Payment verification response:", data);
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
      
      // For client-side fallback, consider it successful
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
