
import { v4 as uuidv4 } from 'uuid';

// Updated with the provided live keys
const RAZORPAY_KEY_ID = 'rzp_live_VMhrs1uuU9TTJq';
const RAZORPAY_KEY_SECRET = 'lEV2FCzPMS4n7c23VfnUQd5W'; // This should be kept on the server side only

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

    console.log('Creating order with options:', { ...options, amount_in_rupees: amountInPaise / 100 });
    
    // Now we'll send this to our server endpoint
    const response = await fetch('https://henna-by-fathima-server.vercel.app/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Razorpay API error:', errorData);
      throw new Error(errorData.error?.description || 'Failed to create Razorpay order');
    }

    const responseData = await response.json();

    if (!responseData || !responseData.id) {
      throw new Error('Invalid order response from Razorpay');
    }

    return responseData;
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

    // Send verification request to our server
    const response = await fetch('https://henna-by-fathima-server.vercel.app/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        paymentId,
        signature
      })
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};
