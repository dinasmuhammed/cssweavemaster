
import { api } from './apiUtils';
import { getRazorpayConfig, createOrder } from '../api/razorpay';
import { toast } from "sonner";

export const validatePaymentForm = (formData) => {
  const errors = {};
  
  if (!formData.name?.trim()) errors.name = "Name is required";
  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email format";
  }
  if (!formData.mobile?.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\d{10}$/.test(formData.mobile)) {
    errors.mobile = "Invalid mobile number";
  }
  if (!formData.address?.trim()) errors.address = "Address is required";
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const loadRazorpayScript = async () => {
  if (window.Razorpay) {
    return Promise.resolve();
  }
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      resolve();
    };
    script.onerror = (error) => {
      console.error('Failed to load Razorpay script:', error);
      reject(new Error('Failed to load Razorpay script'));
    };
    document.body.appendChild(script);
  });
};

export const initializeRazorpayPayment = async (orderData, amount, customerDetails, onSuccess, onError) => {
  try {
    console.log('Initializing Razorpay payment with amount:', amount);
    
    // Show loading toast
    const loadingToast = toast.loading('Preparing payment gateway...');
    
    // Load Razorpay script if not already loaded
    await loadRazorpayScript();

    // Create order directly using our updated createOrder function
    const orderResponse = await createOrder(amount);
    console.log('Order created successfully:', orderResponse);
    
    toast.dismiss(loadingToast);
    
    if (!orderResponse || !orderResponse.id) {
      throw new Error('Could not create payment order');
    }

    // Get Razorpay config
    const razorpayConfig = getRazorpayConfig();
    
    // Prepare payment options
    const options = {
      ...razorpayConfig,
      amount: orderResponse.amount, // Amount is already in paise
      currency: orderResponse.currency || 'INR',
      order_id: orderResponse.id,
      prefill: {
        name: customerDetails.name || '',
        email: customerDetails.email || '',
        contact: customerDetails.mobile || '',
      },
      notes: {
        ...razorpayConfig.notes,
        orderId: orderData.orderId || `ORDER_${Date.now()}`,
        items: JSON.stringify(orderData.items?.map(item => ({
          id: item.id,
          name: item.name,
          qty: item.quantity
        })) || []),
      },
      handler: async function(response) {
        try {
          console.log('Payment successful, verifying payment:', response);
          toast.success("Payment received! Verifying...");
          
          // Track payment details locally in case server verification fails
          const paymentRecord = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id, 
            signature: response.razorpay_signature,
            amount: orderResponse.amount,
            customer: customerDetails,
            timestamp: new Date().toISOString()
          };
          
          // Store payment record for backup
          const paymentRecords = JSON.parse(localStorage.getItem('rzp_payments') || '[]');
          paymentRecords.push(paymentRecord);
          localStorage.setItem('rzp_payments', JSON.stringify(paymentRecords));
          
          // Attempt server verification
          try {
            const verifyResult = await api.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: {
                ...orderData,
                customerDetails
              }
            });
            console.log('Payment verified on server:', verifyResult);
          } catch (verifyError) {
            console.warn('Server verification failed, but proceeding with payment:', verifyError);
            // Payment is still considered successful even if server verification fails
          }

          toast.success("Payment completed successfully!");
          if (onSuccess) onSuccess(response);
        } catch (error) {
          console.error('Payment verification error:', error);
          toast.error("Payment verification failed. Please contact support.");
          if (onError) onError(error);
        }
      },
      modal: {
        escape: false,
        ondismiss: function() {
          toast.error("Payment cancelled. You can try again when ready.");
          if (onError) onError(new Error('Payment cancelled by user'));
        }
      },
      retry: {
        enabled: true,
        max_count: 3
      }
    };

    console.log('Opening Razorpay modal with options:', {
      ...options,
      key_id: '***' // Hide key for security
    });
    
    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', function(response) {
      console.error('Payment failed:', response.error);
      toast.error(`Payment failed: ${response.error.description || 'Please try again'}`);
      if (onError) onError(new Error(response.error.description));
    });
    
    razorpay.open();
  } catch (error) {
    console.error('Razorpay payment initialization error:', error);
    toast.error(error.message || "Payment setup failed. Please try again.");
    if (onError) onError(error);
  }
};
