import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterValue: "",
};

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filterValue = action.payload;
    },
  },
});

export const filtersReducer = slice.reducer;

export const { changeFilter } = slice.actions;
