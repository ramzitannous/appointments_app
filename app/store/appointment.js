import {createSlice} from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    time: null,
    timeMode: null, // specific or range
    date: null,
    dateMode: null,
  },
  reducers: {
    setTime: (state, {payload}) => {
      state.timeMode = payload.mode;
      state.time = payload.time;
    },
    setDate: (state, {payload}) => {
      state.dateMode = payload.mode;
      state.date = payload.date;
    },
  },
});

export const {setTime, setDate} = appointmentSlice.actions;

export const appointment = appointmentSlice.reducer;
