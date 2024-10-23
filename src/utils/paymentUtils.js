import { toast } from "sonner";

export const initializeRazorpayPayment = (orderData, totalAmount, formData, onSuccess, onError) => {
  if (!window.Razorpay) {
    toast.error('Payment gateway not initialized');
    onError(new Error('Razorpay SDK not loaded'));
    return;
  }

  const options = {
    key: "rzp_live_lhUJoR9PnyhX0q",
    amount: totalAmount * 100,
    currency: "INR",
    name: "Henna by Fathima",
    description: `Order Payment: ${orderData.orderId}`,
    order_id: orderData.orderId,
    handler: function (response) {
      toast.success("Payment successful!");
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
        toast.error('Payment cancelled');
        onError(new Error('Payment cancelled by user'));
      },
      confirm_close: true,
      escape: false
    }
  };

  try {
    const rzp = new window.Razorpay(options);
    
    rzp.on('payment.failed', function (response) {
      toast.error(response.error.description || 'Payment failed');
      onError(new Error(response.error.description));
    });

    rzp.open();
  } catch (error) {
    toast.error('Failed to initialize payment');
    onError(new Error('Failed to initialize payment: ' + error.message));
  }
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