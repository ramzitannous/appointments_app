import styled from 'styled-components/native';
import {ModeSelector} from '../components/ModeSelector';
import React, {useState} from 'react';
import TimePicker from 'react-native-date-picker';
import moment from 'moment';
import {PrimaryButton} from '../components/Button';
import {TimeRange} from '../components/TimeRange';
import {useDispatch, useSelector} from 'react-redux';
import {setTime} from '../store/appointment';
import {formatTime} from '../utils';
import {useNavigation} from '@react-navigation/core';
import {ROUTES} from '../navigation/routes';
import {TIME_MODES} from '../utils/constants';
import {addAppointmentData} from '../utils/db_utils';

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const TimeScreen = () => {
  const [selectedMode, setSelectedMode] = useState(TIME_MODES.specific);
  const [selectedTime, setSelectedTime] = useState(moment().toDate());
  const [startTime, setStartTime] = useState(moment().toDate());
  const [endTime, setEndTime] = useState(moment().add(1, 'hour').toDate());
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userId = useSelector((state) => state.auth.user.id);

  const submitTime = () => {
    const time =
      selectedMode === TIME_MODES.specific
        ? {time: formatTime(selectedTime)}
        : {start: formatTime(startTime), end: formatTime(endTime)};
    dispatch(setTime({mode: selectedMode, time}));
    // no need to wait
    addAppointmentData(userId, {
      timeMode: selectedMode,
      time,
    });
    navigation.navigate(ROUTES.HOME);
  };

  return (
    <Container>
      <ModeSelector
        selectedMode={selectedMode}
        modes={Object.values(TIME_MODES)}
        onModeChanged={setSelectedMode}
      />
      {selectedMode === TIME_MODES.specific && (
        <TimePicker
          mode="time"
          date={selectedTime}
          onDateChange={setSelectedTime}
        />
      )}
      {selectedMode === TIME_MODES.range && (
        <TimeRange
          startTime={startTime}
          endTime={endTime}
          onStartTimeChanged={setStartTime}
          onEndTimeChanged={setEndTime}
        />
      )}
      <PrimaryButton
        onPress={submitTime}
        title={'Submit'}
        disabled={!selectedTime || !startTime || !endTime}
      />
    </Container>
  );
};
