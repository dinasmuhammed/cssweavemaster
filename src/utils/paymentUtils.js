
import { api } from './apiUtils';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { validateDeliveryForm, validatePaymentForm } from './formValidation';

// Ensure Razorpay is loaded only once
let isRazorpayScriptLoading = false;
let razorpayScriptLoadPromise = null;

// Utility to reliably convert rupee to paise (int)
const toPaise = (amount) => Math.round(Number(amount) * 100);

// Persist payment data to localStorage
const persistPaymentAttempt = (status, record) => {
  try {
    const key = status === "success" ? "rzp_payments" : "rzp_payment_failures";
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.push({
      ...record,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (error) {
    console.error("Failed to persist payment data:", error);
  }
};

// Load Razorpay script with reliable caching
export const loadRazorpayScript = async () => {
  if (window.Razorpay) {
    return Promise.resolve(window.Razorpay);
  }
  
  if (isRazorpayScriptLoading) {
    return razorpayScriptLoadPromise;
  }
  
  isRazorpayScriptLoading = true;
  razorpayScriptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      isRazorpayScriptLoading = false;
      console.log("Razorpay script loaded successfully");
      resolve(window.Razorpay);
    };
    script.onerror = (error) => {
      isRazorpayScriptLoading = false;
      console.error("Failed to load Razorpay script:", error);
      reject(new Error('Failed to load Razorpay script'));
    };
    document.body.appendChild(script);
  });
  
  return razorpayScriptLoadPromise;
};

// Generate a robust order ID
export const generateOrderId = () => `order_${uuidv4()}_${Date.now()}`;

// Initialize Razorpay payment with proper error handling
export const initializeRazorpayPayment = async (orderData, amount, customerDetails, onSuccess, onError) => {
  let loadingToast;
  try {
    // Validate inputs
    if (!orderData || !amount || !customerDetails) {
      toast.error("Missing payment information");
      if (onError) onError(new Error("Missing payment information"));
      return;
    }

    loadingToast = toast.loading('Preparing payment gateway...');
    
    // Load Razorpay script first
    await loadRazorpayScript();

    // Ensure conversion to paise
    const amountInPaise = toPaise(amount);
    if (isNaN(amountInPaise) || amountInPaise <= 0) {
      toast.dismiss(loadingToast);
      toast.error("Invalid payment amount");
      if (onError) onError(new Error("Invalid payment amount"));
      return;
    }

    // Use the API to create order
    const orderResponse = await api.createOrder(amountInPaise);
    toast.dismiss(loadingToast);
    
    if (!orderResponse || !orderResponse.id) {
      console.error("Invalid order response:", orderResponse);
      toast.error("Failed to create payment order. Please try again.");
      if (onError) onError(new Error('Failed to create order with Razorpay'));
      return;
    }

    console.log("Order created successfully:", orderResponse);

    // Initialize Razorpay options with proper configuration
    const options = {
      key: "rzp_live_VMhrs1uuU9TTJq", // Live key
      amount: orderResponse.amount,
      currency: orderResponse.currency || 'INR',
      name: "Henna by Fathima",
      description: "Order Payment",
      order_id: orderResponse.id,
      image: "https://www.hennabyfathima.in/logo.png",
      prefill: {
        name: customerDetails.name || '',
        email: customerDetails.email || '',
        contact: customerDetails.mobile || '',
      },
      notes: {
        address: "hennabyfathima.in",
        orderId: orderData.orderId || generateOrderId(),
        items: JSON.stringify(orderData.items?.map(item => ({
          id: item.id,
          name: item.name,
          qty: item.quantity
        })) || []),
      },
      theme: {
        color: "#607973"
      },
      handler: function(response) {
        try {
          toast.success("Payment received! Verifying...");
          
          console.log("Payment successful:", response);
          
          // Record payment data
          const paymentRecord = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderResponse.amount,
            customer: customerDetails,
            items: orderData.items
          };
          
          persistPaymentAttempt("success", paymentRecord);
          
          // Verify payment with backend
          api.verifyPayment({
            ...response,
            orderData: { ...orderData, customerDetails }
          }).then(() => {
            toast.success("Payment verified successfully!");
            if (onSuccess) onSuccess(response);
          }).catch(verifyError => {
            console.error("Payment verification failed:", verifyError);
            toast.info("Payment completed but verification is pending. Your order is still confirmed.");
            if (onSuccess) onSuccess(response);
          });
        } catch (error) {
          console.error("Error handling payment success:", error);
          if (onError) onError(error);
        }
      },
      modal: {
        escape: false,
        ondismiss: function() {
          toast.dismiss(loadingToast);
          toast.error(
            <>
              Payment cancelled.<br/>
              <button className="underline" onClick={() => window.location.reload()}>Retry Payment</button> or <button className="underline" onClick={() => window.location.href='/shop'}>Back to Shop</button>
            </>
          );
          persistPaymentAttempt("fail", { ...orderData, error: "cancelled" });
          if (onError) onError(new Error('Payment cancelled by user'));
        }
      },
      retry: {
        enabled: true,
        max_count: 3
      }
    };

    const razorpay = new window.Razorpay(options);
    
    razorpay.on('payment.failed', function(response) {
      console.error("Payment failed:", response.error);
      toast.dismiss(loadingToast);
      toast.error(
        <>
          Payment failed: {response.error.description || "Transaction failed"}.<br/>
          <button className="underline" onClick={() => window.location.reload()}>Retry Payment</button> or <button className="underline" onClick={() => window.location.href='/shop'}>Back to Shop</button>
        </>
      );
      persistPaymentAttempt("fail", { 
        ...orderData, 
        error: response.error.description,
        code: response.error.code
      });
      if (onError) onError(new Error(response.error.description));
    });

    // Open Razorpay payment modal
    console.log("Opening Razorpay payment modal");
    razorpay.open();
    
  } catch (error) {
    console.error("Payment initialization error:", error);
    toast.dismiss(loadingToast);
    toast.error(
      <>
        Payment setup failed: {error.message}.<br />
        <button className="underline" onClick={() => window.location.reload()}>Retry</button> or <button className="underline" onClick={() => window.location.href='/shop'}>Back</button>
      </>
    );
    persistPaymentAttempt("fail", { ...orderData, error: error.message });
    if (onError) onError(error);
  }
};
