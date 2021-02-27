/** button with styling instead of RN Button,
 *default button isn't well usable with styled components
 * */
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {AppColors, FontSizes} from '../styles';
import styled from 'styled-components/native';

const defaultTitleStyle = {
  fontSize: FontSizes.title,
  color: AppColors.white,
};

const TextWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;

const disabledStyle = {
  backgroundColor: AppColors.grey,
};

export const AppButton = ({title, titleStyle, style, disabled, ...props}) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={disabled ? StyleSheet.flatten([style, disabledStyle]) : style}>
      <TextWrapper>
        <Text style={titleStyle || defaultTitleStyle}>{title}</Text>
      </TextWrapper>
    </TouchableOpacity>
  );
};

export const PrimaryButton = styled(AppButton)`
  width: 80%;
  background-color: ${AppColors.black};
  font-size: ${FontSizes.normal}px;
  height: 44px;
`;

export const ButtonWithTransparentBackground = styled(AppButton)`
  background-color: ${AppColors.transparent};
  font-size: ${FontSizes.normal}px;
  height: 44px;
`;

export const SecondaryButton = (props) => (
  <ButtonWithTransparentBackground
    {...props}
    titleStyle={{color: AppColors.primary}}
  />
);

export const _RoundedButton = styled(AppButton)`
  background-color: ${AppColors.white};
  height: 44px;
  padding: 20px;
  border-radius: 24px;
`;
export const RoundedButton = (props) => (
  <_RoundedButton {...props} titleStyle={{color: AppColors.primary}} />
);
