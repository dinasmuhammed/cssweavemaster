import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { validatePaymentForm } from '@/utils/formValidation';
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { initializeRazorpayPayment, generateOrderId } from '@/utils/paymentUtils';
import { v4 as uuidv4 } from 'uuid';

const DeliveryForm = ({ formData, onChange, cartItems, totalAmount }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const formatCartForRazorpay = (items) => {
    if (!Array.isArray(items) || items.length === 0) return 'No items';
    return items.map(item => `${item.name} x${item.quantity}`).join(', ');
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

      const orderId = generateOrderId();

      const orderData = {
        orderId,
        items: cartItems,
        timestamp: new Date().toISOString(),
        customerEmail: formData.email,
        customerPhone: formData.mobile,
        deliveryAddress: formData.address,
        cartSummary: formatCartForRazorpay(cartItems)
      };

      await initializeRazorpayPayment(
        orderData,
        totalAmount,
        {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          address: formData.address
        },
        (response) => {
          try {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            orders.push({
              ...orderData,
              paymentId: response.razorpay_payment_id,
              paymentStatus: 'completed',
              amount: totalAmount
            });
            localStorage.setItem('orders', JSON.stringify(orders));
          } catch (err) {}
          toast.success("Order placed successfully! Thank you for shopping with us.");
          clearCart();
          navigate('/');
        },
        (error) => {
          try {
            const failedOrders = JSON.parse(localStorage.getItem('failed_orders') || '[]');
            failedOrders.push({
              ...orderData,
              error: error.message,
              timestamp: new Date().toISOString()
            });
            localStorage.setItem('failed_orders', JSON.stringify(failedOrders));
          } catch (err) {}
          toast.error(
            <>
              Payment failed: {error.message || 'Please try again'}.
              <div className="mt-1 flex gap-2 justify-center">
                <button className="underline" onClick={() => window.location.reload()}>Retry</button>
                <button className="underline" onClick={() => navigate('/shop')}>Back to Shop</button>
              </div>
            </>
          );
          setIsProcessing(false);
        }
      );
    } catch (error) {
      toast.error(
        <>
          Payment error: {error.message || "Initialization failed"}.
          <div className="mt-1 flex gap-2 justify-center">
            <button className="underline" onClick={() => window.location.reload()}>Retry</button>
            <button className="underline" onClick={() => navigate('/shop')}>Back to Shop</button>
          </div>
        </>
      );
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
            placeholder="Enter your full name"
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
            placeholder="Enter your email"
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
              placeholder="10-digit mobile number"
              maxLength={10}
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>
          {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
        </div>

        <div>
          <Label htmlFor="address" className="text-gray-600">Delivery Address*</Label>
          <Input
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={onChange}
            className={`mt-1 ${errors.address ? 'border-red-500' : ''}`}
            disabled={isProcessing}
            placeholder="Enter your full delivery address"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700">Order Summary</h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            {Array.isArray(cartItems) && cartItems.length > 0 ? (
              cartItems.map(item => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))
            ) : (
              <li>No items in cart</li>
            )}
          </ul>
          <div className="mt-2 pt-2 border-t border-gray-200 text-sm font-medium flex justify-between">
            <span>Total Amount:</span>
            <span className="text-rose-600">₹{totalAmount}</span>
          </div>
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
        
        <div className="text-center text-xs text-gray-500 mt-4">
          <p>By proceeding, you agree to our Terms & Conditions</p>
          <p className="mt-1">Secure payment powered by Razorpay</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
