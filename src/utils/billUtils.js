import axios from 'axios';

export const generateBill = (orderData) => {
  const { customerName, phoneNumber, address, state, district, items, totalPrice, orderDate } = orderData;
  
  return `
    Bill for Order ${orderData.orderId}
    Date: ${new Date(orderDate).toLocaleString()}

    Customer Details:
    Name: ${customerName}
    Phone: ${phoneNumber}
    Address: ${address}
    State: ${state}
    District: ${district}

    Items:
    ${items}

    Total Price: ₹${totalPrice}

    Thank you for your purchase!
  `;
};

export const sendBillToWhatsApp = async (phoneNumber, billContent) => {
  try {
    // This is a placeholder API call. You would need to implement a proper WhatsApp Business API integration.
    await axios.post('https://your-whatsapp-api-endpoint.com/send', {
      phoneNumber,
      message: billContent
    });
    console.log('Bill sent to WhatsApp successfully');
  } catch (error) {
    console.error('Failed to send bill to WhatsApp:', error);
  }
};