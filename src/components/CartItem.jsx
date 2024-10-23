import React from 'react';

const CartItem = ({ item, removeFromCart, updateQuantity }) => (
  <div className="flex items-start gap-6 py-6">
    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
    <div className="flex-grow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
          {item?.weight && <span className="text-gray-500">{item.weight}g</span>}
        </div>
        <span className="text-lg">₹{item.price * item.quantity}</span>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <button 
          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
          className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-full text-gray-600 hover:bg-gray-50"
        >
          -
        </button>
        <span className="text-lg w-6 text-center">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-full text-gray-600 hover:bg-gray-50"
        >
          +
        </button>
      </div>
    </div>
  </div>
);

export default CartItem;