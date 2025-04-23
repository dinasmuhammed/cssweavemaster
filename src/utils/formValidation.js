
// Regex constants
const PINCODE_REGEX = /^\d{6}$/;
const MOBILE_REGEX = /^\d{10}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[A-Za-z\s]{3,50}$/;

export const validateDeliveryForm = (formData) => {
  const errors = {};
  
  // Name validation
  if (!formData.name?.trim()) {
    errors.name = "Name is required";
  } else if (!NAME_REGEX.test(formData.name)) {
    errors.name = "Please enter a valid name (3-50 characters, letters only)";
  }
  
  // Address validation
  if (!formData.address?.trim()) {
    errors.address = "Address is required";
  } else if (formData.address.length < 10) {
    errors.address = "Please enter a complete address (at least 10 characters)";
  }
  
  if (!formData.area?.trim()) errors.area = "Area is required";
  if (!formData.country?.trim()) errors.country = "Country is required";
  if (!formData.state?.trim()) errors.state = "State is required";
  if (!formData.district?.trim()) errors.district = "District is required";
  
  // Mobile validation
  if (!formData.mobile?.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!MOBILE_REGEX.test(formData.mobile)) {
    errors.mobile = "Mobile number must be exactly 10 digits";
  }
  
  // Email validation
  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }
  
  // Pincode validation
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
  
  // Name validation
  if (!formData.name?.trim()) {
    errors.name = "Name is required";
  } else if (formData.name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }
  
  // Email validation
  if (!formData.email?.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }
  
  // Mobile validation
  if (!formData.mobile?.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!MOBILE_REGEX.test(formData.mobile)) {
    errors.mobile = "Mobile number must be exactly 10 digits";
  }
  
  // Address validation
  if (!formData.address?.trim()) {
    errors.address = "Address is required";
  } else if (formData.address.length < 10) {
    errors.address = "Please enter a complete address (at least 10 characters)";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Utility function to validate only specific fields
export const validateField = (field, value) => {
  switch (field) {
    case 'name':
      if (!value?.trim()) return "Name is required";
      if (value.length < 3) return "Name must be at least 3 characters";
      return "";
      
    case 'email':
      if (!value?.trim()) return "Email is required";
      if (!EMAIL_REGEX.test(value)) return "Please enter a valid email address";
      return "";
      
    case 'mobile':
      if (!value?.trim()) return "Mobile number is required";
      if (!MOBILE_REGEX.test(value)) return "Mobile number must be exactly 10 digits";
      return "";
      
    case 'address':
      if (!value?.trim()) return "Address is required";
      if (value.length < 10) return "Please enter a complete address";
      return "";
      
    case 'pincode':
      if (!value?.trim()) return "Pincode is required";
      if (!PINCODE_REGEX.test(value)) return "Pincode must be exactly 6 digits";
      return "";
      
    default:
      return "";
  }
};
