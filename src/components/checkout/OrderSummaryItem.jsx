import React from 'react';

const OrderSummaryItem = ({ item, onQuantityChange }) => (
  <div className="flex items-start gap-4 py-4">
    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
    <div className="flex-grow">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium">
          {item.name} 
          {item?.weight && <span className="text-gray-500 ml-1">{item.weight}g</span>}
        </h3>
        <span className="font-medium text-rose-600">₹{item.price * item.quantity}</span>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <button 
          onClick={() => onQuantityChange(item.id, -1)}
          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
        >
          -
        </button>
        <span className="text-sm w-4 text-center">{item.quantity}</span>
        <button 
          onClick={() => onQuantityChange(item.id, 1)}
          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
        >
          +
        </button>
      </div>
    </div>
  </div>
);

export default OrderSummaryItem;