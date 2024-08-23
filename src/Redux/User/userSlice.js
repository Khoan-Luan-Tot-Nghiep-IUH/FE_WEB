import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser === null) {
      return null;
    }
    return JSON.parse(serializedUser);
  } catch (err) {
    return null;
  }
};

const initialState = {
  userInfo: loadUserFromStorage(),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
