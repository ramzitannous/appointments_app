import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, {payload}) => {
      return payload;
    },
  },
});

export const {setUser} = authSlice.actions;

export const auth = authSlice.reducer;
