
const BASE_URL = 'https://henna-by-fathima-server.vercel.app';

export const fetchApi = async (endpoint, options = {}) => {
  try {
    // Add default headers if not provided
    const headers = options.headers || {
      'Content-Type': 'application/json',
    };

    // Ensure the URL has a leading slash if needed
    const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    console.log(`Fetching: ${url}`);
    
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Process the response
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`API Error (${response.status}):`, errorData);
      throw new Error(errorData.error || errorData.message || `Request failed with status ${response.status}`);
    }

    // Only try to parse as JSON if we're expecting JSON
    if (response.headers.get('content-type')?.includes('application/json')) {
      return await response.json();
    }

    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const api = {
  createOrder: async (amount, currency = 'INR') => {
    return fetchApi('/api/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount, currency }),
    });
  },
  
  verifyPayment: async (paymentData) => {
    return fetchApi('/api/verify-payment', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  },
  
  sendOrderEmail: async (orderDetails) => {
    return fetchApi('/api/send-order-email', {
      method: 'POST',
      body: JSON.stringify(orderDetails),
    });
  }
};
