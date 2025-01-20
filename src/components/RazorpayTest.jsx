import React from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { initializeRazorpayPayment } from '../utils/payment/razorpay';

const RazorpayTest = () => {
  const handleTestPayment = async () => {
    try {
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

      await initializeRazorpayPayment(
        testOrderData,
        1, // 1 rupee test amount
        testOrderData.customerDetails,
        () => {
          console.log('Test payment successful');
          toast.success("Test payment successful!");
        },
        (error) => {
          console.error('Test payment failed:', error);
          toast.error(error.message || "Test payment failed");
        }
      );
    } catch (error) {
      console.error('Test payment initialization error:', error);
      toast.error("Failed to initialize test payment");
    }
  };

  return (
    <div className="p-4">
      <Button 
        onClick={handleTestPayment}
        className="bg-[#607973] hover:bg-[#4c615c] text-white"
      >
        Test Razorpay Integration (₹1)
      </Button>
    </div>
  );
};

export default RazorpayTest;