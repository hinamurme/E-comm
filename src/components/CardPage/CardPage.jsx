import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
} from "../../Redux/features/cart/CartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const BaseUrl = import.meta.env.VITE_API_URL;
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const finalTotal = subtotal - discount;

  useEffect(() => {
    console.log("Cart items:", cartItems);
  }, [cartItems]);

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(50);
    } else {
      setDiscount(0);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-screen-xl py-20 mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Cart</h2>
        <p className="text-center text-lg text-gray-500">
          🛒 Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl py-20 mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Cart</h2>

      {/* 🖥️ Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse mb-10">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-3 px-4">Product</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-3 px-4">
                  <img
                    src={`${BaseUrl}${item.image}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{item.name}</td>
                <td>₹{item.price}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Math.max(1, item.quantity - 1),
                          })
                        )
                      }
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>₹{item.price * item.quantity}</td>
                <td>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🖥️ Cart Totals & Promo - Desktop Only */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-gray-100 p-6 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Cart Totals</h3>
          <div className="flex justify-between py-2 border-b">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>Shipping Fee</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between py-4 text-lg font-bold">
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-md shadow-sm">
          <label
            htmlFor="promo"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            If you have a promo code, enter it here
          </label>
          <div className="flex">
            <input
              type="text"
              id="promo"
              placeholder="promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              onClick={handleApplyPromo}
              className="bg-red-600 text-white px-6 rounded-r-md hover:bg-red-800 transition"
            >
              Submit
            </button>
          </div>
          {discount > 0 && (
            <p className="text-green-600 mt-2">
              Promo applied! ₹{discount} off
            </p>
          )}
        </div>
      </div>

      {/* 📱 Mobile Layout */}
      <div className="md:hidden space-y-4 mt-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col border p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={`${BaseUrl}${item.image}`}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              {console.log(`${BaseUrl}-------------${item.image}`)}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: Math.max(1, item.quantity - 1),
                        })
                      )
                    }
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 📱 Mobile Totals & Promo */}
        <div className="space-y-6 mt-6">
          <div className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Cart Totals</h3>
            <div className="flex justify-between py-2 border-b">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Shipping Fee</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between py-4 text-base font-bold">
              <span>Total</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-md shadow-sm">
            <label
              htmlFor="promo-mobile"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              If you have a promo code, enter it here
            </label>
            <div className="flex">
              <input
                type="text"
                id="promo-mobile"
                placeholder="promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-4 py-2  w-[20px] border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button
                onClick={handleApplyPromo}
                className="bg-red-600 text-white px-6 rounded-r-md hover:bg-red-800 transition"
              >
                Submit
              </button>
            </div>
            {discount > 0 && (
              <p className="text-green-600 mt-2">
                Promo applied! ₹{discount} off
              </p>
            )}
          </div>
        </div>

        {/* 📱 Mobile Fixed Checkout Bar */}
        <div className="mt-8 text-center">
          <Link
            to="/checkout"
            className="bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition inline-block"
          >
            PROCEED TO CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
