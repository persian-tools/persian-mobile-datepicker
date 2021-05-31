import { PickerDateModel } from '../components/WheelPicker/index.types';

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
   * @returns {string}
   */
  return (className: string) => `${prefix}-${className}`;
}

export function createAnArrayOfNumbers(length: number): number[] {
  return new Array(length).fill(1).map((_, index) => index + 1);
}

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

export function convertSelectedDateToAnArray(
  selectedDate: PickerDateModel,
): string[] {
  const columnsSortOrder = {
    year: 1,
    jyear: 1,
    month: 2,
    jmonth: 2,
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

export function isObjectEmpty(obj: Object): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
