import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { calculateTotalPrice, formatOrderData, generateOrderId, createUPIPaymentLink } from '../utils/cartUtils';
import CartItem from '../components/CartItem';
import PurchaseForm from '../components/PurchaseForm';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, saveForLater, savedItems, moveToCart } = useCart();
  const [formData, setFormData] = useState({ name: '', phoneNumber: '', address: '', state: '', district: '' });
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const totalPrice = calculateTotalPrice(cartItems);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    setShowPaymentDialog(true);
  };

  const handlePayment = () => {
    const orderId = generateOrderId();
    const orderData = formatOrderData(formData, cartItems, totalPrice);
    
    const detailedNotes = `Order: ${orderId}, Name: ${formData.name}, Phone: ${formData.phoneNumber}, Address: ${formData.address}, State: ${formData.state}, District: ${formData.district}, Products: ${cartItems.map(item => `${item.name} (x${item.quantity})`).join(', ')}`;
    
    const upiLink = createUPIPaymentLink('shamfathi.k-2@oksbi', totalPrice, orderId, detailedNotes);
    
    const sheetData = {
      timestamp: new Date().toISOString(),
      orderId: orderId,
      customerName: formData.name,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      state: formData.state,
      district: formData.district,
      items: cartItems.map(item => `${item.name} (x${item.quantity})`).join(', '),
      totalPrice: totalPrice
    };

    console.log('Data to be sent to Google Sheets:', sheetData);

    window.location.href = upiLink;
    toast({
      title: "Payment Initiated",
      description: "You will be redirected to complete the UPI payment.",
    });
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
              <CartItem 
                key={item.id} 
                item={item} 
                removeFromCart={removeFromCart} 
                updateQuantity={updateQuantity} 
                saveForLater={saveForLater} 
              />
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Total: ₹{totalPrice}</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto">Proceed to Purchase</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Complete Your Purchase</DialogTitle>
                </DialogHeader>
                <PurchaseForm formData={formData} handleInputChange={handleInputChange} handlePurchase={handlePurchase} cartItems={cartItems} />
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
      
      {savedItems.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Saved for Later</h2>
          <div className="space-y-4">
            {savedItems.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                isSaved={true} 
                moveToCart={moveToCart} 
                removeFromCart={removeFromCart} 
              />
            ))}
          </div>
        </div>
      )}
      
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>UPI Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold">₹{totalPrice}</p>
              <p className="text-sm text-gray-600">Total Amount</p>
            </div>
            <Button onClick={handlePayment} className="w-full bg-green-600 hover:bg-green-700 buy-now-btn">
              Pay Now
            </Button>
            <p className="text-xs text-center text-gray-500">
              By clicking "Pay Now", you agree to our Terms and Conditions.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;