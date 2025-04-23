
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || {};

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your order. Your payment has been processed successfully.
          {orderId && (
            <span className="block mt-2">
              Order ID: <span className="font-medium">{orderId}</span>
            </span>
          )}
        </p>
        
        <p className="mb-6 text-gray-600">
          You will receive a confirmation email shortly with your order details.
        </p>
        
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate('/shop')}
            className="bg-[#607973] hover:bg-[#4c615c] w-full"
          >
            Continue Shopping
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full border-gray-300"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
