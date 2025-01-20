import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { validatePaymentForm } from '@/utils/paymentUtils';
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { initializeRazorpayPayment } from '../../utils/payment/razorpay';

const DeliveryForm = ({ formData, onChange, cartItems, totalAmount }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log('Starting payment process...');
      const validation = validatePaymentForm(formData);
      setErrors(validation.errors);

      if (!validation.isValid) {
        console.log('Form validation failed:', validation.errors);
        toast.error("Please fill all required fields correctly");
        return;
      }

      if (!cartItems?.length) {
        console.log('Cart is empty');
        toast.error("Your cart is empty");
        return;
      }

      if (!totalAmount || totalAmount <= 0) {
        console.log('Invalid total amount:', totalAmount);
        toast.error("Invalid order amount");
        return;
      }

      setIsProcessing(true);
      toast.info("Initializing payment...");

      const orderData = {
        orderId: `ORDER_${Date.now()}`,
        amount: totalAmount,
        customerDetails: formData,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      console.log('Order data prepared:', orderData);

      await initializeRazorpayPayment(
        orderData,
        totalAmount,
        formData,
        () => {
          console.log('Payment successful');
          setIsProcessing(false);
          toast.success("Payment successful! Thank you for your order.");
          navigate('/');
        },
        (error) => {
          console.error('Payment failed:', error);
          setIsProcessing(false);
          toast.error(error.message || "Payment failed. Please try again.");
        }
      );
    } catch (error) {
      console.error('Payment initialization error:', error);
      setIsProcessing(false);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Delivery Address</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-600">Full Name*</Label>
          <Input
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={onChange}
            className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
            disabled={isProcessing}
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-600">Email*</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email || ''}
            onChange={onChange}
            className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
            disabled={isProcessing}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="mobile" className="text-gray-600">Mobile Number*</Label>
          <div className="flex mt-1">
            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
              +91
            </span>
            <Input
              id="mobile"
              name="mobile"
              value={formData.mobile || ''}
              onChange={onChange}
              className={`rounded-l-none ${errors.mobile ? 'border-red-500' : ''}`}
              disabled={isProcessing}
              required
            />
          </div>
          {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
        </div>

        <div>
          <Label htmlFor="address" className="text-gray-600">Address Line*</Label>
          <Input
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={onChange}
            className={`mt-1 ${errors.address ? 'border-red-500' : ''}`}
            disabled={isProcessing}
            required
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={isProcessing}
          className="w-full bg-[#607973] hover:bg-[#4c615c] text-white mt-6"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Payment...
            </>
          ) : (
            'Proceed to Payment'
          )}
        </Button>
      </div>
    </div>
  );
};

export default DeliveryForm;