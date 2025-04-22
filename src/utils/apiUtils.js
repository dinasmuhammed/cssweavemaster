
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
    
    console.log(`Fetching API: ${url}`);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });
      
      // If primary succeeds, return the response
      if (response.ok) {
        // Only try to parse as JSON if we're expecting JSON
        if (response.headers.get('content-type')?.includes('application/json')) {
          return await response.json();
        }
        
        return response;
      }
      
      // If we get here, primary server responded but with an error
      const errorData = await response.json().catch(() => ({}));
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
        const fallbackErrorData = await fallbackResponse.json().catch(() => ({}));
        throw new Error(fallbackErrorData.error || fallbackErrorData.message || `Fallback request failed with status ${fallbackResponse.status}`);
      }
      
      // Only try to parse as JSON if we're expecting JSON
      if (fallbackResponse.headers.get('content-type')?.includes('application/json')) {
        return await fallbackResponse.json();
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
    return fetchApi('/api/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount, currency }),
    });
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
