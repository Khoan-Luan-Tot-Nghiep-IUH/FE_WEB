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
      state.userInfo = {
        ...state.userInfo, 
        ...action.payload,
        token: action.payload.token || state.userInfo.token,  
      };
      localStorage.setItem('user', JSON.stringify(state.userInfo));
    },
    logout: (state) => {
      console.log('Đã gọi logout');
      state.userInfo = null;
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    // Action để xóa lỗi
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
