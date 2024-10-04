// src/Redux/trip/tripSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trips: [],
    tripDetails: null,
    loading: false,
    success: false,
    error: null,
};

const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        setTrips(state, action) {
            state.trips = action.payload;
        },
        setTripDetails(state, action) {
            state.tripDetails = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setSuccess(state, action) {
            state.success = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearState(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
});

export const {
    setTrips,
    setTripDetails,
    setLoading,
    setSuccess,
    setError,
    clearState,
} = tripSlice.actions;

export default tripSlice.reducer;
