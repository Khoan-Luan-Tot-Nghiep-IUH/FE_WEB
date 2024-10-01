import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlice';
import { apiSlice } from './User/apiSlice';
import { companyApiSlice } from './Company/companyApiSlice';
import companyReducer  from "./Company/companySlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [companyApiSlice.reducerPath]: companyApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware ,companyApiSlice.middleware),
});

export default store;
