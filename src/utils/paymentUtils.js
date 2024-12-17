import { toast } from "sonner";

export const initializePayment = async (orderData, onSuccess = () => {}, onError = () => {}) => {
  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: orderData.amount,
        currency: 'INR',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const { order } = await response.json();
    
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Henna by Fathima",
      description: "Order Payment",
      order_id: order.id,
      prefill: {
        name: orderData.name,
        email: orderData.email,
        contact: orderData.mobile,
      },
      notes: {
        address: orderData.address,
      },
      theme: {
        color: "#607973",
      },
      handler: function(response) {
        console.log('Payment successful:', response);
        
        // First verify the payment
        fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderData: {
              ...orderData,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id
            }
          }),
        })
        .then(async (verifyResponse) => {
          if (!verifyResponse.ok) {
            throw new Error('Payment verification failed');
          }
          // After verification, send the order email
          return fetch('/api/send-order-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...orderData,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id
            }),
          });
        })
        .then(() => {
          toast.success("Payment successful!");
          onSuccess(response);
        })
        .catch((error) => {
          console.error('Error in payment verification or email:', error);
          toast.error("Payment verification failed");
          onError(error);
        });
      },
      modal: {
        ondismiss: function() {
          toast.error("Payment cancelled");
          onError(new Error('Payment cancelled'));
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    
  } catch (error) {
    console.error('Error initializing payment:', error);
    toast.error("Failed to initialize payment");
    onError(error);
  }
};