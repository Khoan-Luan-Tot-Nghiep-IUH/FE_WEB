import { configureStore } from '@reduxjs/toolkit';
import userReducer from './User/userSlice';
import { apiSlice } from './User/apiSlice';

import { companyApiSlice } from './Company/companyApiSlice';
import companyReducer from './Company/companySlice';

import { tripApiSlice } from './Trip/TripApiSlice';
import tripReducer from './Trip/TripSlice';

import { locationApiSlice } from './Location/locationApiSlice';
import locationReducer from './Location/locationSlice';


import { busTypeApiSlice } from './Bustype/BusTypeApiSlice'; 
import busTypeReducer from './Bustype/BusTypeSlice';

import { bookingApiSlice } from './Booking/bookingApiSlice';
import { revenueApi } from './Revenue/revenueApiSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    trip: tripReducer,
    location: locationReducer,
    busType: busTypeReducer, 
    [apiSlice.reducerPath]: apiSlice.reducer,
    [companyApiSlice.reducerPath]: companyApiSlice.reducer,
    [tripApiSlice.reducerPath]: tripApiSlice.reducer,
    [locationApiSlice.reducerPath]: locationApiSlice.reducer,
    [busTypeApiSlice.reducerPath]: busTypeApiSlice.reducer, 
    [bookingApiSlice.reducerPath]: bookingApiSlice.reducer,
    [revenueApi.reducerPath]: revenueApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      companyApiSlice.middleware,
      tripApiSlice.middleware,
      locationApiSlice.middleware,
      busTypeApiSlice.middleware,
      bookingApiSlice.middleware,
      revenueApi.middleware,
    ),
});

export default store;
