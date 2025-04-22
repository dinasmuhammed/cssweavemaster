
// Regex constants
const PINCODE_REGEX = /^\d{6}$/;
const MOBILE_REGEX = /^\d{10}$/;

export const validateDeliveryForm = (formData) => {
  const errors = {};
  
  if (!formData.address?.trim()) errors.address = "Address is required";
  if (!formData.area?.trim()) errors.area = "Area is required";
  if (!formData.country?.trim()) errors.country = "Country is required";
  if (!formData.state?.trim()) errors.state = "State is required";
  if (!formData.district?.trim()) errors.district = "District is required";
  
  if (!formData.mobile?.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!MOBILE_REGEX.test(formData.mobile)) {
    errors.mobile = "Mobile number must be 10 digits";
  }
  
  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email format";
  }
  
  if (!formData.pincode?.trim()) {
    errors.pincode = "Pincode is required";
  } else if (!PINCODE_REGEX.test(formData.pincode)) {
    errors.pincode = "Pincode must be exactly 6 digits";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validatePaymentForm = (formData) => {
  const errors = {};
  if (!formData.name?.trim()) errors.name = "Name is required";
  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email format";
  }
  if (!formData.mobile?.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!MOBILE_REGEX.test(formData.mobile)) {
    errors.mobile = "Mobile number must be 10 digits";
  }
  if (!formData.address?.trim()) errors.address = "Address is required";
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

