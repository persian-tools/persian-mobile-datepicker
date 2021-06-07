import {
  WheelPickerProps,
  WheelPickerSelectEvent,
} from './components/WheelPicker/index.types';

export type Device = 'android' | 'ios';
export type Theme = 'dark' | 'light';
export type PickerTheme = `${Device}-${Theme}`;
export interface PickerProps extends WheelPickerProps {
  // Picker Theme
  theme?: PickerTheme;
  // Elements className may have a prefix
  classNamePrefix?: string;
  // Picker open status
  isOpen: boolean;
  // Call when Picker Sheet modal has closed
  onClose?: () => void;
  // Submit button text
  submitText?: string;
  // Cancel button text
  cancelText?: string;
  // Triggered when you click OK
  onSelect: (selected: WheelPickerSelectEvent) => void;
  // Triggered when click Cancel,
  onCancel?: () => void;
  // Display Cancel button
  showCancelButton?: boolean;
  // Disable drag for the whole sheet.
  disableSheetDrag?: boolean;
}
