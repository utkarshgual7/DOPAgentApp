import { configureStore } from "@reduxjs/toolkit";
import agentauthReducer from "./agentauthSlice.js";

const store = configureStore({
  reducer: {
    agentauth: agentauthReducer
  },
});

export default store;
