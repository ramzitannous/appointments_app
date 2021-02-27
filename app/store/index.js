import {configureStore} from '@reduxjs/toolkit';
import {auth} from './auth';
import {appointment} from './appointment';

export const store = configureStore({
  reducer: {
    auth,
    appointment,
  },
});
