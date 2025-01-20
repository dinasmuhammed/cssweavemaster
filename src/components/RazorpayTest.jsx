import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { initializeRazorpayPayment } from '../utils/payment/razorpay';
import { loadRazorpayScript } from '../utils/payment/config';

const RazorpayTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
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
        orderId: `TEST_${Date.now()}`,
        amount: 1,
        customerDetails: {
          name: 'Test User',
          email: 'test@example.com',
          mobile: '9876543210'
        }
      };

      console.log('Test order data:', testOrderData);

      await initializeRazorpayPayment(
        testOrderData,
        1, // 1 rupee test amount
        testOrderData.customerDetails,
        () => {
          console.log('Test payment successful');
          toast.success("Test payment successful!");
          setIsLoading(false);
        },
        (error) => {
          console.error('Test payment failed:', error);
          toast.error(error.message || "Test payment failed");
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast.error(error.message || "Failed to initialize payment. Please check console for details.");
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