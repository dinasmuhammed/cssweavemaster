import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { initializeRazorpayPayment } from '../utils/paymentUtils';

const Checkout = () => {
  const { cartItems, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [formData, setFormData] = useState({
    address: '',
    area: '',
    country: '',
    state: '',
    district: '',
    mobile: '',
    email: '',
    pincode: ''
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCharge = 0; // Free shipping
  const grandTotal = totalPrice + shippingCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    toast.error("Invalid coupon code");
    setCouponCode('');
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;
    
    try {
      await initializeRazorpayPayment(
        { ...formData, items: cartItems },
        grandTotal,
        formData,
        () => toast.success("Payment successful"),
        (error) => toast.error(error.message)
      );
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    }
  };

  const validateForm = () => {
    const requiredFields = ['address', 'area', 'country', 'state', 'district', 'mobile', 'email', 'pincode'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in ${field.charAt(0).toUpperCase() + field.slice(1)}`);
        return false;
      }
    }
    return true;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <p className="text-sm text-gray-600 mb-4">Total Amount Payable: ₹{grandTotal}</p>
          
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Label>Have any Coupon Code?</Label>
            <div className="flex space-x-2">
              <Input 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter the coupon code"
              />
              <Button onClick={handleApplyCoupon}>Apply</Button>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <span>Total Price</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Charge</span>
              <span>₹{shippingCharge}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Grand Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Flat/House no/Building/Company/Apartment</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="area">Area, Street, Sector, Village</Label>
              <Input
                id="area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                    +91
                  </span>
                  <Input
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="rounded-l-none"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <Button 
              onClick={handleCheckout}
              className="w-full bg-green-800 hover:bg-green-700 text-white mt-4"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;