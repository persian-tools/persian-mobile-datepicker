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
} from 'date-fns-jalali';
// Helpers
import { createAnArrayOfNumbers, generateArrayInRangeOfNumbers } from './';
// Types
import type {
  PickerItemModel,
  WeekDaysName,
} from '../components/WheelPicker/index.types';
import { PickerDateModel } from '../components/WheelPicker/index.types';

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

export const isYearLessThan = (current: number, next: number): boolean => {
  return current > next;
};
export const convertDateToObject = (
  date: Date,
): Required<Pick<PickerDateModel, 'year' | 'month' | 'day'>> => {
  return {
    year: getYear(date),
    month: getMonth(date),
    day: getDate(date),
  };
};

/**
 * Get the number of days in a jalali month of a year
 *
 * @param {number} year
 * @param {number} month
 * @returns {number} number of days in a jalali month of a year
 */
export function jDaysInMonth(year: number, month: number): number {
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

// console.log('jDaysInMonth', jDaysInMonth(1400, 12));

export function isValidJalaaliDate(
  year: number,
  month: number,
  day: number,
): boolean {
  return dateIsValid(setDate(year, month, day));
}

export function getCurrentYear(): number {
  return Number(format(new Date(), 'yyyy'));
}

export function generateJallaliYears(): Array<number> {
  const currentYear = getCurrentYear();
  const prevDecade = currentYear - 100;
  const nextDecade = currentYear + 100;

  return generateArrayInRangeOfNumbers(prevDecade, nextDecade);
}

export function isLeapYear(year: number): boolean {
  return dateIsLeapYear(year);
}

export const pickerData: Record<string, (inp?: any) => Array<PickerItemModel>> =
  {
    getYears: () =>
      generateJallaliYears().map((year) => ({ value: year, type: 'year' })),
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
