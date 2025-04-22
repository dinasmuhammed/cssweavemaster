
export const RAZORPAY_CONFIG = {
  currency: 'INR',
  name: "Henna by Fathima",
  description: "Order Payment",
  image: "https://www.hennabyfathima.in/logo.png",
  notes: {
    address: "hennabyfathima.in"
  },
  theme: {
    color: "#607973"
  }
};

export const validatePaymentAmount = (amount) => {
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return false;
  }
  return true;
};

export const getOrderIdWithTimestamp = () => {
  const timestamp = new Date().getTime();
  const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `order_${timestamp}_${randomPart}`;
};

export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency
  }).format(amount);
};
