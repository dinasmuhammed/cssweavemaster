import { toast } from "sonner";

export const initializeRazorpayPayment = (orderData, totalPrice, formData, onSuccess, onError) => {
  const options = {
    key: "rzp_live_lhUJoR9PnyhX0q", // Razorpay API Key
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

  const rzp = new window.Razorpay(options);
  rzp.open();
};