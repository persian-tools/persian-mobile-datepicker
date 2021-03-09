export interface WheelPickerDataModel {
  label: string;
  value: string;
}

export interface WheelPickerSelectEvent extends WheelPickerDataModel {
  index: number;
}

export interface WheelPickerProps {
  // Array of data in each column
  data: Array<WheelPickerDataModel>;
  // Default column value
  defaultValue?: WheelPickerDataModel;
  // Number of visible rows(Prefer to write an odd number)
  visibleRows?: number;
  // Rows height
  rowHeight?: number;
  // The value filled into the el element when saving
  parseValue?: (value: string) => Array<string>;
  // Get the default value from the el element
  formatValue?: (value: Array<string>) => string;
  // Click the mask layer to close the component (equivalent to cancel)
  hideOnBackdrop: boolean;
  // Title
  title?: string;
  // Triggered when the component DOM is generated, the parameter is the component element
  onRender?: () => void;
  // Triggered when the value changes due to scrolling, the parameter is the index value of the entry array and the changed column
  onChange?: (selected: WheelPickerSelectEvent) => void;
  // Triggered when you click OK, the parameter is an array of entries
  onSelect?: (selected: WheelPickerSelectEvent) => void;
  // Show the Picker
  open: boolean;
  // Triggered when cancel is clicked
  onClose?: () => void;
  // Disabled
  disabled?: boolean;
}
