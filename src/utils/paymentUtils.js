import { toast } from "sonner";

export const initializeRazorpayPayment = async (orderData, totalAmount, formData, onSuccess, onError) => {
  if (!window.Razorpay) {
    toast.error('Payment gateway not initialized');
    onError(new Error('Razorpay SDK not loaded'));
    return;
  }

  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalAmount,
        currency: 'INR',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const order = await response.json();

    const options = {
      key: "rzp_test_C7n5IDWG8K5kGf", // Updated test key
      amount: totalAmount * 100,
      currency: "INR",
      name: "Henna by Fathima",
      description: `Order Payment: ${orderData.orderId}`,
      order_id: order.id,
      handler: function (response) {
        handlePaymentSuccess(response, orderData, onSuccess);
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
          toast.error('Payment cancelled');
          onError(new Error('Payment cancelled by user'));
        },
        confirm_close: true,
        escape: false
      }
    };

    const rzp = new window.Razorpay(options);
    
    rzp.on('payment.failed', function (response) {
      handlePaymentFailure(response, onError);
    });

    rzp.open();
  } catch (error) {
    toast.error('Failed to initialize payment');
    onError(error);
  }
};

const handlePaymentSuccess = async (response, orderData, onSuccess) => {
  try {
    const verifyResponse = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        orderData: orderData
      }),
    });

    if (!verifyResponse.ok) {
      throw new Error('Payment verification failed');
    }

    toast.success("Payment successful! Thank you for your order.");
    onSuccess(response);
  } catch (error) {
    toast.error('Payment verification failed');
    throw error;
  }
};

const handlePaymentFailure = (response, onError) => {
  const errorMessage = response.error.description || 'Payment failed';
  toast.error(errorMessage);
  onError(new Error(errorMessage));
};

export const validatePaymentForm = (formData) => {
  const errors = {};
  
  if (!formData.flatNumber?.trim()) errors.flatNumber = "Flat/House number is required";
  if (!formData.area?.trim()) errors.area = "Area is required";
  if (!formData.country?.trim()) errors.country = "Country is required";
  if (!formData.state?.trim()) errors.state = "State is required";
  if (!formData.district?.trim()) errors.district = "District is required";
  if (!formData.mobile?.trim()) errors.mobile = "Mobile number is required";
  else if (!/^[6-9]\d{9}$/.test(formData.mobile)) errors.mobile = "Invalid mobile number";
  if (!formData.email?.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email format";
  if (!formData.pincode?.trim()) errors.pincode = "Pincode is required";
  else if (!/^\d{6}$/.test(formData.pincode)) errors.pincode = "Invalid pincode";
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};