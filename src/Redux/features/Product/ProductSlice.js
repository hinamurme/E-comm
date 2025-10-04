import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const BaseUrl = import.meta.env.VITE_API_URL;

// Fetch all products
export const fetchProduct = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch(`${BaseUrl}/api/products`);
    const data = await res.json();
    return data;
  }
);

// Women
export const getWomenProduct = createAsyncThunk(
  "products/getWomen",
  async () => {
    const res = await fetch(`${BaseUrl}/api/products/women`);
    const data = await res.json();
    return data;
  }
);

// Kids
export const getNewProduct = createAsyncThunk("products/getKids", async () => {
  const res = await fetch(`${BaseUrl}/api/products/kids`);
  const data = await res.json();
  return data;
});

// Men
export const getMansCollection = createAsyncThunk(
  "products/getMen",
  async () => {
    const res = await fetch(`${BaseUrl}/api/products/men`);
    const data = await res.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    women: [],
    kids: [],
    men: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // all products
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // women
      .addCase(getWomenProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.women = action.payload;
      })

      // kids
      .addCase(getNewProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.kids = action.payload;
      })

      // men
      .addCase(getMansCollection.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.men = action.payload;
      });
  },
});

export default productsSlice.reducer;
