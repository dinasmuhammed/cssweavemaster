import React from 'react';

const OrderSummaryItem = ({ item, onQuantityChange }) => (
  <div className="flex items-center gap-4 py-2">
    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
    <div className="flex-grow">
      <h3 className="text-sm font-medium">{item.name} {item?.weight && <span className="text-gray-500">{item.weight}</span>}</h3>
      <div className="flex items-center gap-3 mt-2">
        <button 
          onClick={() => onQuantityChange(item.id, -1)}
          className="px-2 border rounded hover:bg-gray-100"
        >
          -
        </button>
        <span className="text-sm">{item.quantity}</span>
        <button 
          onClick={() => onQuantityChange(item.id, 1)}
          className="px-2 border rounded hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
    <p className="font-medium">₹{item.price * item.quantity}</p>
  </div>
);

export default OrderSummaryItem;