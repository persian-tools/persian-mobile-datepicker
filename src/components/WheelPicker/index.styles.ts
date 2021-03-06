import styled, { createGlobalStyle } from 'styled-components';
import Picker from 'rmc-picker/es/Picker';
// @ts-ignore
import styles from 'rmc-picker/assets/index.css';

export const GlobalStyle = createGlobalStyle`${styles}`;

export type CaptionProps = { columnSize: number };
export const StyledCaption = styled.div<CaptionProps>`
  display: inline-block;
  text-align: center;
  width: ${(props) => `${100 / props.columnSize}%`};
  color: #616161;
  padding-bottom: 5px;
  font-size: 1.1em;
  &:not(:empty) {
    border-bottom: 1px solid #e0e0e0;
  }
`;
StyledCaption.displayName = 'PersianTools(WheelPicker)(Caption)';

export const StyledTitle = styled.div`
  width: 100%;
  text-align: center;
  line-height: 55px;
  color: #1672ec;
  font-weight: bold;
  font-size: 1.1em;
`;
StyledTitle.displayName = 'PersianTools(WheelPicker)(Title)';

export const PickerWithStyle = styled(Picker)``;
PickerWithStyle.displayName = 'PersianTools(WheelPicker)(PickerColumns)';

export const PickerItemWithStyle = styled(Picker.Item)``;
PickerItemWithStyle.displayName = 'PersianTools(WheelPicker)(PickerItems)';
