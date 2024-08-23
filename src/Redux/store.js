import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlice';
import { apiSlice } from './User/apiSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
