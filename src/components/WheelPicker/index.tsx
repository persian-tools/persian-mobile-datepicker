import React, { useLayoutEffect, useMemo } from 'react';
// Global Components
import Picker from 'rmc-picker/es/Picker';
import MultiPicker from 'rmc-picker/es/MultiPicker';
// Styles
import { GlobalStyle } from './styles';
// Hooks
import { usePicker } from '../../hooks/usePicker';
// Helpers
import { convertSelectedDateToObject, isObjectEmpty } from '../../helpers';
import { pickerData } from '../../helpers/date';
// Types
import type { PickerColumns, WheelPickerProps } from './index.types';
import type { FC } from 'react';

export const WheelPicker: FC<WheelPickerProps> = (props) => {
  const {
    prefix,

    daysInMonth,
    selectedDate,
    setSelectedDate,
    defaultPickerValues,

    maxYear,
    minYear,

    filterAllowedColumnRows,
    handlePickerItemTextContent,
    handlePickerItemClassNames,
  } = usePicker(props);

  // Memo list
  /**
   * Generate Picker's columns with their values
   *
   * @category watchers
   * @return {PickerColumns}
   */
  const pickerColumns = useMemo<PickerColumns>(() => {
    return Object.keys(props.config).map((column) => {
      switch (column) {
        case 'year':
          return {
            type: 'year',
            value: pickerData.getYears({
              min: minYear,
              max: maxYear,
            }),
          };
        case 'month':
          return {
            type: 'month',
            value: pickerData.getMonths(),
          };
        case 'day':
          return {
            type: 'day',
            value: pickerData.getDays(daysInMonth),
          };
        case 'hour':
          return {
            type: 'hour',
            value: pickerData.getHours(),
          };
        case 'minute':
          return {
            type: 'minute',
            value: pickerData.getMinutes(),
          };
        case 'second':
          return {
            type: 'second',
            value: pickerData.getSeconds(),
          };
        default:
          throw TypeError(
            `[PersianMobileDatePicker] ${column}'s type is not valid. Columns types should be one of [year, month, day]`,
          );
      }
    }) as PickerColumns;
  }, [props.config, daysInMonth, minYear, maxYear]);
  /**
   * Prepare the default value of DatePicker when the Developer has not passed a defaultValue
   */
  useLayoutEffect(() => {
    if (
      pickerColumns.length &&
      isObjectEmpty(selectedDate) &&
      isObjectEmpty(props.defaultValue!)
    ) {
      const defaultDate = {};
      pickerColumns.forEach((column) => {
        defaultDate[column.type] = column.value[0].value;
      });
      setSelectedDate(defaultDate);
    }
  }, [pickerColumns, selectedDate, props.defaultValue]);

  /**
   * Picker onChange event which includes every columns' selected value
   *
   * @param { Array<string>} value date
   * @returns {void}
   */
  function onChange(value: Array<string>) {
    const convertSelectedDate = convertSelectedDateToObject(value);

    setSelectedDate(convertSelectedDate);
    props.onChange?.(convertSelectedDate);
  }

  return (
    <React.Fragment>
      <MultiPicker
        selectedValue={defaultPickerValues}
        className={prefix('multi-picker')}
        onValueChange={onChange}
      >
        {(pickerColumns || []).map((column, index) => {
          return (
            <Picker
              key={`${index}`}
              indicatorClassName={prefix(
                `indicator ${prefix(`${column.type}-column`)}`,
              )}
            >
              {filterAllowedColumnRows(column.value, column.type).map(
                (pickerItem) => {
                  return (
                    <Picker.Item
                      key={`${pickerItem.type}_${pickerItem.value}`}
                      className={`${prefix(
                        'view-item',
                      )} ${handlePickerItemClassNames(pickerItem)}`}
                      value={`${pickerItem.type}-${pickerItem.value}`}
                    >
                      {handlePickerItemTextContent(pickerItem)}
                    </Picker.Item>
                  );
                },
              )}
            </Picker>
          );
        })}
      </MultiPicker>
      <GlobalStyle />
    </React.Fragment>
  );
};

WheelPicker.defaultProps = {
  startYear: 30, // past 30 years
  endYear: 30, // next 30 years
};
