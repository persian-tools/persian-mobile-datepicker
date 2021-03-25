import { JalaliMonth } from '../../helpers/date';

export interface WheelPickerDataModel {
  label: string;
  value: string;
}

export interface WheelPickerSelectEvent extends WheelPickerDataModel {
  index: number;
}

export interface WheelPickerProps {
  // CSS classnames prefix
  prefix?: string;
  // Array of data in each column
  data: Array<WheelPickerDataModel>;
  // Default column value
  defaultValue?: WheelPickerDataModel;
  // Click the mask layer to close the component (equivalent to cancel)
  hideOnBackdrop?: boolean;
  // Title
  title?: string;
  // Triggered when the component DOM is generated, the parameter is the component element
  onRender?: () => void;
  // Triggered when the value changes due to scrolling, the parameter is the index value of the entry array and the changed column
  onChange?: (selected: WheelPickerSelectEvent) => void;
  // Triggered when you click OK, the parameter is an array of entries
  onSelect?: (selected: WheelPickerSelectEvent) => void;
  // Disabled
  disabled?: boolean;
}

export type PickerSingleColumn = Array<JalaliMonth | string | number>;
export type PickerMultipleColumns = Array<PickerSingleColumn>;
