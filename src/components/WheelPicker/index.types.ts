export interface WheelPickerSelectEvent extends PickerDateModel {}

export interface WheelPickerProps {
  // CSS classnames prefix
  prefix?: string;
  // Min Year value
  minYear?: number;
  // Max Year value
  maxYear?: number;
  // Min Month value
  minMonth?: number;
  // Max Month value
  maxMonth?: number;
  // Min Day value
  minDay?: number;
  // Max Day value
  maxDay?: number;
  // Default column value
  defaultValue?: PickerDateModel;
  // Title
  title?: string;
  // Triggered when the component DOM is generated, the parameter is the component element
  onRender?: () => void;
  // Triggered when the value changes due to scrolling, the parameter is the index value of the entry array and the changed column
  onChange?: (selected: WheelPickerSelectEvent) => void;
  // Triggered when you click OK
  onSelect?: (selected: WheelPickerSelectEvent) => void;
  // Triggered when click Cancel,
  onCancel?: () => void;
  // Disabled
  disabled?: boolean;
  // Set config to configure year, month, day, hour, minute and seconds
  config: DateConfig;
  // Min Date value
  minDate?: Date;
  // Max Date value
  maxDate?: Date;
}

export type DateConfigTypes =
  // Gregorian Year
  | 'year'
  // Jallali Year
  | 'jyear'
  // Gregorian Month
  | 'month'
  // Jallali Month
  | 'jmonth'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second';
export type DateConfigFormats =
  | 'YYYY'
  | 'YY'
  | 'MM'
  | 'DD'
  | 'hh'
  | 'mm'
  | 'ss';
export type PickerSelectedDateValue = string | number;
export interface DateConfigValuesModel {
  caption?: string;
  formatter?: (value: PickerSelectedDateValue) => PickerSelectedDateValue;
  classname?: (value: PickerClassNameFormatter) => string | string[];
}

export type DateConfig = Partial<
  {
    [key in DateConfigTypes]: DateConfigValuesModel;
  }
>;

export type PickerDateModel = {
  year?: PickerSelectedDateValue;
  month?: PickerSelectedDateValue;
  day?: PickerSelectedDateValue;
  hour?: PickerSelectedDateValue;
  minute?: PickerSelectedDateValue;
  second?: PickerSelectedDateValue;
};

export interface PickerClassNameFormatter extends PickerDateModel {
  weekDay?: number;
  weekDayName?: WeekDaysName;
}

export interface PickerItemModel<V = PickerSelectedDateValue> {
  type: DateConfigTypes;
  value: V;
}

export type PickerColumns = Array<PickerItemModel<Array<PickerItemModel>>>;

export type WeekDaysName =
  | 'شنبه'
  | 'یک‌شنبه'
  | 'دو‌شنبه'
  | 'سه‌شنبه'
  | 'چهار‌شنبه'
  | 'پنج‌شنبه'
  | 'جمعه';
