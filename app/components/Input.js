import styled from 'styled-components/native';
import {AppColors} from '../styles';

/** Reusable Input Component with default styling */

export const Input = styled.TextInput`
  border: 0.8px ${AppColors.grey} solid;
  padding-left: 8px;
  margin-bottom: 24px;
  border-radius: 6px;
`;
