import { configureStore } from '@reduxjs/toolkit';
import { foodApi } from './Food/foodApi';
import cartReducer from './Cart/cartSlice';
import categoryReducer from './Food/filterFood';
import authReducer from './auth/authSlice';
import searchReducer from './SearchItem/SearchItem';
import { ordersApi } from './orders/ordersApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [foodApi.reducerPath]: foodApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    category: categoryReducer,
    search: searchReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(foodApi.middleware, ordersApi.middleware),
});
