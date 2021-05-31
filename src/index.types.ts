export type Device = 'android' | 'ios';
export type Theme = 'dark' | 'light';
export type PickerTheme = `${Device}-${Theme}`;
export interface PickerProps {
  theme?: PickerTheme;
  classNamePrefix?: string;
}
