/** Mode Selector */
import styled from 'styled-components/native';
import React from 'react';
import {SecondaryButton} from './Button';
import {AppColors} from '../styles';

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 70%;
`;

const selectedStyle = {
  borderBottomWidth: 1,
  borderBottomColor: AppColors.primary,
};

export const ModeSelector = ({modes, onModeChanged, selectedMode, style}) => {
  return (
    <Wrapper style={style}>
      {modes.map((mode) => (
        <SecondaryButton
          title={mode}
          key={mode}
          style={selectedMode === mode ? selectedStyle : undefined}
          onPress={() => onModeChanged(mode)}
        />
      ))}
    </Wrapper>
  );
};
