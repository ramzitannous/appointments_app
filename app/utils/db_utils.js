/** Contains anything related to firebase db*/

import database from '@react-native-firebase/database';
import {APPOINTMENTS} from './constants';

export const addAppointmentData = async (userId, data) => {
  try {
    const res = await database().ref(`/${APPOINTMENTS}/${userId}`).update(data);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
};
