
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateField } from '@/utils/formValidation';

const DeliveryForm = ({ formData, onChange, isProcessing }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update the form data through parent component
    if (onChange) {
      onChange(e);
    }
    
    // Clear error for this field when typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    
    // Validate field on blur
    const fieldError = validateField(name, value);
    if (fieldError) {
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
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
            value={formData.name || ''}
            onChange={handleInputChange}
            className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
            disabled={isProcessing}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-600">Email*</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email || ''}
            onChange={handleInputChange}
            className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
            disabled={isProcessing}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="mobile" className="text-gray-600">Mobile Number*</Label>
          <div className="flex mt-1">
            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
              +91
            </span>
            <Input
              id="mobile"
              name="mobile"
              value={formData.mobile || ''}
              onChange={handleInputChange}
              className={`rounded-l-none ${errors.mobile ? 'border-red-500' : ''}`}
              disabled={isProcessing}
              placeholder="10-digit mobile number"
              maxLength={10}
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </div>
          {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
        </div>

        <div>
          <Label htmlFor="address" className="text-gray-600">Delivery Address*</Label>
          <Input
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleInputChange}
            className={`mt-1 ${errors.address ? 'border-red-500' : ''}`}
            disabled={isProcessing}
            placeholder="Enter your full delivery address"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        
        <div className="text-center text-xs text-gray-500 mt-4">
          <p>By proceeding, you agree to our Terms & Conditions</p>
          <p className="mt-1">Secure payment powered by Razorpay</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
