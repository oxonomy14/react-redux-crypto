import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderBook } from "./operations";

const initialState = {
  bids: [],
  asks: [],
  history: [], // ⬅️ додаємо масив історії
  loading: false,
  error: null,
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

        // Обрахунок загального обсягу заявок
        const totalBids = action.payload.bids
          .slice(0, 20)
          .reduce((sum, [price, qty]) => sum + parseFloat(qty), 0);
        const totalAsks = action.payload.asks
          .slice(0, 20)
          .reduce((sum, [price, qty]) => sum + parseFloat(qty), 0);

        const newEntry = {
          timestamp: Date.now(),
          totalBids,
          totalAsks,
        };

        // Оновлюємо історію (максимум 20 записів)
        state.history.push(newEntry);
        if (state.history.length > 20) {
          state.history.shift();
        }
      })
      .addCase(fetchOrderBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const orderBookReducer = slice.reducer;
