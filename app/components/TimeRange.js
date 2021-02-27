/** Time Range Picker */
import styled from 'styled-components/native';
import React, {useState} from 'react';
import {AppColors, FontSizes} from '../styles';
import {formatTime} from '../utils';
import TimePicker from 'react-native-date-picker';
import moment from 'moment';
import {TIME_RANGE_MODE} from '../utils/constants';

const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 70%;
`;

const TimeLabel = styled.Text`
  font-size: ${FontSizes.title}px;
  font-weight: bold;
  color: ${({active}) => (active ? AppColors.primary : AppColors.grey)};
`;

export const TimeRange = ({
  startTime,
  endTime,
  onStartTimeChanged,
  onEndTimeChanged,
}) => {
  const [mode, setMode] = useState(TIME_RANGE_MODE.start);

  return (
    <>
      <LabelWrapper>
        <TimeLabel
          active={mode === TIME_RANGE_MODE.start}
          onPress={() => setMode(TIME_RANGE_MODE.start)}>
          {formatTime(startTime)}
        </TimeLabel>
        <TimeLabel>-</TimeLabel>
        <TimeLabel
          active={mode === TIME_RANGE_MODE.end}
          onPress={() => setMode(TIME_RANGE_MODE.end)}>
          {formatTime(endTime)}
        </TimeLabel>
      </LabelWrapper>

      <TimePicker
        mode="time"
        date={mode === TIME_RANGE_MODE.start ? startTime : endTime}
        minimumDate={
          // endTime, should start after startTime
          mode === TIME_RANGE_MODE.end
            ? moment(startTime).add(1, 'hour').toDate()
            : null
        }
        onDateChange={
          mode === TIME_RANGE_MODE.start ? onStartTimeChanged : onEndTimeChanged
        }
      />
    </>
  );
};
