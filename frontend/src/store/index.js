import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import productReducer from './ProductSlice';
import storeReducer from './StoreSlice'
import notificationsReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    stores: storeReducer,
    notifications: notificationsReducer, 
    // Add notifications to the store
  },
});
