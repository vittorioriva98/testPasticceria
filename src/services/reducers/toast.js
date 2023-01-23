import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action) => {
      return action.payload;
    },
  },
});

export const { setToast } = toastSlice.actions;
export default toastSlice.reducer;
