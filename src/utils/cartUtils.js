export const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const formatOrderData = (formData, cartItems, totalPrice) => {
  return {
    orderId: generateOrderId(),
    customerName: formData.name,
    phoneNumber: formData.phoneNumber,
    address: formData.address,
    state: formData.state,
    district: formData.district,
    items: cartItems.map(item => `${item.name} (x${item.quantity})`).join(', '),
    totalPrice: totalPrice,
    orderDate: new Date().toISOString()
  };
};

export const generateOrderId = () => `HBF-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const createUPIPaymentLink = (upiId, amount, orderId, notes) => {
  const encodedNotes = encodeURIComponent(notes);
  const truncatedNotes = encodedNotes.length > 250 ? encodedNotes.slice(0, 250) + '...' : encodedNotes;
  
  return `upi://pay?pa=${upiId}&pn=Henna%20by%20Fathima&am=${amount}&cu=INR&tn=${encodeURIComponent(`Order Payment: ${orderId}`)}&tn=${truncatedNotes}`;
};