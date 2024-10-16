import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { calculateTotalPrice, formatOrderData, generateOrderId } from '../utils/cartUtils';
import { generateBill } from '../utils/billUtils';
import CartItem from '../components/CartItem';
import PurchaseForm from '../components/PurchaseForm';

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

  const handlePayment = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const orderId = generateOrderId();
    const orderData = formatOrderData(formData, cartItems, totalPrice);

    const options = {
      key: "rzp_live_lhUJoR9PnyhX0q",
      amount: totalPrice * 100,
      currency: "INR",
      name: "Henna by Fathima",
      description: `Order: ${orderId}`,
      order_id: orderId,
      handler: function (response) {
        handlePaymentSuccess(response, orderData);
      },
      prefill: {
        name: formData.name,
        contact: formData.phoneNumber,
      },
      theme: {
        color: "#16a34a",
      },
      modal: {
        ondismiss: handlePaymentFailure
      }
    };

    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Razorpay error:", error);
      handlePaymentFailure();
    }
  };

  const handlePaymentSuccess = (response, orderData) => {
    setIsProcessing(false);
    toast.success("Payment Completed", {
      description: "Your payment has been processed successfully.",
    });

    const billContent = generateBill(orderData);
    sendWhatsAppMessage(orderData.orderId, billContent);

    clearCart();
    setShowPaymentDialog(false);
  };

  const handlePaymentFailure = () => {
    setIsProcessing(false);
    toast.error("Payment Failed", {
      description: "There was an error processing your payment. Please try again.",
    });
  };

  const sendWhatsAppMessage = (orderId, billContent) => {
    const whatsappMessage = encodeURIComponent(`New order: ${orderId}\nTotal: ₹${totalPrice}\n\nBill:\n${billContent}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    toast.success("Bill Sent", {
      description: "Your bill has been sent via WhatsApp.",
    });
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
                <Button className="w-full sm:w-auto">Proceed to Purchase</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Complete Your Purchase</DialogTitle>
                </DialogHeader>
                <PurchaseForm formData={formData} handleInputChange={handleInputChange} handlePurchase={handlePurchase} cartItems={cartItems} />
                <Button 
                  onClick={handlePayment} 
                  className="w-full bg-green-600 hover:bg-green-700 buy-now-btn mt-4"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Pay Now"}
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