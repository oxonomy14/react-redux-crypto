import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrderBook = createAsyncThunk(
  "orderBook/fetchOrderBook",
  async (symbol = "ATOMUSDT", thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=10`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
