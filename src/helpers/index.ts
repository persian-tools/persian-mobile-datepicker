/**
 * Add prefix for every classname
 *
 * @param {string} prefix
 */
import {
  PickerMultipleColumns,
  PickerSingleColumn,
} from '../components/WheelPicker/index.types';

export function prefixClassName(prefix: string) {
  /**
   * Classname with returns itself with a prefix value
   *
   * @param {string} className
   * @returns {string}
   */
  return (className: string) => `${prefix}-${className}`;
}

export function columnName(index: number): string {
  return (
    {
      1: 'year',
      2: 'month',
      3: 'day',
      4: 'hour',
      5: 'minute',
      6: 'second',
    }[index] || ''
  );
}

export function mapSelectedValueToDate(
  columns: PickerMultipleColumns,
  selectedValue: Array<number>,
): PickerSingleColumn {
  return selectedValue.map((valueIndex, index) => columns[index][valueIndex]);
}
