import { toast } from "sonner";

export const initializeRazorpayPayment = (orderData, totalPrice, formData, onSuccess, onError) => {
  const options = {
    key: "rzp_live_lhUJoR9PnyhX0q", // Razorpay API Key
    amount: totalPrice * 100, // Razorpay expects amount in paise
    currency: "INR",
    name: "Henna by Fathima",
    description: `Order Payment: ${orderData.orderId}`,
    order_id: orderData.orderId,
    handler: function (response) {
      onSuccess(response, orderData);
    },
    prefill: {
      name: formData.name,
      contact: formData.phoneNumber,
      email: formData.email || '',
    },
    theme: {
      color: "#3399cc"
    },
    modal: {
      ondismiss: function() {
        onError(new Error('Payment cancelled by user'));
      }
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

  const rzp = new window.Razorpay(options);
  
  rzp.on('payment.failed', function (response){
    onError(new Error(response.error.description));
  });

  rzp.open();
};

export const validatePaymentDetails = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
    errors.phoneNumber = "Invalid phone number format";
  }

  if (!formData.address.trim()) {
    errors.address = "Address is required";
  }

  if (!formData.state.trim()) {
    errors.state = "State is required";
  }

  if (!formData.district.trim()) {
    errors.district = "District is required";
  }

  return errors;
};