// Date Utilities
import {
  format as formatFns,
  getDay as dateGetDay,
  newDate,
  isValid as dateIsValid,
  isLeapYear as dateIsLeapYear,
  getDaysInMonth as dateGetDaysInMonth,
  getDate,
  getYear,
  getMonth,
  getHours,
  getMinutes,
  getSeconds,
  isEqual as isEqualFns,
  isBefore as isBeforeFns,
  isAfter as isAfterFns,
  getDayOfYear as getDayOfYearFns,
} from 'date-fns-jalali';
// Helpers
import {
  generateAnArrayOfNumbers,
  generateArrayInRangeOfNumbers,
  toPositive,
} from './';
// Types
import type {
  PickerItemModel,
  WeekDayText,
  PickerDateModel,
  RequiredPickerDateModel,
} from '../components/WheelPicker/index.types';

export const weekDays: Record<number, WeekDayText> = {
  0: 'شنبه',
  1: 'یک‌شنبه',
  2: 'دو‌شنبه',
  3: 'سه‌شنبه',
  4: 'چهار‌شنبه',
  5: 'پنج‌شنبه',
  6: 'جمعه',
};
export const jalaliMonths = {
  1: 'فروردین',
  2: 'اردیبهشت',
  3: 'خرداد',
  4: 'تیر',
  5: 'مرداد',
  6: 'شهریور',
  7: 'مهر',
  8: 'آبان',
  9: 'آذر',
  10: 'دی',
  11: 'بهمن',
  12: 'اسفند',
};

/**
 * Convert Jallali Date to Gregorian
 *
 * @param {number} $0.year
 * @param {number} $0.month
 * @param {number} $0.day
 * @param {number} $0.hour
 * @param {number} $0.minute
 * @param {number} $0.second
 *
 * @public
 */
export function createDateInstance({
  year,
  month,
  day = 1,
  hour,
  minute,
  second,
}: PickerDateModel): Date {
  // date-fns month starts from 0, it means farvardin is 0 and esfand is 11
  month = month! - 1;
  return newDate(year!, month, day, hour, minute, second);
}

/**
 * Convert entered date to an object
 *
 * @param {Date} date
 * @return {RequiredPickerDateModel}
 * @public
 */
export const convertDateInstanceToDateObject = (
  date: Date,
): RequiredPickerDateModel => {
  return {
    year: getYear(date),
    month: getMonth(date) + 1,
    day: getDate(date),
    hour: getHours(date),
    minute: getMinutes(date),
    second: getSeconds(date),
  };
};

/**
 * Convert an object of date to an instance of date function
 *
 * @param {PickerDateModel} dateObject
 * @return {Date}
 *
 * @public
 */
export const convertDateObjectToDateInstance = (
  dateObject: PickerDateModel,
): Date => {
  return createDateInstance(dateObject);
};

/**
 * Get the number of days in a month of a year
 *
 * @param {number} year
 * @param {number} month
 * @return {number} number of days in a month of a year
 *
 * @public
 */
export function daysInMonth(year: number, month: number): number {
  return dateGetDaysInMonth(createDateInstance({ year, month, day: 1 }));
}

/**
 * Get the day of the week of the given date.


 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @return {number}
 *
 * @public
 */
export function getWeekDay(year: number, month: number, day: number): number {
  return (dateGetDay(createDateInstance({ year, month, day })) + 1) % 7;
}

/**
 * Get the day of the year of the given date.

 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @return {number}
 */
export function getDayOfYear(year: number, month: number, day: number): number {
  return getDayOfYearFns(createDateInstance({ year, month, day }));
}

/**
 * Return if the Date is at the Weekend
 *
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @return {boolean}
 * @public
 */
export function isWeekend(year: number, month: number, day: number): boolean {
  return getWeekDay(year, month, day) === 6;
}

/**
 * Get weekday's name by date
 *
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @return {WeekDayText} شنبه،...
 * @public
 */
export function getWeekDayText(
  year: number,
  month: number,
  day: number,
): WeekDayText {
  const result = getWeekDay(year, month, day);

  return weekDays[result];
}

/**
 * Is the given date valid?
 *
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using toDate.
 * See toDate Invalid Date is a Date, whose time value is NaN.
 *
 * @param {Date} date
 * @return {boolean}
 */
export function isValid(date: Date): boolean {
  return dateIsValid(date);
}

/**
 * Is the first date before the second one?
 *
 * @param {Date} date
 * @param {Date} dateToCompare
 * @return {boolean}
 * @public
 */
export function isBefore(date: Date, dateToCompare: Date): boolean {
  return isBeforeFns(date, dateToCompare);
}

/**
 * Is the first date after the second one?
 *
 * @param {Date} date
 * @param {Date} dateToCompare
 * @return {boolean}
 */
export function isAfter(date: Date, dateToCompare: Date): boolean {
  return isAfterFns(date, dateToCompare);
}

export function format(date: Date | number, formatBy: string): string {
  return formatFns(date, formatBy);
}

/**
 * Are the given dates equal?
 *
 * @param {Date} dateLeft
 * @param {Date} dateRight
 * @return {boolean}
 */
export function isEqual(dateLeft: Date, dateRight: Date): boolean {
  return isEqualFns(dateLeft, dateRight);
}

/**
 * Return the current Year
 *
 * @return {number}
 * @public
 */
export function getCurrentYear(): number {
  return currentDateObject().year;
}

export type CurrentDateObject = Required<Record<keyof PickerDateModel, number>>;
/**
 * Convert date instance string to an object.
 * The result may vary by locale.
 *
 * @return {CurrentDateObject}
 * @public
 */
export function currentDateObject(): CurrentDateObject {
  const date = new Date();
  return {
    year: Number(format(date, 'yyyy')),
    month: Number(format(date, 'M')),
    day: Number(format(date, 'd')),
    hour: Number(format(date, 'h')),
    minute: Number(format(date, 'm')),
    second: Number(format(date, 'S')),
  };
}

/**
 * Generate a Range of Years to show into the Date Picker
 *
 * @param {number} min Min year range
 * @param {number} max Max year range
 * @return {Array<number>}
 * @private
 */
function generateYearsRange(min: number, max: number): Array<number> {
  const currentYear = getCurrentYear();
  const minRange = currentYear - min;
  const maxRange = currentYear + max;

  return generateArrayInRangeOfNumbers(minRange, maxRange);
}

/**
 * Check if the entered year is Leap
 *
 * @param {number} year
 * @return {boolean}
 * @public
 */
export function isLeapYear(year: number): boolean {
  return dateIsLeapYear(createDateInstance({ year, month: 1, day: 1 }));
}

/**
 * Calculate the minimum year items which picker should render in Year Column
 *
 * @public
 *
 * @param {number} year
 * @return {number} this value should assign to the [startYear] picker prop
 *
 * @example
 * assume that currentYear is 1400
 * startYear(1380) // 20(currentYear - 1380)
 */
export function startYear(year: number) {
  const currentYear = getCurrentYear();
  if (currentYear / year > 2) {
    throw new Error(
      `[PersianMobileDatePicker] Invalid Year, Usage: startYearFrom(1380), means Year picker's column should starts from 1380 up to now`,
    );
  }

  return toPositive(currentYear - year);
}

/**
 * Calculate the maximum year items which picker should render in Year Column
 *
 * @public
 *
 * @param {number} year
 * @return {number} this value should assign to the [endYear] picker prop
 *
 * @example
 * assume that currentYear is 1400
 * endYear(1410) // 10(year - currentYear)
 */
export function endYear(year: number) {
  const currentYear = getCurrentYear();
  if (currentYear / year > 2) {
    throw new Error(
      `[PersianMobileDatePicker] Invalid Year, Usage: endYearTo(1410), means Year picker's column should end in 1410`,
    );
  }

  return toPositive(currentYear - year);
}

/**
 * Combine and Generate all picker columns value
 *
 * @type {Record<string, (inp?: any) => Array<PickerItemModel>>}
 * @private
 */
export const pickerData: Record<string, (inp?: any) => Array<PickerItemModel>> =
  {
    getYears: ({ min, max } = {}) =>
      generateYearsRange(min, max).map((year) => ({
        value: year,
        type: 'year',
      })),
    getMonths: (monthsMap = jalaliMonths) =>
      Object.keys(monthsMap).map((value) => ({
        type: 'month',
        value: Number(value),
      })),
    getDays: (days = 29) =>
      generateAnArrayOfNumbers(days).map((day) => ({
        value: day,
        type: 'day',
      })),
    getHours: () =>
      generateAnArrayOfNumbers(24).map((hour) => ({
        value: hour,
        type: 'hour',
      })),
    getSeconds: () =>
      generateAnArrayOfNumbers(59).map((hour) => ({
        value: hour,
        type: 'second',
      })),
    getMinutes: () =>
      generateAnArrayOfNumbers(59).map((hour) => ({
        value: hour,
        type: 'minute',
      })),
  };
