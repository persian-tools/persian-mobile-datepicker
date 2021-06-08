import styled, { createGlobalStyle } from 'styled-components';
import Picker from 'rmc-picker/es/Picker';
// @ts-ignore
import styles from 'rmc-picker/assets/index.css';

export const GlobalStyle = createGlobalStyle`${styles}`;

export type CaptionProps = { columnSize: number };
export const Caption = styled.div<CaptionProps>`
  display: inline-block;
  text-align: center;
  width: ${(props) => `${100 / props.columnSize}%`};
  color: #3f3f3e;
  padding-bottom: 5px;
  font-size: 1.1em;
  border-bottom: 1px solid #ddd;
`;

export const PickerWithStyle = styled(Picker)``;
export const PickerItemWithStyle = styled(Picker.Item)``;
