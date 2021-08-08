import type {
  WheelPickerProps,
  WheelPickerSelectEvent,
} from './components/WheelPicker/index.types';

export type Theme = 'dark' | 'light' | 'auto';
export interface PickerProps extends WheelPickerProps {
  /**
   * Picker Theme
   *
   * @default light
   */
  theme?: Theme;
  /**
   * Picker open status
   *
   * @default false
   */
  isOpen: boolean;
  // Call when Picker Sheet modal has closed or User clicked on Cancel Button or User manually closed the Sheet modal by drag and drop
  onClose?: () => void;
  // Call when user clicked on Cancel Button
  onCancel?: () => void;
  /**
   * Submit button text
   *
   * @default تایید
   */
  submitText?: string;
  /**
   * Cancel button text
   *
   * @default انصراف
   */
  cancelText?: string;
  // Triggered when you click on Submit button
  onSubmit: (selected: WheelPickerSelectEvent) => void;
  /**
   * Display Cancel button
   *
   * @default true
   */
  showCancelButton?: boolean;
  /**
   * Disable drag for the sheet content.
   *
   * @default true
   */
  disableSheetDrag?: boolean;
  /**
   * Disable drag for the sheet header.
   *
   * @default false
   */
  disableSheetHeaderDrag?: boolean;
  /**
   * Height of Picker Sheet modal
   *
   * @default 385
   */
  height?: number;
}
