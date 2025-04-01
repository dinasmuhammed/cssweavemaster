
export const sendOrderConfirmationEmail = async (orderDetails) => {
  try {
    const response = await fetch('https://henna-by-fathima-server.vercel.app/api/send-order-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Email sending error:', errorData);
      throw new Error(errorData.message || 'Failed to send order confirmation email');
    }

    return true;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return false;
  }
};

export const sendOrderEmail = async (orderData) => {
  if (!orderData || !orderData.customerDetails) {
    console.error('Invalid order data for email', orderData);
    return false;
  }
  
  try {
    // Format the order items for email
    const itemsHtml = orderData.items.map(item => 
      `<tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">₹${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    ).join('');

    const totalAmount = orderData.amount || 
      orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #607973; text-align: center;">Order Confirmation</h2>
        <p>Dear ${orderData.customerDetails.name},</p>
        <p>Thank you for your order with Henna by Fathima. We are processing your order and will keep you updated.</p>
        
        <h3 style="color: #607973; margin-top: 20px;">Order Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f8f8f8;">
              <th style="padding: 10px; text-align: left;">Product</th>
              <th style="padding: 10px; text-align: left;">Quantity</th>
              <th style="padding: 10px; text-align: left;">Price</th>
              <th style="padding: 10px; text-align: left;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr style="background-color: #f8f8f8;">
              <td colspan="3" style="padding: 10px; text-align: right;"><strong>Total:</strong></td>
              <td style="padding: 10px;"><strong>₹${totalAmount.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>
        
        <h3 style="color: #607973; margin-top: 20px;">Shipping Details</h3>
        <p><strong>Name:</strong> ${orderData.customerDetails.name}</p>
        <p><strong>Email:</strong> ${orderData.customerDetails.email}</p>
        <p><strong>Phone:</strong> ${orderData.customerDetails.mobile}</p>
        <p><strong>Address:</strong> ${orderData.customerDetails.address}</p>
        
        <div style="margin-top: 30px; text-align: center; color: #777; font-size: 14px;">
          <p>If you have any questions, please contact us at <a href="mailto:info@hennabyfathima.com">info@hennabyfathima.com</a></p>
          <p>&copy; 2023 Henna by Fathima. All rights reserved.</p>
        </div>
      </div>
    `;

    // Here you would typically use a nodemailer or similar service to send the email
    // For this example, we're just logging it
    console.log('Email would be sent with content:', emailHtml);
    
    // Return true to indicate success (in a real implementation, you'd return based on email sending success)
    return true;
  } catch (error) {
    console.error('Error formatting and sending order email:', error);
    return false;
  }
};
