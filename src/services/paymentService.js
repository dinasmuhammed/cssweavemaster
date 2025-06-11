
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../utils/supabaseClient';
import { loadRazorpayScript } from '../utils/paymentUtils';
import { toast } from "sonner";

// Razorpay live key for client-side
const RAZORPAY_KEY_ID = 'rzp_live_VMhrs1uuU9TTJq';
const DOMAIN_NAME = 'hennabyfathima.in';

// Utility to reliably convert amount to paise
const toPaise = (amount) => {
  const numAmount = typeof amount === 'string' ? Number(amount) : amount;
  return Math.round(numAmount * 100);
};

// Create an order in Razorpay and store in Supabase
export const createOrder = async (amount, currency = 'INR', metadata = {}) => {
  try {
    // Convert amount to paise for Razorpay
    const amountInPaise = toPaise(amount);
    
    // Generate a receipt ID
    const receipt = `rcpt_${Date.now()}_${uuidv4().substring(0, 8)}`;
    
    // First, create a record in Supabase
    const { data: orderRecord, error: dbError } = await supabase
      .from('payment_logs')
      .insert([{
        amount: amount,
        currency,
        status: 'initiated',
        metadata: {
          ...metadata,
          receipt,
          initiated_at: new Date().toISOString()
        }
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Error creating order record:', dbError);
      // Continue with payment even if DB fails
    }

    // Create order in Razorpay
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: amountInPaise, currency }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create order');
    }
    
    const data = await response.json();
    const order = data.order || data;
    
    if (!order || !order.id) {
      throw new Error('Invalid order response');
    }
    
    // Update Supabase record with Razorpay order ID
    if (orderRecord) {
      await supabase
        .from('payment_logs')
        .update({
          order_id: order.id,
          status: 'created',
          metadata: {
            ...orderRecord.metadata,
            razorpay_order_created_at: new Date().toISOString()
          }
        })
        .eq('id', orderRecord.id);
    }
    
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Verify payment and update status in Supabase
export const verifyPayment = async (paymentData) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new Error('Missing required payment verification parameters');
    }
    
    // Update payment record in Supabase with pending verification status
    const { error: updateError } = await supabase
      .from('payment_logs')
      .update({
        payment_id: razorpay_payment_id,
        status: 'pending_verification',
        metadata: {
          payment_id: razorpay_payment_id,
          signature: razorpay_signature,
          verification_started: new Date().toISOString()
        }
      })
      .eq('order_id', razorpay_order_id);
      
    if (updateError) {
      console.error('Error updating payment status in Supabase:', updateError);
    }
    
    // Send to server for verification
    const verifyResponse = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    });
    
    if (!verifyResponse.ok) {
      const errorData = await verifyResponse.json();
      throw new Error(errorData.error || 'Payment verification failed');
    }
    
    const verification = await verifyResponse.json();
    
    // Update payment status in Supabase based on verification result
    const newStatus = verification.success ? 'completed' : 'verification_failed';
    
    await supabase
      .from('payment_logs')
      .update({
        status: newStatus,
        verified_at: new Date().toISOString(),
        metadata: {
          verification_result: verification,
          verified_at: new Date().toISOString()
        }
      })
      .eq('order_id', razorpay_order_id);
      
    return verification.success || false;
  } catch (error) {
    console.error('Error verifying payment:', error);
    
    // Log verification failure to Supabase
    try {
      if (paymentData?.razorpay_order_id) {
        await supabase
          .from('payment_logs')
          .update({
            status: 'verification_error',
            metadata: {
              error: error.message,
              error_time: new Date().toISOString()
            }
          })
          .eq('order_id', paymentData.razorpay_order_id);
      }
    } catch (dbError) {
      console.error('Failed to log verification error to Supabase:', dbError);
    }
    
    throw error;
  }
};

// Initialize Razorpay payment
export const initializePayment = async (orderData, customerDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Ensure Razorpay is loaded
      await loadRazorpayScript();
      
      // Show a loading indicator
      const loadingToast = toast.loading('Preparing payment...');
      
      // Get the Razorpay order
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
          address: DOMAIN_NAME,
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
          toast.success('Payment received! Processing...');
          
          try {
            // Verify the payment
            const verification = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData
            });
            
            resolve({
              success: true,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              verified: verification
            });
          } catch (verifyError) {
            console.error("Payment verification failed:", verifyError);
            
            // Still resolve as success since payment was made
            toast.warning('Payment received but verification pending');
            resolve({
              success: true,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              verified: false,
              verificationError: verifyError.message
            });
          }
        },
        modal: {
          escape: false,
          ondismiss: function() {
            toast.dismiss(loadingToast);
            // Log cancellation
            try {
              supabase.from('payment_logs')
                .update({ 
                  status: 'cancelled',
                  metadata: { 
                    cancelled_at: new Date().toISOString() 
                  }
                })
                .eq('order_id', order.id);
            } catch (dbError) {
              console.error('Failed to log cancellation:', dbError);
            }
            
            toast.error('Payment cancelled');
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

// Update order status in Supabase
export const updateOrderStatus = async (orderId, status, details = {}) => {
  try {
    const { error } = await supabase
      .from('payment_logs')
      .update({
        status,
        metadata: {
          ...details,
          status_updated_at: new Date().toISOString()
        }
      })
      .eq('order_id', orderId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
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
