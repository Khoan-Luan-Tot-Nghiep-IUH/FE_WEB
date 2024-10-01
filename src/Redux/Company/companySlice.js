import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companies: [],
  selectedCompany: null,
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    selectCompany: (state, action) => {
      state.selectedCompany = action.payload;
    },
    clearSelectedCompany: (state) => {
      state.selectedCompany = null;
    },
  },
  extraReducers: (builder) => {
  },
});

export const { selectCompany, clearSelectedCompany } = companySlice.actions;
export default companySlice.reducer;
