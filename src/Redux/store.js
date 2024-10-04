import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlice';
import { apiSlice } from './User/apiSlice';

import { companyApiSlice } from './Company/companyApiSlice';
import companyReducer from './Company/companySlice';


import { tripApiSlice } from './Trip/TripApiSlice';
import tripReducer from './Trip/TripSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [companyApiSlice.reducerPath]: companyApiSlice.reducer,
    [tripApiSlice.reducerPath]: tripApiSlice.reducer, 
    trip: tripReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, companyApiSlice.middleware, tripApiSlice.middleware),  // Thêm `tripApiSlice.middleware`
});

export default store;
