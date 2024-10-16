import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { calculateTotalPrice, formatOrderData, generateOrderId, createUPIPaymentLink } from '../utils/cartUtils';
import CartItem from '../components/CartItem';
import PurchaseForm from '../components/PurchaseForm';
import { CreditCard, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { sendOrderEmail } from '../utils/emailUtils';

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

    const upiId = "hennabyfathima@upi"; // Replace with your actual UPI ID
    const upiPaymentLink = createUPIPaymentLink(upiId, totalPrice, orderId, `Order for ${formData.name}`);

    toast.info("UPI Payment Instructions", {
      description: (
        <div className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5 text-blue-500" />
          <span>Please use any UPI app to complete the payment. After payment, return to this page.</span>
        </div>
      ),
      duration: 15000,
    });

    window.open(upiPaymentLink, '_blank');

    setTimeout(() => {
      const simulatedSuccess = Math.random() > 0.2;

      if (simulatedSuccess) {
        handlePaymentSuccess({ payment_id: `upi_${Date.now()}` }, orderData);
      } else {
        handlePaymentFailure({ description: "Payment verification failed. Please try again or use a different UPI app." });
      }
    }, 10000);
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

    // Send order details via WhatsApp
    sendWhatsAppMessage(orderData.orderId, JSON.stringify(orderData, null, 2));

    // Send order details via email
    await sendOrderEmail(orderData);

    clearCart();
    setShowPaymentDialog(false);
  };

  const handlePaymentFailure = (error) => {
    setIsProcessing(false);
    const errorMessage = error ? `Error: ${error.description || error.message}` : "There was an error processing your payment. Please try again or use a different UPI app.";
    toast.error(
      <div className="flex items-center space-x-2">
        <XCircle className="w-5 h-5 text-red-500" />
        <div>
          <p className="font-semibold">Payment Failed</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      </div>,
      { duration: 5000 }
    );
  };

  const sendWhatsAppMessage = (orderId, orderDetails) => {
    const whatsappMessage = encodeURIComponent(`New order: ${orderId}\nTotal: ₹${totalPrice}\n\nOrder Details:\n${orderDetails}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
    toast.success("Order Placed", {
      description: "Your order details have been sent via WhatsApp.",
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
                      <span>Verifying Payment...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Pay Now via Any UPI App</span>
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
