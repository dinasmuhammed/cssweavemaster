import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const DeliveryAddressForm = ({ formData, onChange, onSubmit }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold">Delivery Address</h2>
    <div className="space-y-4">
      <div>
        <Label htmlFor="address" className="text-gray-600">Flat/House no/Building/Company/Apartment</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={onChange}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="area" className="text-gray-600">Area, Street, Sector, Village</Label>
        <Input
          id="area"
          name="area"
          value={formData.area}
          onChange={onChange}
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
            onChange={onChange}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="state" className="text-gray-600">State</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={onChange}
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
            onChange={onChange}
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
              onChange={onChange}
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
            onChange={onChange}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="pincode" className="text-gray-600">Pincode</Label>
          <Input
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={onChange}
            className="mt-1"
          />
        </div>
      </div>
      <Button 
        onClick={onSubmit}
        className="w-full bg-[#607973] hover:bg-[#4c615c] text-white mt-6"
      >
        Proceed to Checkout
      </Button>
    </div>
  </div>
);

export default DeliveryAddressForm;