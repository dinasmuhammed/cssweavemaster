import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePurchase = () => {
    // Implement purchase logic here
    alert('Thank you for your purchase!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price * item.quantity}</p>
                  </div>
                </div>
                <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Total: ₹{totalPrice}</h2>
            <Button onClick={handlePurchase} className="w-full md:w-auto">
              Proceed to Purchase
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;