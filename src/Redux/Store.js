import { configureStore} from "@reduxjs/toolkit";
import productReducer from "./features/Product/ProductSlice.js"; 
import cartReducer from "../Redux/features/cart/CartSlice.js";
export const store=configureStore({
    reducer:{
       products: productReducer,
       cart:cartReducer
    },
});