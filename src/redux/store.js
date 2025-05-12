import { configureStore } from "@reduxjs/toolkit";
import { orderBookReducer } from "./orderBook/slice";

export const store = configureStore({
  reducer: {
    orderBook: orderBookReducer,
  },

  //devTools: import.meta.env.MODE === 'development'
});
