export const initializeRazorpayPayment = (orderData, totalAmount, formData, onSuccess, onError) => {
  const options = {
    key: "rzp_test_YOUR_KEY_HERE", // Replace with your Razorpay key
    amount: totalAmount * 100, // Amount in paise
    currency: "INR",
    name: "Henna by Fathima",
    description: `Order Payment: ${orderData.orderId}`,
    order_id: orderData.orderId,
    handler: function (response) {
      onSuccess(response);
    },
    prefill: {
      name: formData.name,
      contact: formData.mobile,
      email: formData.email
    },
    theme: {
      color: "#607973"
    },
    modal: {
      ondismiss: function() {
        onError(new Error('Payment cancelled by user'));
      }
    }
  };

  const rzp = new window.Razorpay(options);
  
  rzp.on('payment.failed', function (response) {
    onError(new Error(response.error.description));
  });

  rzp.open();
};