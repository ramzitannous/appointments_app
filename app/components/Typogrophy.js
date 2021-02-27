import styled from 'styled-components/native';
import {AppColors, FontSizes} from '../styles';

/** Reusable Text Components with appropriate styling */

export const Title = styled.Text`
  font-size: ${FontSizes.title}px;
  color: ${AppColors.black};
`;

export const Normal = styled.Text`
  font-size: ${FontSizes.normal}px;
  color: ${AppColors.black};
`;

export const Error = styled.Text`
  font-size: ${FontSizes.normal}px;
  color: ${AppColors.red};
  padding: 12px;
  text-align: center;
`;

export const Success = styled.Text`
  font-size: ${FontSizes.normal}px;
  color: ${AppColors.green};
  padding: 6px;
`;
