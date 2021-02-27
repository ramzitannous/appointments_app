import styled from 'styled-components/native';
import {ModeSelector} from '../components/ModeSelector';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';

import {AppColors} from '../styles';
import {PrimaryButton} from '../components/Button';
import {formatDate, parseDate} from '../utils';
import {setDate} from '../store/appointment';
import {useDispatch, useSelector} from 'react-redux';
import {ROUTES} from '../navigation/routes';
import {useNavigation} from '@react-navigation/core';
import {DATE_MODES} from '../utils/constants';
import {addAppointmentData} from '../utils/db_utils';

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const selectedDateTheme = {
  selectedDayBackgroundColor: AppColors.primary,
  selectedDayTextColor: AppColors.white,
  dotColor: AppColors.transparent,
  selectedDotColor: AppColors.transparent,
};

export const DateScreen = () => {
  const [selectedMode, setSelectedMode] = useState(DATE_MODES.specific);
  const [date1, setDate1] = useState(undefined);
  const [date2, setDate2] = useState(undefined);
  const [markedDates, setMarkedDates] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userId = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    if (!date1 || !date2) {
      setMarkedDates({});
      return;
    }
    let startDate = parseDate(date1);
    let endDate = parseDate(date2);
    if (startDate > endDate) {
      const temp = endDate.clone();
      endDate = startDate.clone();
      startDate = temp;
    }
    const allMarkedDates = [];
    // iterate dates to find days between
    let iterDate = startDate.clone();

    while (!iterDate.isSame(endDate)) {
      allMarkedDates.push(formatDate(iterDate));
      iterDate = startDate.add(1, 'day');
    }
    setMarkedDates(
      allMarkedDates.reduce((previousMarkedDates, date) => {
        previousMarkedDates[date] = {
          selected: true,
          marked: false,
          color: AppColors.primary,
        };
        return previousMarkedDates;
      }, {}),
    );
  }, [date2]);

  const onDayPress = (selectedDate) => {
    // todo some edge cases are not taken into account
    //specific date
    if (selectedMode === DATE_MODES.specific) {
      // only set date1 this specific date
      setDate1(selectedDate);
      setDate2(undefined);
    } else {
      // unselect case
      if (selectedDate === date1) {
        setDate1(undefined);
      } else if (selectedDate === date2) {
        setDate2(undefined);
      } else if (!date1) {
        // date 1 unselected set it
        setDate1(selectedDate);
      } else if (!date2 && date1) {
        // date 2 unselected set it
        setDate2(selectedDate);
      } else if (date1 && date2) {
        setDate2(selectedDate);
      }
    }
  };

  const onModeChanged = (mode) => {
    setSelectedMode(mode);
    // clear selections
    setDate1(null);
    setDate2(null);
    setMarkedDates([]);
  };

  const submitDate = () => {
    const date =
      selectedMode === DATE_MODES.specific
        ? date1 // all moment instances
        : {start: date1, end: date2};
    dispatch(setDate({mode: selectedMode, date}));
    // no need to wait
    addAppointmentData(userId, {
      dateMode: selectedMode,
      date,
    });
    navigation.navigate(ROUTES.HOME);
  };

  return (
    <Container>
      <ModeSelector
        selectedMode={selectedMode}
        modes={Object.values(DATE_MODES)}
        onModeChanged={onModeChanged}
      />
      <>
        <Calendar
          onDayPress={(date) => onDayPress(date.dateString)}
          theme={selectedDateTheme}
          markingType={selectedMode === DATE_MODES.range ? 'period' : 'dot'}
          markedDates={{
            [date1]: {
              selected: !!date1,
              marked: false,
              startingDay: selectedMode === DATE_MODES.range && !!date1,
              color: AppColors.primary,
            },
            ...markedDates,
            [date2]: {
              selected: !!date2,
              marked: false,
              endingDay: selectedMode === DATE_MODES.range && !!date2,
              color: AppColors.primary,
            },
          }}
        />
        <PrimaryButton
          onPress={submitDate}
          title={'Submit'}
          disabled={
            selectedMode === DATE_MODES.specific ? !date1 : !date1 || !date2
          }
        />
      </>
    </Container>
  );
};
