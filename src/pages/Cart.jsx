import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { calculateTotalPrice } from '../utils/cartUtils';
import CartItem from '../components/CartItem';
import PurchaseForm from '../components/PurchaseForm';
import { CreditCard, CheckCircle2, Loader2 } from 'lucide-react';
import { sendOrderEmail } from '../utils/emailUtils';
import { initializePayment } from '../utils/paymentUtils';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, saveForLater, savedItems, moveToCart, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: '', phoneNumber: '', address: '', state: '', district: '' });
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const whatsappNumber = '919656778058';

  const totalPrice = calculateTotalPrice(cartItems);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowPaymentDialog(true);
    }
  };

  const validateForm = () => {
    const { name, phoneNumber, address, state, district } = formData;
    if (!name || !phoneNumber || !address || !state || !district) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    initializePayment(formData, cartItems, totalPrice, handlePaymentSuccess, handlePaymentError);
  };

  const handlePaymentSuccess = async (response, orderData) => {
    setIsProcessing(false);
    toast.success(
      <div className="flex items-center space-x-2">
        <CheckCircle2 className="w-5 h-5 text-green-500" />
        <div>
          <p className="font-semibold">Payment Completed</p>
          <p className="text-sm">Amount: ₹{totalPrice}</p>
          <p className="text-sm">Order ID: {orderData.orderId}</p>
        </div>
      </div>,
      { duration: 5000 }
    );

    try {
      await sendWhatsAppMessage(orderData.orderId, JSON.stringify(orderData, null, 2));
      await sendOrderEmail(orderData);
      clearCart();
      setShowPaymentDialog(false);
    } catch (error) {
      console.error('Error in post-payment processing:', error);
      toast.error('There was an issue processing your order. Please contact support.');
    }
  };

  const handlePaymentError = (error) => {
    setIsProcessing(false);
    console.error('Payment error:', error);
    toast.error('Payment failed. Please try again or contact support.');
  };

  const sendWhatsAppMessage = (orderId, orderDetails) => {
    const whatsappMessage = encodeURIComponent(`New order: ${orderId}\nTotal: ₹${totalPrice}\n\nOrder Details:\n${orderDetails}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  if (cartItems.length === 0 && savedItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6">Your Cart is Empty</h1>
        <p>You have no items in your cart. Start shopping to add items!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6">Your Cart</h1>
      {cartItems.length > 0 && (
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
            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">Proceed to Purchase</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <span>Complete Your Purchase</span>
                  </DialogTitle>
                </DialogHeader>
                <PurchaseForm formData={formData} handleInputChange={handleInputChange} handlePurchase={handlePurchase} cartItems={cartItems} />
                <Button 
                  onClick={handlePayment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 flex items-center justify-center space-x-2"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Pay with Razorpay</span>
                    </>
                  )}
                </Button>
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
    </div>
  );
};

export default Cart;
