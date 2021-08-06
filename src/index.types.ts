import type { CSSProperties } from 'react';
import type {
  WheelPickerProps,
  WheelPickerSelectEvent,
} from './components/WheelPicker/index.types';

export type Theme = 'dark' | 'light';
export interface PickerProps extends WheelPickerProps {
  // Picker Theme
  theme?: Theme;
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
  onSubmit: (selected: WheelPickerSelectEvent) => void;
  // Triggered when click Cancel,
  onCancel?: () => void;
  // Display Cancel button
  showCancelButton?: boolean;
  // Disable drag for the whole sheet.
  disableSheetDrag?: boolean;
  /**
   * Height of Picker Sheet modal
   *
   * @default 385
   */
  height?: number;
  // Picker Sheet modal styles
  sheetStyles?: CSSProperties;
}
