import { configureStore } from '@reduxjs/toolkit';
import { foodApi } from './Food/foodApi';
import cartReducer from './Cart/cartSlice'
import categoryReducer from './Food/filterFood'
import authReducer from './auth/authSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [foodApi.reducerPath]: foodApi.reducer,
    category: categoryReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(foodApi.middleware),
});
