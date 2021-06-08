import { CSSProperties } from 'react';

export interface WheelPickerSelectEvent {
  object: PickerDateModel;
  date: Date;
}

export interface WheelPickerProps {
  // CSS classnames prefix
  prefix?: string;
  // Default column value
  defaultValue?: Date;
  // Title
  title?: string;
  /**
   * Gets called when value of the picker changes
   *
   * @param {WheelPickerSelectEvent} selected
   * @return {void}
   */
  onChange?: (selected: WheelPickerSelectEvent) => void;
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

export interface PickerColumnCaption {
  text: string;
  style?: CSSProperties;
}
export type PickerSelectedDateValue = number;
export interface DateConfigValuesModel {
  // Columns Caption with text and style
  caption?: PickerColumnCaption;
  // Format the Columns content
  formatter?: (value: PickerExtraDateInfo) => PickerSelectedDateValue | string;
  // Items className
  classname?: (value: PickerExtraDateInfo) => string | string[];
  // Allow to render an Item
  shouldRender?: (value: PickerExtraDateInfo) => boolean;
  // Column Styles
  columnStyle?: CSSProperties;
  // Column's Items Styles
  itemStyle?: CSSProperties;
  // Active Selected Column's Items Styles
  selectedItemStyle?: CSSProperties;
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
