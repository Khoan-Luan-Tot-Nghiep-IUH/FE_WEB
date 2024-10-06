import { createSlice } from '@reduxjs/toolkit';

const busTypeSlice = createSlice({
  name: 'busType',
  initialState: {
    busTypes: [], 
    currentBusType: null, 
    loading: false,
    error: null,
  },
  reducers: {
    setBusTypes(state, action) {
      state.busTypes = action.payload;
    },
    setCurrentBusType(state, action) {
      state.currentBusType = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setBusTypes, setCurrentBusType, setLoading, setError } = busTypeSlice.actions;

export default busTypeSlice.reducer;
