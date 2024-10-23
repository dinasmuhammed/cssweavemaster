import { toast } from "sonner";
import { sendOrderConfirmationEmail } from './emailUtils';

const RAZORPAY_KEY_ID = "rzp_live_lhUJoR9PnyhX0q";

export const validatePaymentForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) errors.name = "Name is required";
  if (!formData.address?.trim()) errors.address = "Address is required";
  if (!formData.area?.trim()) errors.area = "Area is required";
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
    const error = new Error('Razorpay SDK not loaded');
    toast.error('Payment gateway not initialized');
    onError(error);
    return;
  }

  try {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: Math.round(totalAmount * 100), // Convert to paise and ensure it's an integer
      currency: "INR",
      name: "Henna by Fathima",
      description: `Order Payment: ${orderData.orderId}`,
      image: "/logo.png",
      prefill: {
        name: formData.name,
        contact: formData.mobile,
        email: formData.email
      },
      notes: {
        shipping_address: `${formData.address}, ${formData.area}, ${formData.district}, ${formData.state}, ${formData.pincode}`
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
    const emailSent = await sendOrderConfirmationEmail({
      orderId: orderData.orderId,
      customerName: orderData.customerDetails.name,
      totalAmount: orderData.amount,
      items: orderData.items,
      shippingAddress: orderData.customerDetails.address,
      paymentId: response.razorpay_payment_id
    });

    if (emailSent) {
      toast.success("Payment successful! Order confirmation sent to your email.");
    } else {
      toast.success("Payment successful!");
      toast.warning("Order confirmation email could not be sent.");
    }
    
    onSuccess(response);
  } catch (error) {
    console.error('Error processing successful payment:', error);
    toast.success("Payment successful!");
    toast.warning("Could not send order confirmation.");
    onSuccess(response); // Still consider it successful as payment went through
  }
};

const handlePaymentFailure = (response, onError) => {
  const errorMessage = response.error?.description || 'Payment failed';
  toast.error(errorMessage);
  onError(new Error(errorMessage));
};