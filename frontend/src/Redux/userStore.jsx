import { configureStore } from "@reduxjs/toolkit";
import authenticationSliceReducer from "./authentication/authenticationSlice";
import userDetailsSliceReducer from "./authentication/authenticationSlice";

export default configureStore({
  reducer: {
    authentication_user: authenticationSliceReducer,
    user_details: userDetailsSliceReducer,
  },
});
