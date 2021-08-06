import type { CSSProperties } from 'react';
import type {
  WheelPickerProps,
  WheelPickerSelectEvent,
} from './components/WheelPicker/index.types';

export type Theme = 'dark' | 'light' | 'auto';
export interface PickerProps extends WheelPickerProps {
  // Picker Theme
  theme?: Theme;
  // Elements className may have a prefix
  classNamePrefix?: string;
  // Picker open status
  isOpen: boolean;
  // Call when Picker Sheet modal has closed or User clicked on Cancel Button or User manually closed the Sheet modal by drag and drop
  onClose?: () => void;
  // Call when user clicked on Cancel Button
  onCancel?: () => void;
  // Submit button text
  submitText?: string;
  // Cancel button text
  cancelText?: string;
  // Triggered when you click OK
  onSubmit: (selected: WheelPickerSelectEvent) => void;
  // Display Cancel button
  showCancelButton?: boolean;
  // Disable drag for the sheet content.
  disableSheetDrag?: boolean;
  // Disable drag for the sheet header.
  disableSheetHeaderDrag?: boolean;
  /**
   * Height of Picker Sheet modal
   *
   * @default 385
   */
  height?: number;
  // Picker Sheet modal styles
  sheetStyles?: CSSProperties;
}
