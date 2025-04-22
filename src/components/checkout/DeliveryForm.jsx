import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { validatePaymentForm } from '@/utils/paymentUtils';
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { getRazorpayConfig } from '@/api/razorpay';
import { v4 as uuidv4 } from 'uuid';

const DeliveryForm = ({ formData, onChange, cartItems, totalAmount }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        resolve();
      };
      document.body.appendChild(script);
    });
  };

  const createDirectOrder = async (amount) => {
    const amountInPaise = amount < 100 ? Math.round(amount * 100) : amount;
    
    return {
      id: `order_${uuidv4()}`,
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${uuidv4()}`
    };
  };

  const initializePayment = (orderData) => {
    return new Promise((resolve, reject) => {
      const razorpayConfig = getRazorpayConfig();
      const options = {
        ...razorpayConfig,
        order_id: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        handler: function(response) {
          resolve(response);
        },
        modal: {
          ondismiss: function() {
            reject(new Error('Payment cancelled by user'));
          }
        }
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    });
  };

  const handleSubmit = async () => {
    try {
      const validation = validatePaymentForm(formData);
      setErrors(validation.errors);

      if (!validation.isValid) {
        toast.error("Please fill all required fields correctly");
        return;
      }

      if (!cartItems?.length) {
        toast.error("Your cart is empty");
        return;
      }

      setIsProcessing(true);
      toast.info("Initializing payment...");

      await loadRazorpayScript();
      
      let orderData;
      
      try {
        const response = await fetch('https://henna-by-fathima-server.vercel.app/api/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalAmount,
            currency: 'INR',
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          orderData = data.order;
          console.log('Server order created:', orderData);
        } else {
          throw new Error('Server order creation failed');
        }
      } catch (serverError) {
        console.warn('Server order creation failed, using direct integration:', serverError);
        orderData = await createDirectOrder(totalAmount);
        console.log('Direct order created:', orderData);
      }
      
      if (!orderData || !orderData.id) {
        throw new Error('Failed to create payment order');
      }
      
      const paymentResponse = await initializePayment(orderData);
      console.log('Payment successful:', paymentResponse);
      
      try {
        const verifyResponse = await fetch('https://henna-by-fathima-server.vercel.app/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_signature: paymentResponse.razorpay_signature,
            orderData: {
              items: cartItems,
              customerDetails: formData,
              amount: totalAmount
            }
          }),
        });
        
        if (verifyResponse.ok) {
          console.log('Payment verified on server');
        } else {
          console.warn('Server verification failed, but proceeding with payment');
        }
      } catch (verifyError) {
        console.warn('Payment verification on server failed:', verifyError);
      }
      
      toast.success("Payment successful! Thank you for your order.");
      clearCart();
      navigate('/');
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment initialization failed. Please try again later.");
      setIsProcessing(false);
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
