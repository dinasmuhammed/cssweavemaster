
// Primary server URL
const PRIMARY_SERVER_URL = 'https://henna-by-fathima-server.vercel.app';
// Fallback to local server if primary fails
const FALLBACK_URL = window.location.origin;

export const fetchApi = async (endpoint, options = {}) => {
  try {
    // Add default headers if not provided
    const headers = options.headers || {
      'Content-Type': 'application/json',
    };

    // Try with primary server first
    let url = `${PRIMARY_SERVER_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    let usesFallback = false;
    
    console.log(`Fetching API: ${url}`, options);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
        mode: 'cors',  // Ensure CORS is enabled
      });
      
      // If primary succeeds, return the response
      if (response.ok) {
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log(`API response from ${url}:`, data);
          return data;
        }
        
        return response;
      }
      
      // If we get here, primary server responded but with an error
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: 'Could not parse error response' };
      }
      
      console.warn(`Primary server error (${response.status}):`, errorData);
      throw new Error(errorData.error || errorData.message || `Request failed with status ${response.status}`);
    } catch (primaryError) {
      // Primary server request failed, try fallback
      console.warn('Primary server request failed, trying fallback:', primaryError);
      
      // Switch to fallback URL
      url = `${FALLBACK_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
      usesFallback = true;
      
      console.log(`Trying fallback API: ${url}`);
      
      const fallbackResponse = await fetch(url, {
        ...options,
        headers,
      });
      
      if (!fallbackResponse.ok) {
        let fallbackErrorData;
        try {
          fallbackErrorData = await fallbackResponse.json();
        } catch (e) {
          fallbackErrorData = { message: 'Could not parse error response' };
        }
        throw new Error(fallbackErrorData.error || fallbackErrorData.message || `Fallback request failed with status ${fallbackResponse.status}`);
      }
      
      // Check if response is JSON
      const contentType = fallbackResponse.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await fallbackResponse.json();
        console.log(`Fallback API response from ${url}:`, data);
        return data;
      }
      
      return fallbackResponse;
    }
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Centralized API methods for Razorpay integration
export const api = {
  // Create a Razorpay order
  createOrder: async (amount, currency = 'INR') => {
    console.log(`Creating Razorpay order for amount: ${amount} ${currency}`);
    try {
      const response = await fetchApi('/api/create-order', {
        method: 'POST',
        body: JSON.stringify({ amount, currency }),
      });
      
      console.log('Create order response:', response);
      return response.order || response;
    } catch (error) {
      console.error('Order creation failed:', error);
      // Generate client-side fallback order
      const fallbackOrder = {
        id: `order_fallback_${Date.now()}_${Math.floor(Math.random() * 1e6)}`,
        amount: amount,
        currency: currency || 'INR',
        receipt: `rcpt_${Date.now()}`
      };
      console.log('Using fallback order:', fallbackOrder);
      return fallbackOrder;
    }
  },
  
  // Verify a Razorpay payment
  verifyPayment: async (paymentData) => {
    console.log('Verifying Razorpay payment:', paymentData.razorpay_payment_id);
    return fetchApi('/api/verify-payment', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },
  
  // Send order confirmation email
  sendOrderEmail: async (orderDetails) => {
    console.log('Sending order confirmation email');
    return fetchApi('/api/send-order-email', {
      method: 'POST',
      body: JSON.stringify(orderDetails),
    });
  }
};
