import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { initializePayment, verifyPayment } from '../services/paymentService';
import { loadRazorpayScript } from '../utils/payment/config';

const RazorpayTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  React.useEffect(() => {
    const loadScript = async () => {
      try {
        await loadRazorpayScript();
        setScriptLoaded(true);
        console.log('Razorpay script loaded successfully');
      } catch (error) {
        console.error('Failed to load Razorpay script:', error);
        toast.error("Failed to load payment gateway");
      }
    };
    loadScript();
  }, []);

  const handleTestPayment = async () => {
    if (!scriptLoaded) {
      toast.error("Payment gateway is not ready. Please try again.");
      return;
    }

    try {
      setIsLoading(true);
      console.log('Starting test payment...');
      
      const testOrderData = {
        amount: 1,
        currency: 'INR',
        customerDetails: {
          name: 'Test User',
          email: 'test@example.com',
          mobile: '9876543210'
        }
      };

      const { order, paymentRecord } = await initializePayment(testOrderData);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Henna by Fathima",
        description: "Test Payment",
        order_id: order.id,
        handler: async function(response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              paymentRecordId: paymentRecord.id
            });
            toast.success("Test payment successful!");
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: testOrderData.customerDetails.name,
          email: testOrderData.customerDetails.email,
          contact: testOrderData.customerDetails.mobile
        },
        theme: {
          color: "#607973"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast.error(error.message || "Failed to initialize payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Button 
        onClick={handleTestPayment}
        disabled={isLoading || !scriptLoaded}
        className="bg-[#607973] hover:bg-[#4c615c] text-white"
      >
        {isLoading ? 'Processing...' : 'Test Razorpay Integration (₹1)'}
      </Button>
      {!scriptLoaded && (
        <p className="text-sm text-red-500 mt-2">
          Payment gateway is loading...
        </p>
      )}
    </div>
  );
};

export default RazorpayTest;