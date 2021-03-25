import jalaali from 'jalaali-js';

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

export function isLeapJalaaliYear(year: number): boolean {
  return jalaali.isLeapJalaaliYear(year);
}

export type JalaliMonth = {
  value: number;
  text: string;
};
export const jalaliMonths: Array<JalaliMonth> = [
  {
    value: 1,
    text: 'فروردین',
  },
  {
    value: 2,
    text: 'اردیبهشت',
  },
  {
    value: 3,
    text: 'خرداد',
  },
  {
    value: 4,
    text: 'تیر',
  },
  {
    value: 5,
    text: 'مرداد',
  },
  {
    value: 6,
    text: 'شهریور',
  },
  {
    value: 7,
    text: 'مهر',
  },
  {
    value: 8,
    text: 'آبان',
  },
  {
    value: 9,
    text: 'آذر',
  },
  {
    value: 10,
    text: 'دی',
  },
  {
    value: 11,
    text: 'بهمن',
  },
  {
    value: 12,
    text: 'اسفند',
  },
];
