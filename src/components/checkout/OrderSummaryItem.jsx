import React from 'react';

const OrderSummaryItem = ({ item, onQuantityChange }) => {
  if (!item?.id || !item?.name || !item?.price) {
    console.error('Invalid item data:', item);
    return null;
  }

  const handleQuantityChange = (change) => {
    if (typeof onQuantityChange !== 'function') {
      console.error('onQuantityChange is not a function');
      return;
    }
    
    const currentQuantity = Number(item.quantity) || 0;
    const newQuantity = currentQuantity + change;
    
    if (newQuantity >= 1) {
      onQuantityChange(item.id, change);
    }
  };

  const itemPrice = (Number(item.price) || 0) * (Number(item.quantity) || 0);

  return (
    <div className="flex items-start gap-4 py-4">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-16 h-16 object-cover rounded" 
        onError={(e) => {
          console.warn('Failed to load image:', item.image);
          e.target.src = '/placeholder.svg';
        }}
      />
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium">
            {item.name} 
            {item?.weight && <span className="text-gray-500 ml-1">{item.weight}g</span>}
          </h3>
          <span className="font-medium text-rose-600">₹{itemPrice}</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <button 
            onClick={() => handleQuantityChange(-1)}
            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="text-sm w-4 text-center">{item.quantity || 0}</span>
          <button 
            onClick={() => handleQuantityChange(1)}
            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryItem;