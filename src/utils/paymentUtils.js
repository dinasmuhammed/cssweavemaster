import { api } from './apiUtils';
import { getRazorpayConfig, createOrder } from '../api/razorpay';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { validateDeliveryForm, validatePaymentForm } from './formValidation';

const persistPaymentAttempt = (status, record) => {
  try {
    const key = status === "success" ? "rzp_payments" : "rzp_payment_failures";
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.push(record);
    localStorage.setItem(key, JSON.stringify(arr));
  } catch {}
};

// Utility to reliably convert rupee to paise (int)
const toPaise = (amount) => Math.round(Number(amount) * 100);

export const loadRazorpayScript = async () => {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (error) => reject(new Error('Failed to load Razorpay script'));
    document.body.appendChild(script);
  });
};

// Robust order ID using uuid and timestamp
export const generateOrderId = () => `ORDER_${uuidv4()}_${Date.now()}`;

// Careful config and modal
export const initializeRazorpayPayment = async (orderData, amount, customerDetails, onSuccess, onError) => {
  let loadingToast;
  try {
    // Validate inputs and config
    if (!orderData || !customerDetails || !amount) {
      toast.error("Critical error: missing info for payment");
      if (onError) onError(new Error("Critical payment config missing"));
      return;
    }

    loadingToast = toast.loading('Preparing payment gateway...');
    await loadRazorpayScript();

    // Prepare robust orderId
    const orderId = orderData.orderId || generateOrderId();

    // Ensure conversion to paise and min amount
    const amtPaise = toPaise(amount);
    if (isNaN(amtPaise) || amtPaise <= 0) {
      toast.error("Invalid payment amount");
      if (onError) onError(new Error("Invalid payment amount"));
      toast.dismiss(loadingToast);
      return;
    }
    // Create order on backend
    const { createOrder } = await import('../api/razorpay');
    const orderResponse = await createOrder(amtPaise);
    toast.dismiss(loadingToast);

    if (!orderResponse || !orderResponse.id) {
      throw new Error('Failed to create order with Razorpay.');
    }

    const razorpayConfig = {
      key_id: "rzp_live_VMhrs1uuU9TTJq", // Confirmed live key!
      currency: 'INR',
      name: "Henna by Fathima",
      description: "Order Payment",
      image: "https://www.hennabyfathima.in/logo.png",
      notes: { address: "hennabyfathima.in", orderId },
      theme: { color: "#607973" }
    };

    const options = {
      ...razorpayConfig,
      amount: orderResponse.amount,
      currency: orderResponse.currency || 'INR',
      order_id: orderResponse.id,
      prefill: {
        name: customerDetails.name || '',
        email: customerDetails.email || '',
        contact: customerDetails.mobile || '',
      },
      notes: {
        ...razorpayConfig.notes,
        items: JSON.stringify(orderData.items?.map(item => ({
          id: item.id,
          name: item.name,
          qty: item.quantity
        })) || []),
      },
      handler: async (response) => {
        // On payment success, persist info/verify
        try {
          toast.success("Payment received! Verifying...");
          const paymentRecord = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderResponse.amount,
            customer: customerDetails,
            timestamp: new Date().toISOString()
          };
          persistPaymentAttempt("success", paymentRecord);
          // Backend verify call
          try {
            const { api } = await import('./apiUtils');
            await api.verifyPayment({
              ...response,
              orderData: { ...orderData, customerDetails }
            });
            toast.success("Payment verified successfully!");
          } catch (err) {
            toast.info("Payment completed, but verification failed. Contact support if needed.");
          }
          if (onSuccess) onSuccess(response);
        } catch (error) {
          toast.error("Payment verification failed.");
          persistPaymentAttempt("fail", { ...orderData, error: error.message, timestamp: new Date().toISOString() });
          if (onError) onError(error);
        }
      },
      modal: {
        escape: false,
        ondismiss: () => {
          toast.error(
            <>
              Payment cancelled.<br/>
              <button className="underline" onClick={() => window.location.reload()}>Retry Payment</button> or <button className="underline" onClick={() => window.location.href='/shop'}>Back to Shop</button>
            </>
          );
          persistPaymentAttempt("fail", { ...orderData, error: "cancelled", timestamp: new Date().toISOString() });
          if (onError) onError(new Error('Payment cancelled by user'));
        }
      },
      retry: { enabled: true, max_count: 3 }
    };

    const razorpay = new window.Razorpay(options);
    // Show error with buttons on payment fail
    razorpay.on('payment.failed', function(rzpError) {
      toast.error(
        <>
          Payment failed: {rzpError.error.description || "Try again"}.<br/>
          <button className="underline" onClick={() => window.location.reload()}>Retry Payment</button> or <button className="underline" onClick={() => window.location.href='/shop'}>Back to Shop</button>
        </>
      );
      persistPaymentAttempt("fail", { ...orderData, error: rzpError.error.description, timestamp: new Date().toISOString() });
      if (onError) onError(new Error(rzpError.error.description));
    });
    razorpay.open();
  } catch (error) {
    toast.dismiss(loadingToast);
    toast.error(
      <>
        Payment setup failed: {error.message}.<br />
        <button className="underline" onClick={() => window.location.reload()}>Retry</button> or <button className="underline" onClick={() => window.location.href='/shop'}>Back</button>
      </>
    );
    persistPaymentAttempt("fail", { ...orderData, error: error.message, timestamp: new Date().toISOString() });
    if (onError) onError(error);
  }
};
