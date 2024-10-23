import { toast } from "sonner";

export const validatePaymentForm = (formData) => {
  const errors = {};
  
  if (!formData.address?.trim()) errors.address = "Address is required";
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

export const initializeRazorpayPayment = async (orderData, totalAmount, formData, onSuccess, onError) => {
  if (!window.Razorpay) {
    toast.error('Payment gateway not initialized');
    onError(new Error('Razorpay SDK not loaded'));
    return;
  }

  try {
    const options = {
      key: "rzp_live_lhUJoR9PnyhX0q",
      amount: totalAmount * 100, // Convert to paise
      currency: "INR",
      name: "Henna by Fathima",
      description: `Order Payment: ${orderData.orderId}`,
      prefill: {
        name: formData.name,
        contact: formData.mobile,
        email: formData.email
      },
      notes: {
        address: `${formData.address}, ${formData.area}, ${formData.district}, ${formData.state}, ${formData.pincode}`
      },
      theme: {
        color: "#607973"
      },
      handler: function (response) {
        handlePaymentSuccess(response, orderData, onSuccess);
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
    // Send order confirmation email
    await fetch('/api/send-order-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: orderData.orderId,
        customerName: orderData.customerDetails.name,
        totalPrice: orderData.amount,
        items: orderData.items,
        shippingAddress: orderData.customerDetails.address
      }),
    });

    toast.success("Payment successful! Thank you for your order.");
    onSuccess(response);
  } catch (error) {
    console.error('Error processing successful payment:', error);
    toast.error('Error processing payment confirmation');
  }
};

const handlePaymentFailure = (response, onError) => {
  const errorMessage = response.error?.description || 'Payment failed';
  toast.error(errorMessage);
  onError(new Error(errorMessage));
};