import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { validatePaymentForm } from '@/utils/paymentUtils';
import { toast } from "sonner";

const DeliveryForm = ({ formData, onChange, onSubmit, isProcessing }) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const { isValid, errors } = validatePaymentForm(formData);
    setErrors(errors);

    if (!isValid) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    onSubmit();
  };

  const renderField = (label, name, type = "text", placeholder = "") => (
    <div>
      <Label htmlFor={name} className="text-gray-600">{label}*</Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-1 ${errors[name] ? 'border-red-500' : ''}`}
      />
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Delivery Details</h2>
      <div className="space-y-4">
        {renderField("Full Name", "name", "text", "Enter your full name")}
        {renderField("Mobile Number", "mobile", "tel", "Enter your mobile number")}
        {renderField("Email", "email", "email", "Enter your email")}
        {renderField("Address", "address", "text", "Enter your full address")}
        
        <Button 
          onClick={handleSubmit}
          disabled={isProcessing}
          className="w-full bg-[#607973] hover:bg-[#4c615c] text-white mt-6"
        >
          {isProcessing ? "Processing..." : "Proceed to Payment"}
        </Button>
      </div>
    </div>
  );
};

export default DeliveryForm;