import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    state: '',
    district: '',
  });

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    // Here you would typically send the form data and cart items to your backend
    console.log('Purchase Data:', { ...formData, items: cartItems, totalPrice });
    alert('Thank you for your purchase!');
    // Reset form and cart here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price * item.quantity}</p>
                  </div>
                </div>
                <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Total: ₹{totalPrice}</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto">Proceed to Purchase</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Complete Your Purchase</DialogTitle>
                </DialogHeader>
                <form onSubmit={handlePurchase} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="district">District</Label>
                    <Input id="district" name="district" value={formData.district} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label>Products</Label>
                    <ul className="list-disc list-inside">
                      {cartItems.map((item) => (
                        <li key={item.id}>{item.name} (x{item.quantity})</li>
                      ))}
                    </ul>
                  </div>
                  <Button type="submit" className="w-full">Complete Purchase</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;