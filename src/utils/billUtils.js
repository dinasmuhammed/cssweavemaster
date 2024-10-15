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

export const downloadBill = (billContent, orderId) => {
  const blob = new Blob([billContent], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `bill_${orderId}.txt`;
  link.click();
};