import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const BaseUrl = import.meta.env.VITE_API_URL;

export const fetchProduct = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch(`${BaseUrl}/api/products/`);
    const data = await res.json();
    return data;
  }
);

export const getWomenProduct = createAsyncThunk(
  "products/getWomen",
  async () => {
    const res = await fetch(`${BaseUrl}/api/products/women`);
    const data = await res.json();
    return data;
  }
);

export const getNewProduct = createAsyncThunk(
  "products/getKids",
  async () => {
    const res = await fetch(`${BaseUrl}/api/products/kids`);
    const data = await res.json();
    return data;
  }
);

// ✅ Added men's collection
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
      // fetch all
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

      // women products
      .addCase(getWomenProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWomenProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.women = action.payload;
      })
      .addCase(getWomenProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // kids products
      .addCase(getNewProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.kids = action.payload;
      })
      .addCase(getNewProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ✅ men products
      .addCase(getMansCollection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMansCollection.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.men = action.payload;
      })
      .addCase(getMansCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
