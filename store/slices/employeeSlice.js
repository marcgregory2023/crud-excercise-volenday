import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: {}, status: {} };

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    getEmployee: (state, action) => {
      state.data = action.payload;
    },
    getStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { getEmployee, getStatus } = employeeSlice.actions;
export default employeeSlice.reducer;
