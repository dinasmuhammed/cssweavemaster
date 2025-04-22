
// Razorpay live key for client-side
const RAZORPAY_KEY_ID = 'rzp_live_VMhrs1uuU9TTJq';

export const createOrder = async (amount, currency = 'INR') => {
  try {
    if (!amount || isNaN(amount)) {
      throw new Error('Invalid amount provided');
    }

    // Convert amount to paise if needed (if it's in rupees)
    const amountInPaise = amount < 100 ? Math.round(amount * 100) : amount;

    // Generate order ID for direct frontend integration
    const orderId = 'order_' + Math.random().toString(36).substr(2, 9);

    return {
      id: orderId,
      amount: amountInPaise,
      currency,
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

// Export Razorpay config with your domain
export const getRazorpayConfig = (customerDetails) => ({
  key: RAZORPAY_KEY_ID,
  currency: 'INR',
  name: "Henna by Fathima",
  description: "Order Payment",
  image: "https://www.hennabyfathima.in/logo.png",
  prefill: {
    name: customerDetails?.name || '',
    email: customerDetails?.email || '',
    contact: customerDetails?.mobile || '',
  },
  notes: {
    address: customerDetails?.address || '',
  },
  theme: {
    color: "#607973"
  }
});
