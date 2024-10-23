import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import OrderSummaryItem from './OrderSummaryItem';

const OrderSummary = ({ 
  cartItems, 
  onQuantityChange,
  totalPrice,
  shippingCharge 
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleCouponApply = () => {
    if (couponCode.trim() === 'HF609') {
      setDiscount(2);
      toast.success('Coupon code applied successfully!');
    } else {
      setDiscount(0);
      toast.error('Invalid coupon code');
    }
  };

  const finalTotal = totalPrice + shippingCharge - discount;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <p className="text-sm text-gray-600">Total Amount Payable: ₹{finalTotal}</p>
      </div>
      
      <div className="divide-y border-y">
        {cartItems.map((item) => (
          <OrderSummaryItem 
            key={item.id} 
            item={item} 
            onQuantityChange={onQuantityChange}
          />
        ))}
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Have any Coupon Code?</p>
        <div className="flex gap-2">
          <Input 
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter the coupon code"
            className="bg-white"
          />
          <Button 
            onClick={handleCouponApply}
            variant="secondary"
            className="bg-[#f8f3ed] hover:bg-[#f0e9e1] px-6"
          >
            APPLY
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Price</span>
          <span className="text-rose-600">₹{totalPrice}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping Charge</span>
          <span className="text-rose-600">₹{shippingCharge}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">-₹{discount}</span>
          </div>
        )}
        <div className="flex justify-between font-medium pt-3 border-t">
          <span>Grand Total</span>
          <span className="text-rose-600">₹{finalTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;