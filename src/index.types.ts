export type Devices = 'android' | 'ios';
export type Theme = 'dark' | 'light';
export type PickerTheme = `${Devices}-${Theme}`;
export interface PickerProps {
  theme?: PickerTheme;
  classNamePrefix?: string;
}
