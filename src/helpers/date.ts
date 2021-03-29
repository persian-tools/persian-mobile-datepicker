import jalaali from 'jalaali-js';
import { createAnArrayOfNumbers, generateArrayInRangeOfNumbers } from './';
// Types
import { PickerItemModel } from '../components/WheelPicker/index.types';

/**
 * Get the number of days in the current jalali month and memoize the prev date and calculated days in the month.
 * ```
 * daysInMonth(1399, 12) // 30
 * ```
 */
export function daysInMonth(year: number, month: number): number {
  return jalaali.jalaaliMonthLength(year, month);
}

export function isValidJalaaliDate(
  year: number,
  month: number,
  day: number,
): boolean {
  return jalaali.isValidJalaaliDate(year, month, day);
}

export function getCurrentYear(): number {
  return jalaali.toJalaali(new Date()).jy;
}

export function generateJallaliYears(): Array<number> {
  const currentYear = getCurrentYear();
  const prevDecade = currentYear - 100;
  const nextDecade = currentYear + 100;

  return generateArrayInRangeOfNumbers(prevDecade, nextDecade);
}

export function isLeapJalaaliYear(year: number): boolean {
  return jalaali.isLeapJalaaliYear(year);
}

export const jallaliMonthMap = {
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

export const pickerData: Record<
  string,
  (inp?: any) => Array<PickerItemModel>
> = {
  getJallaliYears: () =>
    generateJallaliYears().map((year) => ({ value: year, type: 'jyear' })),
  getJallaliMonths: (monthsMap = jallaliMonthMap) =>
    Object.keys(monthsMap).map((value) => ({
      type: 'jmonth',
      value: Number(value),
    })),
  getDays: (days = 29) =>
    createAnArrayOfNumbers(days).map((day) => ({ value: day, type: 'day' })),
  getHours: () =>
    createAnArrayOfNumbers(24).map((hour) => ({ value: hour, type: 'hour' })),
  getSeconds: () =>
    createAnArrayOfNumbers(59).map((hour) => ({ value: hour, type: 'second' })),
  getMinutes: () =>
    createAnArrayOfNumbers(59).map((hour) => ({ value: hour, type: 'minute' })),
};
