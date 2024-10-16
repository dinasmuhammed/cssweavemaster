import { toast } from "sonner";
import { formatOrderData, generateOrderId } from './cartUtils';

export const handleRazorpayPayment = (orderData, totalPrice, formData, onSuccess, onError) => {
  const options = {
    key: "rzp_live_lhUJoR9PnyhX0q",
    amount: totalPrice * 100, // Razorpay expects amount in paise
    currency: "INR",
    name: "Henna by Fathima",
    description: `Order Payment: ${orderData.orderId}`,
    order_id: orderData.orderId,
    handler: function (response) {
      onSuccess(response, orderData);
    },
    prefill: {
      name: formData.name,
      contact: formData.phoneNumber,
    },
    theme: {
      color: "#3399cc"
    },
    modal: {
      ondismiss: function() {
        onError(new Error('Payment cancelled by user'));
      }
    }
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('Error initializing Razorpay:', error);
    onError(error);
  }
};

export const initializePayment = (formData, cartItems, totalPrice, onSuccess, onError) => {
  try {
    const orderId = generateOrderId();
    const orderData = formatOrderData(formData, cartItems, totalPrice);
    handleRazorpayPayment(orderData, totalPrice, formData, onSuccess, onError);
  } catch (error) {
    console.error('Error initializing payment:', error);
    onError(error);
  }
};