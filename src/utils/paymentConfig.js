export const RAZORPAY_CONFIG = {
  currency: 'INR',
  name: "Henna by Fathima",
  description: "Order Payment",
  theme: {
    color: "#607973"
  }
};

export const validatePaymentAmount = (amount) => {
  return amount && Number(amount) > 0;
};