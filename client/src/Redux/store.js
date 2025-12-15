import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import cartReducer from './cartSlice';  // <-- add this

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer, // <-- add cart slice
    }
});

export default store;
