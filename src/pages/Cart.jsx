import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { calculateTotalPrice, formatOrderData, generateOrderId } from '../utils/cartUtils';
import { generateBill } from '../utils/billUtils';
import CartItem from '../components/CartItem';
import PurchaseForm from '../components/PurchaseForm';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, saveForLater, savedItems, moveToCart } = useCart();
  const [formData, setFormData] = useState({ name: '', phoneNumber: '', address: '', state: '', district: '' });
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const whatsappNumber = '919656778058';

  const totalPrice = calculateTotalPrice(cartItems);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    setShowPaymentDialog(true);
  };

  const handlePayment = async () => {
    const orderId = generateOrderId();
    const orderData = formatOrderData(formData, cartItems, totalPrice);

    const options = {
      key: "rzp_live_lhUJoR9PnyhX0q", // Updated with the provided live key ID
      amount: totalPrice * 100, // Amount in paise
      currency: "INR",
      name: "Henna by Fathima",
      description: `Order: ${orderId}`,
      order_id: orderId,
      handler: function (response) {
        setPaymentComplete(true);
        toast({
          title: "Payment Completed",
          description: "Your payment has been processed successfully.",
        });

        const billContent = generateBill(orderData);

        const whatsappMessage = encodeURIComponent(`New order: ${orderId}\nTotal: ₹${totalPrice}\n\nBill:\n${billContent}`);
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

        toast({
          title: "Bill Sent",
          description: "Your bill has been sent via WhatsApp.",
        });
      },
      prefill: {
        name: formData.name,
        contact: formData.phoneNumber,
      },
      theme: {
        color: "#16a34a",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6">Your Cart</h1>
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
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Total: ₹{totalPrice}</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">Proceed to Purchase</Button>
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
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Saved for Later</h2>
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
            <DialogTitle>Razorpay Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-xl sm:text-2xl font-bold">₹{totalPrice}</p>
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