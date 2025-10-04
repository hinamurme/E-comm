// components/PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { clearCart, createOrder } from "../../Redux/features/cart/CartSlice";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {};
  const { shippingInfo, items } = useSelector((state) => state.cart);
  
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    upiId: "",
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (!order && items.length === 0) {
      navigate("/checkout");
    }
  }, [order, items, navigate]);

  const handleCardInputChange = (e) => {
    let value = e.target.value;
    
    if (e.target.name === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      if (value.length > 19) value = value.substring(0, 19);
    }
    
    if (e.target.name === "expiryDate") {
      value = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
      if (value.length > 5) value = value.substring(0, 5);
    }
    
    if (e.target.name === "cvv") {
      value = value.replace(/\D/g, "");
      if (value.length > 3) value = value.substring(0, 3);
    }

    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: value,
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Calculate order totals
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingFee = subtotal > 1000 ? 0 : 50;
    const tax = subtotal * 0.18;
    const finalTotal = subtotal + shippingFee + tax;

    // Create order object
    const orderData = {
      items: items.map(item => ({
        ...item,
        total: item.price * item.quantity
      })),
      shippingInfo,
      paymentMethod: order?.paymentMethod || "card",
      subtotal,
      shippingFee,
      tax,
      total: finalTotal,
      status: 'confirmed',
    };

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Create order in Redux
      dispatch(createOrder(orderData));
      
      // Clear cart after successful payment
      dispatch(clearCart());
      
      // Redirect to success page
      setTimeout(() => {
        navigate("/order-success", { 
          state: { orderId: orderData.id } 
        });
      }, 2000);
    }, 3000);
  };
  
  const validatePayment = () => {
    if (order.paymentMethod === "card") {
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || 
          !paymentDetails.cvv || !paymentDetails.nameOnCard) {
        alert("Please fill in all card details");
        return false;
      }
    } else if (order.paymentMethod === "upi") {
      if (!paymentDetails.upiId || !paymentDetails.upiId.includes("@")) {
        alert("Please enter a valid UPI ID");
        return false;
      }
    }
    return true;
  };

  if (!order) {
    return (
      <div className="max-w-screen-xl py-20 mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-6">Payment</h2>
        <p>No order found. Please complete checkout first.</p>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="max-w-screen-xl py-20 mx-auto p-6 text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p>Redirecting to order confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl py-20 mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Payment</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Payment Details */}
        <div className="space-y-8">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span className="font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Items Total:</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{order.shippingFee === 0 ? "Free" : `₹${order.shippingFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>₹{order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total Amount:</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Specific Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              {order.paymentMethod === "card" ? "Card Details" : 
               order.paymentMethod === "upi" ? "UPI Payment" : "Cash on Delivery"}
            </h3>

            {order.paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handleCardInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentDetails.expiryDate}
                      onChange={handleCardInputChange}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentDetails.cvv}
                      onChange={handleCardInputChange}
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    name="nameOnCard"
                    value={paymentDetails.nameOnCard}
                    onChange={handleCardInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

            {order.paymentMethod === "upi" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  name="upiId"
                  value={paymentDetails.upiId}
                  onChange={handleCardInputChange}
                  placeholder="yourname@upi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            )}

            {order.paymentMethod === "cod" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <p className="text-yellow-800">
                  You will pay cash when your order is delivered.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Shipping Info and Payment Button */}
        <div className="space-y-6">
          {/* Shipping Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
            <div className="space-y-2">
              <p><strong>{shippingInfo.firstName} {shippingInfo.lastName}</strong></p>
              <p>{shippingInfo.address}</p>
              <p>{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.zipCode}</p>
              <p>{shippingInfo.country}</p>
              <p>📞 {shippingInfo.phone}</p>
              <p>✉️ {shippingInfo.email}</p>
            </div>
          </div>

          {/* Payment Button */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <button
              onClick={() => {
                if (validatePayment()) {
                  handlePayment();
                }
              }}
              disabled={isProcessing}
              className={`w-full py-3 rounded-md font-semibold transition ${
                isProcessing 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Payment...
                </div>
              ) : (
                `PAY ₹${order.total.toFixed(2)}`
              )}
            </button>
            
            {order.paymentMethod === "cod" && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                No payment required now. Pay when you receive your order.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;