require('dotenv').config();
const express = require('express');
const { sendOrderEmail } = require('./src/utils/emailUtils');

const app = express();
app.use(express.json());

app.post('/api/send-order-email', async (req, res) => {
  try {
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