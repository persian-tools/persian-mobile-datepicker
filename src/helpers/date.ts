// Date Utilities
import {
  format,
  getDay as dateGetDay,
  newDate as newJallaliDate,
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
} from 'date-fns-jalali';
// Helpers
import { createAnArrayOfNumbers, generateArrayInRangeOfNumbers } from './';
// Types
import type {
  PickerItemModel,
  WeekDaysName,
} from '../components/WheelPicker/index.types';
import type { PickerDateModel } from '../components/WheelPicker/index.types';
import { RequiredPickerDateModel } from '../components/WheelPicker/index.types';

export const weekDays: Record<number, WeekDaysName> = {
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
export function setDate(
  year: number,
  month: number,
  day = 1,
  hour?: number,
  minutes?: number,
  seconds?: number,
): Date {
  // date-fns month starts from 0, it means farvardin is 0 and esfand is 11
  month = month - 1;
  return newJallaliDate(year, month, day, hour, minutes, seconds);
}

/**
 * Convert entered date to an object
 *
 * @param {Date} date
 * @return {RequiredPickerDateModel}
 */
export const convertDateToObject = (date: Date): RequiredPickerDateModel => {
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
 * @param {PickerDateModel} obj
 * @returns {Date}
 */
export const convertObjectToDate = (obj: PickerDateModel): Date => {
  return setDate(
    obj.year as number,
    obj.month as number,
    obj.day as number,
    obj.hour as number,
    obj.minute as number,
    obj.second as number,
  );
};

/**
 * Get the number of days in a month of a year
 *
 * @param {number} year
 * @param {number} month
 * @returns {number} number of days in a month of a year
 */
export function daysInMonth(year: number, month: number): number {
  return dateGetDaysInMonth(setDate(year, month, 1));
}

/**
 * Get the day of the week of the given date.


 * @param {number} year
 * @param {number} month
 * @param {number} day
 */
export function getWeekDay(year: number, month: number, day: number): number {
  return (dateGetDay(setDate(year, month, day)) + 1) % 7;
}

/**
 * Get weekday's name by date
 *
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @return {WeekDaysName} شنبه،...
 */
export function getWeekDayName(
  year: number,
  month: number,
  day: number,
): WeekDaysName {
  const result = getWeekDay(year, month, day);

  return weekDays[result];
}

/**
 * Check if entered date is valid
 *
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @returns {boolean}
 */
export function isValidDate(year: number, month: number, day: number): boolean {
  return isValid(setDate(year, month, day));
}

export function isValid(date: Date): boolean {
  return dateIsValid(date);
}

export function isBefore(currentDate: Date, nextDate: Date): boolean {
  return isBeforeFns(currentDate, nextDate);
}

export function isAfter(currentDate: Date, nextDate: Date): boolean {
  return isAfterFns(currentDate, nextDate);
}

export function isEqual(dateLeft: Date, dateRight: Date): boolean {
  return isEqualFns(dateLeft, dateRight);
}

/**
 * Return the current Year
 *
 * @returns {number}
 */
export function getCurrentYear(): number {
  return currentDateObject().year;
}

export function currentDateObject(): Required<
  Record<keyof Pick<PickerDateModel, 'year' | 'month' | 'day'>, number>
> {
  return {
    year: Number(format(new Date(), 'yyyy')),
    month: Number(format(new Date(), 'M')),
    day: Number(format(new Date(), 'd')),
  };
}

/**
 * Generate a Range of Years to show into the Date Picker
 *
 * @param {number} min Min year range
 * @param {number} max Max year range
 * @returns {Array<number>}
 */
export function generateYearsRange(min: number, max: number): Array<number> {
  const currentYear = getCurrentYear();
  const minRange = currentYear - min;
  const maxRange = currentYear + max;

  return generateArrayInRangeOfNumbers(minRange, maxRange);
}

/**
 * Check if the entered year is Leap
 *
 * @param {number} year
 * @returns {boolean}
 */
export function isLeapYear(year: number): boolean {
  return dateIsLeapYear(year);
}

/**
 * Combine and Generate all picker columns value
 *
 * @type {Record<string, (inp?: any) => Array<PickerItemModel>>}
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
      createAnArrayOfNumbers(days).map((day) => ({ value: day, type: 'day' })),
    getHours: () =>
      createAnArrayOfNumbers(24).map((hour) => ({ value: hour, type: 'hour' })),
    getSeconds: () =>
      createAnArrayOfNumbers(59).map((hour) => ({
        value: hour,
        type: 'second',
      })),
    getMinutes: () =>
      createAnArrayOfNumbers(59).map((hour) => ({
        value: hour,
        type: 'minute',
      })),
  };
