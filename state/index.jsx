import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { endpointReducer } from "./endpointSlice";

export const store = configureStore({
  reducer: {
    endpoint: endpointReducer,
    auth: authReducer,
  },


});
