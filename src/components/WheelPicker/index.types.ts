export interface WheelPickerSelectEvent extends PickerDateModel {}

export interface WheelPickerProps {
  // CSS classnames prefix
  prefix?: string;
  // Default column value
  defaultValue?: Date;
  // Title
  title?: string;
  // Triggered when the component DOM is generated, the parameter is the component element
  onRender?: () => void;
  /**
   * Gets called when value of the picker changes
   *
   * @param {WheelPickerSelectEvent} selected
   * @return {void}
   */
  onChange?: (selected: WheelPickerSelectEvent) => void;
  // Triggered when you click OK
  onSelect?: (selected: WheelPickerSelectEvent) => void;
  // Triggered when click Cancel,
  onCancel?: () => void;
  // Disabled
  disabled?: boolean;
  // Set config to configure year, month, day, hour, minute and seconds
  config: DateConfig;
  /**
   * Specifies the minimum selectable day by user
   *
   * @default null
   * @type {Date}
   */
  minDate?: Date;
  /**
   * Specifies the maximum selectable day by user
   *
   * @default null
   * @type {Date}
   */
  maxDate?: Date;
  /**
   * The Minimum selectable year
   *
   * @description Picker will calculate the StartYear by this approach: currentYear + startYear
   * @default 30
   * @type {number}
   */
  endYear?: number;
  /**
   * The Maximum selectable year
   *
   * @description Picker will calculate the StartYear by this approach: currentYear + startYear
   * @default 30
   * @type {number}
   */
  startYear?: number;
  /**
   * Determines whether to mark weekend days with red or not. (weekend day is Friday)
   *
   * @default false
   * @type {boolean}
   */
  highlightWeekends?: boolean;
}

export type DateConfigTypes =
  | 'year'
  | 'month'
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
export type WeekDayText =
  | 'شنبه'
  | 'یک‌شنبه'
  | 'دو‌شنبه'
  | 'سه‌شنبه'
  | 'چهار‌شنبه'
  | 'پنج‌شنبه'
  | 'جمعه';

export type PickerSelectedDateValue = number;
export interface DateConfigValuesModel {
  caption?: string;
  formatter?: (
    value: PickerSelectedDateValue,
  ) => PickerSelectedDateValue | string;
  classname?: (value: PickerExtraDateInfo) => string | string[];
  shouldRender?: (value: PickerExtraDateInfo) => boolean;
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
export type RequiredPickerDateModel = Required<PickerDateModel>;

export interface PickerExtraDateInfo extends PickerDateModel {
  weekDay?: number;
  weekDayText?: WeekDayText;
  monthText?: string;
  isLeapYear?: boolean;
}

export interface PickerItemModel<V = PickerSelectedDateValue> {
  type: DateConfigTypes;
  value: V;
}

export type PickerColumns = Array<PickerItemModel<Array<PickerItemModel>>>;
