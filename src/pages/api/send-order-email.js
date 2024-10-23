import { sendOrderConfirmationEmail } from '../../utils/emailUtils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const success = await sendOrderConfirmationEmail(req.body);
    
    if (success) {
      res.status(200).json({ message: 'Order confirmation email sent successfully' });
    } else {
      res.status(500).json({ message: 'Failed to send order confirmation email' });
    }
  } catch (error) {
    console.error('Error in send-order-email API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}