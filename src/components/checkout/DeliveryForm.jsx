import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { validatePaymentForm } from '@/utils/paymentUtils';
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const DeliveryForm = ({ formData, onChange, onSubmit, isProcessing }) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const validation = validatePaymentForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    onSubmit();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Delivery Details</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-600">Full Name*</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Enter your full name"
            className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="mobile" className="text-gray-600">Mobile Number*</Label>
          <Input
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={onChange}
            placeholder="Enter your mobile number"
            className={`mt-1 ${errors.mobile ? 'border-red-500' : ''}`}
          />
          {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-600">Email*</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Enter your email"
            className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="address" className="text-gray-600">Address*</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Enter your full address"
            className={`mt-1 ${errors.address ? 'border-red-500' : ''}`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        
        <Button 
          onClick={handleSubmit}
          disabled={isProcessing}
          className="w-full bg-[#607973] hover:bg-[#4c615c] text-white mt-6"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Proceed to Payment'
          )}
        </Button>
      </div>
    </div>
  );
};

export default DeliveryForm;