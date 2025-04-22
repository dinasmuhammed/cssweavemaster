import React, { useState } from 'react';
import OrderSummaryItem from './OrderSummaryItem';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Info } from "lucide-react";

const OrderSummary = ({
  cartItems,
  onQuantityChange,
  totalPrice = 0,
  shippingCharge = 0
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const calculateShippingCharge = () => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
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

    // Example coupon codes - in a real app, this would come from a backend
    const validCoupons = {
      'WELCOME10': {discount: 10, name: 'New Customer Discount'},
      'SPECIAL20': {discount: 20, name: 'Special Offer'},
      'HENNA25': {discount: 25, name: 'Loyalty Discount'}
    };

    const couponInfo = validCoupons[couponCode.toUpperCase()];
    
    if (couponInfo) {
      const discountAmount = Math.round((totalPrice * couponInfo.discount) / 100);
      setDiscount(discountAmount);
      setAppliedCoupon(couponInfo.name);
      toast.success(`Coupon applied! ${couponInfo.discount}% ${couponInfo.name}`);
    } else {
      toast.error('Invalid coupon code');
      setDiscount(0);
      setAppliedCoupon(null);
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setCouponCode('');
    setAppliedCoupon(null);
    toast.info('Coupon removed');
  };

  const shippingCharge = calculateShippingCharge();
  const finalTotal = Math.max(0, (totalPrice || 0) + shippingCharge - discount);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <p className="text-sm text-gray-600">Total Amount Payable: <span className="font-bold text-rose-600">₹{finalTotal}</span></p>
      </div>
      
      <div className="divide-y border-y">
        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <OrderSummaryItem 
              key={item.id} 
              item={item} 
              onQuantityChange={onQuantityChange}
            />
          ))
        ) : (
          <div className="py-4 text-center text-gray-500">Your cart is empty</div>
        )}
      </div>

      <div className="space-y-4">
        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-green-50 p-2 rounded-md border border-green-200">
            <div>
              <span className="text-sm font-medium text-green-700">Applied: {appliedCoupon}</span>
              <span className="ml-2 text-sm text-green-600">(-₹{discount})</span>
            </div>
            <Button 
              onClick={removeCoupon}
              variant="ghost" 
              className="h-8 text-sm text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              Remove
            </Button>
          </div>
        ) : (
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
        )}

        <div className="p-4 rounded border shadow-sm space-y-3 bg-gray-50">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>₹{totalPrice || 0}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping Charges:</span>
            <span>₹{shippingCharge}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Discount:</span>
              <span className="text-green-600">-₹{discount}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold border-t pt-2 mt-2">
            <span>Total Payable:</span>
            <span className="text-xl text-rose-600">₹{finalTotal}</span>
          </div>
        </div>
        
        <div className="flex items-start gap-2 text-xs bg-blue-50 p-2 rounded border border-blue-100">
          <Info className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-blue-700">
            <p>Shipping charges are calculated based on the number of items:</p>
            <ul className="mt-1 list-disc list-inside">
              <li>1 item: ₹35</li>
              <li>2 items: ₹36</li>
              <li>3+ items: ₹36 + ₹15 per additional item</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
