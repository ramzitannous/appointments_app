import styled from 'styled-components/native';
import React from 'react';
import {AppColors, FontSizes} from '../styles';
import {RoundedButton} from '../components/Button';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {ROUTES} from '../navigation/routes';
import {useSelector} from 'react-redux';
import {DATE_MODES, TIME_MODES} from '../utils/constants';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${AppColors.primary};
`;

const WhiteText = styled.Text`
  color: ${AppColors.white};
  font-size: ${FontSizes.title}px;
  text-align: center;
  padding: 12px;
`;

const ButtonWrapper = styled.View`
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`;

export const HomeScreen = () => {
  const navigation = useNavigation();
  const {dateMode, timeMode, time, date} = useSelector((state) => ({
    dateMode: state.appointment.dateMode,
    timeMode: state.appointment.timeMode,
    time: state.appointment.time,
    date: state.appointment.date,
  }));

  const renderTime = () => {
    if (timeMode === TIME_MODES.specific) {
      return `Time: ${time}`;
    } else if (timeMode === TIME_MODES.range) {
      return `Time Range: ${time.start} - ${time.end}`;
    }
  };

  const renderDate = () => {
    if (dateMode === DATE_MODES.specific) {
      return `Date: ${date}`;
    } else if (dateMode === DATE_MODES.range) {
      return `Date Range: ${date.start} - ${date.end}`;
    }
  };

  return (
    <Container>
      <WhiteText lineBreakMode={'middle'} numberOfLines={2}>
        {"I'd like to book a meeting with the business development at on/..."}
      </WhiteText>
      <View>
        <WhiteText>{renderDate()}</WhiteText>
        <WhiteText>{renderTime()}</WhiteText>
      </View>
      <ButtonWrapper>
        <RoundedButton
          title={'Date'}
          onPress={() => navigation.navigate(ROUTES.DATE)}
        />
        <RoundedButton
          title={'Time'}
          onPress={() => navigation.navigate(ROUTES.TIME)}
        />
      </ButtonWrapper>
    </Container>
  );
};
