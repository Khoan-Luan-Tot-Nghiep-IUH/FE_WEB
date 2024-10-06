import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedLocation: null, 
  filters: {
    search: '',
    type: 'departure',
  },
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setSelectedLocation(state, action) {
      state.selectedLocation = action.payload;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setSelectedLocation, setFilters } = locationSlice.actions;

export default locationSlice.reducer;
