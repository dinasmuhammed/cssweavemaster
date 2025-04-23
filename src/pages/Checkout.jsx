
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from "sonner";
import OrderSummary from '../components/checkout/OrderSummary';
import DeliveryForm from '../components/checkout/DeliveryForm';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingBag } from 'lucide-react';
import { initializePayment } from '../services/paymentService';
import { supabase } from '../utils/supabaseClient';

const Checkout = () => {
  const { cartItems, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: ''
  });
  const [userId, setUserId] = useState(null);

  // Calculate total price from cart items
  const totalPrice = cartItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  
  useEffect(() => {
    // Check if cart is empty on component mount
    if (!cartItems?.length) {
      toast.info("Your cart is empty");
    }
    
    // Try to get current user
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user && !error) {
        setUserId(user.id);
        
        // If user exists, try to pre-fill form with their data
        const { data } = await supabase
          .from('user_profiles')
          .select('name, email, mobile, address')
          .eq('user_id', user.id)
          .single();
          
        if (data) {
          setFormData({
            name: data.name || '',
            email: data.email || user.email || '',
            mobile: data.mobile || '',
            address: data.address || ''
          });
        } else if (user.email) {
          setFormData(prev => ({ ...prev, email: user.email }));
        }
      }
    };
    
    fetchUser().catch(console.error);
  }, [cartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems?.find(item => item.id === itemId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(itemId, newQuantity);
    }
  };

  // Calculate shipping charges based on the items in cart
  const calculateShippingCharge = () => {
    if (!cartItems?.length) return 0;
    
    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    
    if (totalItems === 0) return 0;
    if (totalItems === 1) return 35;
    if (totalItems === 2) return 36;
    
    // For 3 or more items, increase by ₹15 per additional item
    const baseCharge = 36; // Base charge for 2 items
    const additionalItems = totalItems - 2;
    const additionalCharge = additionalItems * 15;
    
    return baseCharge + additionalCharge;
  };

  const shippingCharge = calculateShippingCharge();
  const totalAmount = totalPrice + shippingCharge;

  const handlePaymentSuccess = async (response) => {
    try {
      // Save order details to Supabase
      const { error } = await supabase.from('orders').insert([{
        user_id: userId,
        order_id: response.orderId,
        payment_id: response.paymentId,
        items: cartItems,
        total_amount: totalAmount,
        shipping_charge: shippingCharge,
        shipping_address: formData.address,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_mobile: formData.mobile,
        status: response.verified ? 'completed' : 'pending_verification'
      }]);
      
      if (error) {
        console.error('Error saving order details:', error);
        toast.error("Order saved but details storage failed");
      }
      
      toast.success("Payment successful! Thank you for your order.");
      clearCart();
      navigate('/order-confirmation', { state: { orderId: response.orderId } });
    } catch (error) {
      console.error('Error processing successful payment:', error);
      toast.success("Payment completed, but order processing had an issue.");
      clearCart();
      navigate('/');
    }
  };

  const handlePaymentError = (error) => {
    toast.error(`Payment failed: ${error.message || "Please try again"}`);
    setIsProcessing(false);
  };

  const handleProceedToPayment = async () => {
    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.mobile || !formData.address) {
        toast.error("Please fill all the required fields");
        return;
      }
      
      if (!cartItems?.length) {
        toast.error("Your cart is empty");
        return;
      }
      
      setIsProcessing(true);
      
      // Format cart items for order
      const items = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));
      
      // Create order object
      const orderData = {
        amount: totalAmount,
        items,
        description: `Order from ${formData.name}`,
      };
      
      const customerDetails = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        userId: userId
      };
      
      // Save customer details if user is logged in
      if (userId) {
        await supabase.from('user_profiles').upsert({
          user_id: userId,
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          address: formData.address,
          updated_at: new Date().toISOString()
        });
      }
      
      // Initialize payment
      const paymentResult = await initializePayment(orderData, customerDetails);
      handlePaymentSuccess(paymentResult);
    } catch (error) {
      handlePaymentError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cartItems?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-1 text-sm text-gray-500">
            Start adding some items to your cart and they will appear here
          </p>
          <div className="mt-6">
            <Button 
              onClick={() => navigate('/shop')}
              className="bg-green-800 hover:bg-green-700 text-white"
            >
              Browse Shop
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <OrderSummary 
            cartItems={cartItems}
            onQuantityChange={handleQuantityChange}
            totalPrice={totalPrice}
            shippingCharge={shippingCharge}
          />
          
          <Button 
            onClick={handleProceedToPayment}
            disabled={isProcessing}
            className="w-full mt-6 bg-[#607973] hover:bg-[#4c615c] text-white"
          >
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <DeliveryForm 
            formData={formData}
            onChange={handleInputChange}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
