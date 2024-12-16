import React from 'react';
import OrderSummaryItem from './OrderSummaryItem';

const OrderSummary = ({ 
  cartItems, 
  onQuantityChange,
  totalPrice
}) => {
  const calculateShippingCharge = () => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems >= 6) {
      return 80; // Fixed charge for 6 or more items
    } else if (totalItems === 1) {
      return 35; // Fixed charge for single item
    } else {
      // Base charge for 2-5 items
      const baseCharge = 25;
      const additionalCharge = 35;
      return baseCharge + (Math.floor((totalItems - 1) / 2) * additionalCharge);
    }
  };

  const shippingCharge = calculateShippingCharge();
  const finalTotal = totalPrice + shippingCharge;

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

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Price</span>
          <span className="text-rose-600">₹{totalPrice}</span>
        </div>
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
  );
};

export default OrderSummary;