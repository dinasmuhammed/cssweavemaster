import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PurchaseForm = ({ formData, handleInputChange, handlePurchase, cartItems }) => (
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
);

export default PurchaseForm;