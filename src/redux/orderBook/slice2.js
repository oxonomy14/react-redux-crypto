import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderBook } from "./operations";

const initialState = {
  bids: [],
  asks: [],
  loading: false,
  error: null,
  history: [], //  додаємо масив історії
};

const slice = createSlice({
  name: "orderBook",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderBook.fulfilled, (state, action) => {
        state.loading = false;
        state.bids = action.payload.bids;
        state.asks = action.payload.asks;
      })
      .addCase(fetchOrderBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const orderBookReducer = slice.reducer;
