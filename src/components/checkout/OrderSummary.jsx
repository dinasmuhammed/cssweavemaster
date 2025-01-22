import React, { useState } from 'react';
import OrderSummaryItem from './OrderSummaryItem';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const OrderSummary = ({ 
  cartItems, 
  onQuantityChange,
  totalPrice = 0
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const calculateShippingCharge = () => {
    if (!Array.isArray(cartItems)) {
      console.error('Invalid cartItems:', cartItems);
      return 0;
    }

    const totalItems = cartItems.reduce((sum, item) => {
      const quantity = Number(item.quantity) || 0;
      return sum + quantity;
    }, 0);
    
    if (totalItems === 0) return 0;
    if (totalItems === 1) return 35;
    if (totalItems === 2) return 36;
    
    // For 3 or more items, increase by ₹15 per additional item
    const baseCharge = 36; // Base charge for 2 items
    const additionalItems = totalItems - 2;
    const additionalCharge = additionalItems * 15;
    
    return baseCharge + additionalCharge;
  };

  const validateCoupon = () => {
    if (!couponCode?.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    // Example coupon codes
    const validCoupons = {
      'WELCOME10': 10,
      'SPECIAL20': 20,
      'HENNA25': 25
    };

    const discountPercentage = validCoupons[couponCode.toUpperCase()];
    if (discountPercentage) {
      const discountAmount = Math.round((totalPrice * discountPercentage) / 100);
      setDiscount(discountAmount);
      toast.success(`Coupon applied! ${discountPercentage}% discount`);
    } else {
      toast.error('Invalid coupon code');
      setDiscount(0);
    }
  };

  const shippingCharge = calculateShippingCharge();
  const finalTotal = Math.max(0, (totalPrice || 0) + shippingCharge - discount);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <p className="text-sm text-gray-600">Total Amount Payable: ₹{finalTotal}</p>
      </div>
      
      <div className="divide-y border-y">
        {Array.isArray(cartItems) && cartItems.map((item) => (
          <OrderSummaryItem 
            key={item.id} 
            item={item} 
            onQuantityChange={onQuantityChange}
          />
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Have a coupon code?"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={validateCoupon}
            variant="outline"
            className="whitespace-nowrap"
          >
            Apply Coupon
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Price</span>
            <span className="text-rose-600">₹{totalPrice || 0}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span className="text-green-600">-₹{discount}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping Charge</span>
            <span className="text-rose-600">₹{shippingCharge}</span>
          </div>
          <div className="flex justify-between font-medium pt-3 border-t">
            <span>Grand Total</span>
            <span className="text-rose-600">₹{finalTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;