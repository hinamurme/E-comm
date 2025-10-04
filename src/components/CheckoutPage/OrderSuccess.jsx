// components/OrderSuccess.jsx (updated)
import React from "react";
import { Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, total } = location.state || {};

  return (
    <div className="max-w-screen-xl py-20 mx-auto p-6 text-center">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-lg text-gray-600 mb-2">
          Thank you for your purchase!
        </p>
        
        {orderId && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="text-gray-700 mb-2">
              <strong>Order ID:</strong> {orderId}
            </p>
            {total && (
              <p className="text-gray-700">
                <strong>Total Amount:</strong> ₹{total?.toFixed(2)}
              </p>
            )}
          </div>
        )}

        <p className="text-gray-600 mb-8">
          Your order has been confirmed and will be shipped soon. 
          You will receive an email confirmation shortly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/shop"
            className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-300 transition"
          >
            View My Orders
          </Link>
          
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
          <p className="text-blue-800 text-sm">
            • You'll receive an order confirmation email<br/>
            • We'll notify you when your order ships<br/>
            • Expected delivery: 3-5 business days
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;