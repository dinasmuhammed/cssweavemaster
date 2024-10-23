import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OrderSummaryItem from './OrderSummaryItem';

const OrderSummary = ({ 
  cartItems, 
  onQuantityChange, 
  couponCode, 
  onCouponChange, 
  onApplyCoupon,
  totalPrice,
  shippingCharge 
}) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold">Order Summary</h2>
    <p className="text-sm text-gray-600">Total Amount Payable: ₹{totalPrice + shippingCharge}</p>
    
    <div className="divide-y">
      {cartItems.map((item) => (
        <OrderSummaryItem 
          key={item.id} 
          item={item} 
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>

    <div className="pt-4">
      <p className="text-sm font-medium mb-2">Have any Coupon Code?</p>
      <div className="flex gap-2">
        <Input 
          value={couponCode}
          onChange={onCouponChange}
          placeholder="Enter the coupon code"
          className="bg-white"
        />
        <Button 
          onClick={onApplyCoupon}
          variant="secondary"
          className="bg-[#f8f3ed] hover:bg-[#f0e9e1]"
        >
          APPLY
        </Button>
      </div>
    </div>

    <div className="space-y-2 pt-4">
      <div className="flex justify-between text-sm">
        <span>Total Price</span>
        <span>₹{totalPrice}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Shipping Charge</span>
        <span>₹{shippingCharge}</span>
      </div>
      <div className="flex justify-between font-medium pt-2 border-t">
        <span>Grand Total</span>
        <span>₹{totalPrice + shippingCharge}</span>
      </div>
    </div>
  </div>
);

export default OrderSummary;