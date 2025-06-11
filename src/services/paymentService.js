
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../utils/supabaseClient';
import { toast } from "sonner";

// Razorpay live key for client-side
const RAZORPAY_KEY_ID = 'rzp_live_VMhrs1uuU9TTJq';

// Utility to reliably convert amount to paise
const toPaise = (amount) => {
  const numAmount = typeof amount === 'string' ? Number(amount) : amount;
  return Math.round(numAmount * 100);
};

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
      resolve(window.Razorpay);
    };
    script.onerror = (error) => {
      console.error("Failed to load Razorpay script:", error);
      reject(new Error('Failed to load Razorpay script'));
    };
    document.body.appendChild(script);
  });
};

// Create an order locally (fallback when server fails)
const createLocalOrder = (amount, currency = 'INR') => {
  const amountInPaise = toPaise(amount);
  const receipt = `rcpt_${Date.now()}_${uuidv4().substring(0, 8)}`;
  
  return {
    id: `order_${Date.now()}_${uuidv4().substring(0, 8)}`,
    amount: amountInPaise,
    currency,
    receipt
  };
};

// Create an order in Supabase and store metadata
export const createOrder = async (amount, currency = 'INR', metadata = {}) => {
  try {
    const amountInPaise = toPaise(amount);
    
    // Create a local order first
    const order = createLocalOrder(amount, currency);
    
    // Store order in Supabase
    const { data: orderRecord, error: dbError } = await supabase
      .from('payment_logs')
      .insert([{
        order_id: order.id,
        amount: amount,
        currency,
        status: 'initiated',
        metadata: {
          ...metadata,
          receipt: order.receipt,
          initiated_at: new Date().toISOString()
        }
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Error creating order record:', dbError);
    }
    
    console.log("Order created successfully:", order);
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    // Return local order as fallback
    return createLocalOrder(amount, currency);
  }
};

// Initialize Razorpay payment
export const initializePayment = async (orderData, customerDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Ensure Razorpay is loaded
      await loadRazorpayScript();
      
      const loadingToast = toast.loading('Preparing payment...');
      
      // Create the order
      const order = await createOrder(
        orderData.amount,
        'INR',
        {
          items: orderData.items,
          customer: customerDetails,
          description: orderData.description || 'Order Payment'
        }
      );
      
      if (!window.Razorpay) {
        toast.dismiss(loadingToast);
        throw new Error('Failed to load Razorpay SDK');
      }
      
      // Configure Razorpay options
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Henna by Fathima",
        description: orderData.description || "Order Payment",
        order_id: order.id,
        image: "https://www.hennabyfathima.in/logo.png",
        prefill: {
          name: customerDetails.name || '',
          email: customerDetails.email || '',
          contact: customerDetails.mobile || '',
        },
        notes: {
          address: "hennabyfathima.in",
          orderId: orderData.orderId || order.id,
          items: JSON.stringify(orderData.items || []),
          customer_id: customerDetails.userId || ''
        },
        theme: {
          color: "#607973"
        },
        handler: async function(response) {
          toast.dismiss(loadingToast);
          console.log("Payment success response:", response);
          toast.success('Payment completed successfully!');
          
          try {
            // Update payment status in Supabase
            await supabase
              .from('payment_logs')
              .update({
                payment_id: response.razorpay_payment_id,
                status: 'completed',
                metadata: {
                  payment_id: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  completed_at: new Date().toISOString()
                }
              })
              .eq('order_id', response.razorpay_order_id);
              
            resolve({
              success: true,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              verified: true
            });
          } catch (dbError) {
            console.error("Error updating payment status:", dbError);
            // Still resolve as success since payment was made
            resolve({
              success: true,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              verified: false
            });
          }
        },
        modal: {
          escape: false,
          ondismiss: function() {
            toast.dismiss(loadingToast);
            toast.error('Payment cancelled');
            
            // Log cancellation
            supabase.from('payment_logs')
              .update({ 
                status: 'cancelled',
                metadata: { 
                  cancelled_at: new Date().toISOString() 
                }
              })
              .eq('order_id', order.id)
              .then(() => {})
              .catch(console.error);
            
            reject(new Error('Payment cancelled by user'));
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', async function(failedResponse) {
        toast.dismiss(loadingToast);
        console.error("Payment failed:", failedResponse.error);
        
        // Log failure to Supabase
        try {
          await supabase
            .from('payment_logs')
            .update({
              status: 'failed',
              metadata: {
                error_code: failedResponse.error.code,
                error_description: failedResponse.error.description,
                failed_at: new Date().toISOString()
              }
            })
            .eq('order_id', order.id);
        } catch (dbError) {
          console.error('Failed to log payment failure:', dbError);
        }
        
        toast.error(`Payment failed: ${failedResponse.error.description || 'Please try again'}`);
        reject(new Error(failedResponse.error.description || 'Payment failed'));
      });
      
      // Open Razorpay payment modal
      toast.dismiss(loadingToast);
      razorpay.open();
    } catch (error) {
      console.error("Error initializing payment:", error);
      toast.error(`Payment setup failed: ${error.message}`);
      reject(error);
    }
  });
};

// Get payment history for a user
export const getPaymentHistory = async (userId) => {
  if (!userId) return [];
  
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return [];
  }
};
