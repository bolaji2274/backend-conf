import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import productReducer from './ProductSlice';
import storeReducer from './StoreSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    stores: storeReducer,
  },
});
