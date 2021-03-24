import React from 'react';
// Global Components
import MultiPicker from 'rmc-picker/es/MultiPicker';
import Picker from 'rmc-picker/es/Picker';
// Styles
import { GlobalStyle } from './styles';
// Helpers
import {
  columnName,
  mapSelectedValueToDate,
  prefixClassName,
} from '../../helpers';
// Types
import type { PickerMultipleColumns, WheelPickerProps } from './index.types';

export const WheelPicker: React.FC<WheelPickerProps> = (props) => {
  const [value, setValue] = React.useState<number[]>();
  const prefix = prefixClassName(props.prefix!);
  const pickerColumns: PickerMultipleColumns = [
    [1399, 1400, 1401, 1402, 1403],
    [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ],
    [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
    ],
  ];

  function onChange(value: Array<number>) {
    console.log(
      'onChange selected value',
      value,
      'value',
      mapSelectedValueToDate(pickerColumns, value),
    );
    setValue(value);
  }
  return (
    <React.Fragment>
      <MultiPicker selectedValue={value} onValueChange={onChange}>
        {pickerColumns.map((column, index) => {
          return (
            <Picker
              key={index}
              indicatorClassName={prefix(
                `indicator ${prefix(`${columnName(index)}-column`)}`,
              )}
            >
              {column.map((columnValues, columnValuesIndex) => {
                return (
                  <Picker.Item
                    key={columnValuesIndex}
                    className={prefix('view-item')}
                    value={columnValuesIndex}
                  >
                    {columnValues}
                  </Picker.Item>
                );
              })}
            </Picker>
          );
        })}
      </MultiPicker>
      <GlobalStyle />
    </React.Fragment>
  );
};

WheelPicker.defaultProps = {
  data: [],
};
