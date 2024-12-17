import { toast } from "sonner";

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
  // Ensure callbacks are functions
  onSuccess = typeof onSuccess === 'function' ? onSuccess : () => {};
  onError = typeof onError === 'function' ? onError : () => {};

  try {
    console.log('Initializing payment with amount:', totalAmount);
    
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalAmount,
        currency: 'INR',
        couponCode: orderData.couponCode
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create order');
    }

    const order = await response.json();
    console.log('Order created:', order);

    if (!window.Razorpay) {
      throw new Error('Razorpay SDK not loaded');
    }

    const options = {
      key: "rzp_live_lhUJoR9PnyhX0q",
      amount: order.amount,
      currency: order.currency,
      name: "Henna by Fathima",
      description: `Order Payment: ${orderData.orderId}`,
      order_id: order.id,
      prefill: {
        name: formData.name,
        contact: formData.mobile,
        email: formData.email
      },
      notes: {
        shipping_address: JSON.stringify({
          address: formData.address,
          area: formData.area,
          district: formData.district,
          state: formData.state,
          pincode: formData.pincode
        })
      },
      handler: function(response) {
        console.log('Payment successful:', response);
        
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
          onError(error);
        });
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal dismissed');
          onError(new Error('Payment cancelled by user'));
        }
      },
      theme: {
        color: "#607973"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('Payment initialization error:', error);
    toast.error(error.message || "Failed to initialize payment");
    onError(error);
  }
};