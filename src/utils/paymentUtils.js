import { toast } from "sonner";

export const validatePaymentForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) errors.name = "Name is required";
  if (!formData.address?.trim()) errors.address = "Address is required";
  if (!formData.area?.trim()) errors.area = "Area is required";
  if (!formData.state?.trim()) errors.state = "State is required";
  if (!formData.district?.trim()) errors.district = "District is required";
  if (!formData.mobile?.trim()) errors.mobile = "Mobile number is required";
  else if (!/^\d{10}$/.test(formData.mobile)) errors.mobile = "Invalid mobile number";
  if (!formData.email?.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email format";
  if (!formData.pincode?.trim()) errors.pincode = "Pincode is required";
  else if (!/^\d{6}$/.test(formData.pincode)) errors.pincode = "Invalid pincode";

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const initializeRazorpayPayment = async (orderData, amount, customerDetails, onSuccess, onError) => {
  if (!window.Razorpay) {
    console.error('Razorpay SDK not loaded');
    toast.error("Payment system unavailable. Please try again later.");
    return;
  }

  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Convert to smallest currency unit
        currency: 'INR',
        receipt: orderData.orderId,
        notes: {
          orderDetails: JSON.stringify(orderData)
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const { order } = await response.json();
    
    const options = {
      key: process.env.RAZORPAY_KEY_ID || window.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Henna by Fathima",
      description: "Order Payment",
      order_id: order.id,
      prefill: {
        name: customerDetails.name,
        email: customerDetails.email,
        contact: customerDetails.mobile,
      },
      notes: {
        address: customerDetails.address,
      },
      theme: {
        color: "#607973",
      },
      handler: async function(response) {
        try {
          const verifyResponse = await fetch('/api/verify-payment', {
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
          });

          if (!verifyResponse.ok) {
            throw new Error('Payment verification failed');
          }

          // Send order confirmation email
          await fetch('/api/send-order-email', {
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

          toast.success("Payment successful!");
          if (onSuccess) onSuccess(response);
        } catch (error) {
          console.error('Error in payment verification or email:', error);
          toast.error("Payment verification failed");
          if (onError) onError(error);
        }
      },
      modal: {
        ondismiss: function() {
          toast.error("Payment cancelled");
          if (onError) onError(new Error('Payment cancelled'));
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    
  } catch (error) {
    console.error('Error initializing payment:', error);
    toast.error("Failed to initialize payment");
    if (onError) onError(error);
  }
};