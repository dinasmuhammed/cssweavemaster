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
  const [paymentMethod, setPaymentMethod] = useState('');
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

    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment(orderData);
    } else if (paymentMethod === 'upi') {
      handleUPIPayment(orderData);
    }
  };

  const handleRazorpayPayment = (orderData) => {
    const options = {
      key: "rzp_live_lhUJoR9PnyhX0q",
      amount: totalPrice * 100, // Razorpay expects amount in paise
      currency: "INR",
      name: "Henna by Fathima",
      description: `Order Payment: ${orderData.orderId}`,
      order_id: orderData.orderId,
      handler: function (response) {
        handlePaymentSuccess(response, orderData);
      },
      prefill: {
        name: formData.name,
        contact: formData.phoneNumber,
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleUPIPayment = (orderData) => {
    const upiId = "hennabyfathima@upi"; // Replace with your actual UPI ID
    const upiPaymentLink = createUPIPaymentLink(upiId, totalPrice, orderData.orderId, `Order for ${formData.name}`);

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

    // For demonstration purposes, we'll simulate a successful payment after 10 seconds
    setTimeout(() => {
      handlePaymentSuccess({ payment_id: `upi_${Date.now()}` }, orderData);
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
                <div className="space-y-4">
                  <Button 
                    onClick={() => { setPaymentMethod('razorpay'); handlePayment(); }}
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
                  <Button 
                    onClick={() => { setPaymentMethod('upi'); handlePayment(); }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 flex items-center justify-center space-x-2"
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
                        <span>Pay with UPI</span>
                      </>
                    )}
                  </Button>
                </div>
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
