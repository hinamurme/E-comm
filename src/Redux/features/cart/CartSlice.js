// Redux/features/cart/CartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
const savedShippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

const initialState = {
  items: savedCart,
  shippingInfo: savedShippingInfo,
  orders: savedOrders, // Store all orders
  currentOrder: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, size, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => 
        item.id === id && item.size === size
      );
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...action.payload, quantity });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const item = state.items.find(item => 
        item.id === id && (!size || item.size === size)
      );
      if (item) item.quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(item => 
        !(item.id === id && (!size || item.size === size))
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
    
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
    },
    
    // New order-related actions
    createOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
        trackingNumber: `TRK${Date.now()}${Math.random().toString(36).substr(2, 6)}`.toUpperCase(),
      };
      
      state.orders.unshift(newOrder); // Add to beginning of array
      state.currentOrder = newOrder;
      
      // Save to localStorage
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      if (order) {
        order.status = status;
        order.updatedAt = new Date().toISOString();
        localStorage.setItem("orders", JSON.stringify(state.orders));
      }
    },
    
    cancelOrder: (state, action) => {
      const orderId = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      if (order) {
        order.status = 'cancelled';
        order.cancelledAt = new Date().toISOString();
        localStorage.setItem("orders", JSON.stringify(state.orders));
      }
    },
    
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const { 
  addToCart, 
  updateQuantity, 
  clearCart, 
  removeFromCart, 
  saveShippingInfo,
  createOrder,
  updateOrderStatus,
  cancelOrder,
  clearCurrentOrder
} = CartSlice.actions;
export default CartSlice.reducer;