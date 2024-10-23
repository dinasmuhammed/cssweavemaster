export const initializeRazorpayPayment = (orderData, totalAmount, formData, onSuccess, onError) => {
  if (!window.Razorpay) {
    onError(new Error('Razorpay SDK not loaded'));
    return;
  }

  const options = {
    key: "rzp_live_lhUJoR9PnyhX0q", // Live Razorpay API Key
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
      },
      confirm_close: true,
      escape: false
    },
    retry: {
      enabled: true,
      max_count: 3
    },
    notes: {
      address: formData.address
    },
    config: {
      display: {
        blocks: {
          utib: {
            name: "Pay using Axis Bank",
            instruments: [
              {
                method: "card",
                issuers: ["UTIB"]
              },
              {
                method: "netbanking",
                banks: ["UTIB"]
              },
            ]
          },
          other: {
            name: "Other payment methods",
            instruments: [
              {
                method: "card",
                issuers: ["ICIC"]
              },
              {
                method: "netbanking"
              },
              {
                method: "upi"
              }
            ]
          }
        },
        sequence: ["block.utib", "block.other"],
        preferences: {
          show_default_blocks: false
        }
      }
    }
  };

  try {
    const rzp = new window.Razorpay(options);
    
    rzp.on('payment.failed', function (response) {
      onError(new Error(response.error.description));
    });

    rzp.open();
  } catch (error) {
    onError(new Error('Failed to initialize payment: ' + error.message));
  }
};

export const validatePaymentForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) errors.name = "Name is required";
  if (!formData.mobile?.trim()) errors.mobile = "Mobile number is required";
  if (!formData.email?.trim()) errors.email = "Email is required";
  if (!formData.address?.trim()) errors.address = "Address is required";
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};