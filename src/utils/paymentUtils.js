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
  try {
    if (typeof window === 'undefined' || !window.Razorpay) {
      throw new Error('Razorpay SDK not loaded');
    }

    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalAmount,
        currency: 'INR'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const order = await response.json();

    const options = {
      key: "rzp_live_lhUJoR9PnyhX0q",
      amount: Math.round(totalAmount * 100),
      currency: "INR",
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
          pincode: formData.pincode,
          full_address: `${formData.address}, ${formData.area}, ${formData.district}, ${formData.state} - ${formData.pincode}`
        })
      },
      theme: {
        color: "#607973"
      },
      handler: function (response) {
        console.log('Payment successful:', response);
        onSuccess(response);
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal dismissed');
          onError(new Error('Payment cancelled by user'));
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('Payment initialization error:', error);
    onError(error);
  }
};