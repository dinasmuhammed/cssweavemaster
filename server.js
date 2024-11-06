require('dotenv').config();
const express = require('express');
const cors = require('express-cors');
const { sendOrderEmail } = require('./src/utils/emailUtils');

const app = express();

// Enhanced CORS configuration
app.use(cors({
  allowedOrigins: ['http://localhost:3000', 'https://hennabyfathima.com'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // 24 hours
}));

app.use(express.json());

// Health check endpoint with detailed status
app.get('/api/health', (req, res) => {
  const healthCheck = {
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  };
  res.status(200).json(healthCheck);
});

// Enhanced error handling for order email endpoint
app.post('/api/send-order-email', async (req, res) => {
  try {
    const { email, orderDetails } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        error: 'Missing required field: email',
        details: 'Please provide a valid email address'
      });
    }

    if (!orderDetails) {
      return res.status(400).json({ 
        error: 'Missing required field: orderDetails',
        details: 'Please provide order details'
      });
    }
    
    await sendOrderEmail(req.body);
    res.status(200).json({ 
      message: 'Order email sent successfully',
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error sending order email:', error);
    res.status(500).json({ 
      error: 'Failed to send order email',
      message: error.message,
      timestamp: new Date()
    });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    timestamp: new Date()
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found',
    timestamp: new Date()
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});