import { sendOrderEmail } from '../utils/emailUtils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await sendOrderEmail(req.body);
    res.status(200).json({ message: 'Order email sent successfully' });
  } catch (error) {
    console.error('Error sending order email:', error);
    res.status(500).json({ error: 'Failed to send order email' });
  }
}