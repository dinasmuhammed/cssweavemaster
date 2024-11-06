import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import OrderSummaryItem from './OrderSummaryItem';
import { ChevronDown, ChevronUp } from 'lucide-react';

const OrderSummary = ({ 
  cartItems, 
  onQuantityChange,
  totalPrice,
  shippingCharge 
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showCouponInput, setShowCouponInput] = useState(false);

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
        <button
          onClick={() => setShowCouponInput(!showCouponInput)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Have any Coupon Code? {showCouponInput ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {showCouponInput && (
          <div className="flex gap-2 mt-3">
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
        )}
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