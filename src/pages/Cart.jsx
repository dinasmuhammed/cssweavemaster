import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
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
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCharge = 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
        <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <p className="text-sm text-gray-600">Total Amount Payable: ₹{totalPrice + shippingCharge}</p>
          </div>
          
          <div className="divide-y border-y border-gray-100">
            {cartItems.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium mb-3">Have any Coupon Code?</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter the coupon code"
                className="bg-white"
              />
              <Button 
                variant="secondary"
                className="bg-[#f8f3ed] hover:bg-[#f0e9e1] px-6"
              >
                APPLY
              </Button>
            </div>
          </div>

          <div className="space-y-3 mt-6">
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
              <span className="text-rose-600">₹{totalPrice + shippingCharge}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Delivery Address</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="address" className="text-gray-600">Flat/House no/Building/Company/Apartment</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="area" className="text-gray-600">Area, Street, Sector, Village</Label>
              <Input
                id="area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country" className="text-gray-600">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-gray-600">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="district" className="text-gray-600">District</Label>
                <Input
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="mobile" className="text-gray-600">Mobile Number</Label>
                <div className="flex mt-1">
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
                <Label htmlFor="email" className="text-gray-600">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="pincode" className="text-gray-600">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>
            <Button 
              onClick={handleCheckout}
              className="w-full bg-[#607973] hover:bg-[#4c615c] text-white mt-6"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;