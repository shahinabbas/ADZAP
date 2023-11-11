import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "authentication_user",
  initialState: {
    name: null,
    isAuthenticated: false,
    isAdmin: false,
  },
  reducers: {
    setAuthentication: (state = initialState, action) => {
      state.name = action.payload.name;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { setAuthentication } = authenticationSlice.actions;
export default authenticationSlice.reducer;
