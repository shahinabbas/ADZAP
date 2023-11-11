import { createSlice } from "@reduxjs/toolkit";

export const userDetailsSlice = createSlice({
  name: "user_details",
  initialState: {
    name: null,
    profile_pic: null,
  },
  reducers: {
    set_user_details: (state, action) => {
      state.name = action.payload.name;
      state.profile_pic = action.payload.profile_pic;
    },
  },
});

export const { set_user_details } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
