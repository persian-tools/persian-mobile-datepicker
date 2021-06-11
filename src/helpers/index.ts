import type { PickerDateModel } from '../components/WheelPicker/index.types';

/**
 * Add prefix for every classname
 *
 * @param {string} prefix
 */
export function prefixClassName(prefix: string) {
  /**
   * Classname with returns itself with a prefix value
   *
   * @param {string} className
   * @return {string}
   */
  return (className: string) => `${prefix}-${className}`;
}

/**
 * Generate an Array of Numbers with a fixed length
 *
 * @param {number} length
 * @return {Array<number>}
 * @example
 * generateAnArrayOfNumbers(5) // [1,2,3,4,5]
 */
export function generateAnArrayOfNumbers(length: number): Array<number> {
  return new Array(length).fill(1).map((_, index) => index + 1);
}

/**
 * Generate an array of numbers in range of [start] and [end]
 *
 * @param {number} start
 * @param {number} end
 * @return {Array<number>}
 * @example
 * generateArrayInRangeOfNumbers(1400, 1405) // [1400, 1401, 1402, 1403, 1404, 1405]
 */
export function generateArrayInRangeOfNumbers(
  start: number,
  end: number,
): Array<number> {
  const inRangeArray = [];
  for (let i = start; i >= start && i <= end; i++) {
    inRangeArray.push(i);
  }

  return inRangeArray;
}

/**
 * WheelPicker selected items value is an array of strings which can't help us to finger out the selected date, but we can convert it to a valid date
 *
 * @param {Array<string>} selectedDate
 * @return {PickerDateModel}
 * @example
 * const selectedDate = ["year-1400", "month-3", "day-10"];
 * const parsedSelectedDate = convertSelectedDateToObject(selectedDate);
 * // result
 * {
 *   year: 1400,
 *   month: 3,
 *   day: 10
 * }
 */
export function convertSelectedDateToObject(
  selectedDate: Array<string>,
): PickerDateModel {
  const result = {} as PickerDateModel;

  selectedDate.forEach((v) => {
    const [type, value] = v.split('-');

    result[type] = Number(value);
  });

  return result;
}

/**
 * Convert the Object of Selected Date to an Array of string which WheelPicker can use to figure out the current selected columns' values by the Date format order
 *
 * @param {PickerDateModel} selectedDate
 * @return {Array<string>}
 * @example
 * const selectedDate = {
 *   month: 3,
 *   year: 1400,
 *   day: 10
 * };
 * const parsedSelectedDate = convertSelectedDateObjectToArray(selectedDate);
 * // result
 * ["year-1400", "month-3", "day-10"]
 */
export function convertSelectedDateObjectToArray(
  selectedDate: PickerDateModel,
): Array<string> {
  const columnsSortOrder = {
    year: 1,
    month: 2,
    day: 3,
    hour: 4,
    minute: 5,
    second: 6,
  };
  const result = Object.keys(selectedDate).map((type) => ({
    type,
    value: selectedDate[type],
  }));

  const sortedColumnsOrder = result.sort((columnA, columnB) =>
    columnsSortOrder[columnA.type] > columnsSortOrder[columnB.type] ? 1 : 0,
  );

  return sortedColumnsOrder.map((v) => `${v.type}-${v.value}`);
}

/**
 * Check if an Object is really empty.
 * @param obj
 */
export function isObjectEmpty(obj: Object): boolean {
  return obj?.constructor === Object && Object.keys(obj).length === 0;
}

/**
 * Convert negative number to positive
 *
 * @param {number} n negative number
 * @return {number} positive number
 * @example
 * toPositive(-10) // 10
 */
export function toPositive(n: number): number {
  return n < 0 ? n * -1 : n;
}
