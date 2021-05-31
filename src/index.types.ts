import { WheelPickerProps } from './components/WheelPicker/index.types';

export type Device = 'android' | 'ios';
export type Theme = 'dark' | 'light';
export type PickerTheme = `${Device}-${Theme}`;
export interface PickerProps extends WheelPickerProps {
  theme?: PickerTheme;
  classNamePrefix?: string;
}
