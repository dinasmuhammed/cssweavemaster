const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderEmail = async (orderDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'hennabyfathima.in@gmail.com',
    subject: `New Order: ${orderDetails.orderId}`,
    text: `
      New order received:
      
      Order ID: ${orderDetails.orderId}
      Customer Name: ${orderDetails.customerName}
      Total Amount: ₹${orderDetails.totalPrice}
      
      Order Details:
      ${JSON.stringify(orderDetails, null, 2)}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order email sent successfully');
  } catch (error) {
    console.error('Error sending order email:', error);
  }
};

module.exports = { sendOrderEmail };