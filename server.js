require('dotenv').config();
const express = require('express');
const cors = require('express-cors');
const { sendOrderEmail } = require('./src/utils/emailUtils');

const app = express();

// Enable CORS
app.use(cors({
  allowedOrigins: ['http://localhost:3000', 'https://hennabyfathima.com']
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/api/send-order-email', async (req, res) => {
  try {
    if (!req.body || !req.body.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    await sendOrderEmail(req.body);
    res.status(200).json({ message: 'Order email sent successfully' });
  } catch (error) {
    console.error('Error sending order email:', error);
    res.status(500).json({ error: 'Failed to send order email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});