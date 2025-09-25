import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage or initialize
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  items: savedCart,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...action.payload, quantity });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) item.quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearcart:(state)=>{
      state.items=[];
      localStorage.setItem("cart",JSON.stringify([]));
    },
  },
});

export const { addToCart, updateQuantity, clearcart,removeFromCart } = CartSlice.actions;
export default CartSlice.reducer;
