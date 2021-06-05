import React, { useState } from 'react';
// Global Components
import Picker from 'rmc-picker/es/Picker';
import MultiPicker from 'rmc-picker/es/MultiPicker';
// Styles
import { GlobalStyle } from './styles';
// Helpers
import {
  convertSelectedDateToObject,
  isObjectEmpty,
  prefixClassName,
} from '../../helpers';
import {
  convertDateToObject,
  daysInMonth as calculateDaysInMonth,
  isValid,
  pickerData,
} from '../../helpers/date';
// Hooks
import { usePrevious } from '../../hooks/previous';
// Types
import type {
  PickerColumns,
  PickerDateModel,
  WheelPickerProps,
} from './index.types';
import { usePicker } from '../../hooks/usePicker';

export const WheelPicker: React.FC<WheelPickerProps> = (props) => {
  const {
    selectedDate,
    setSelectedDate,
    defaultPickerValues,

    maxYear,
    minYear,

    filterAllowedColumnRows,
    handlePickerItemTextContent,
    handlePickerItemClassNames,
  } = usePicker(props);
  // Local States
  const [daysInMonth, setDaysInMonth] = useState<number>(29);

  // Hooks
  const previousSelectedDate = usePrevious<PickerDateModel>(selectedDate);
  // Local Variables
  /**
   * Picker CSS classnames prefix name
   */
  const prefix = prefixClassName(props.prefix!);

  // Memo list
  /**
   * Generate Picker's columns with their values
   *
   * @category watchers
   * @return {PickerColumns}
   */
  const pickerColumns = React.useMemo<PickerColumns>(() => {
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
  React.useLayoutEffect(() => {
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
   * * Local Watchers
   */
  // Calculate days in selected months
  React.useEffect(() => {
    if (!isObjectEmpty(selectedDate)) {
      if (
        previousSelectedDate?.month !== selectedDate?.month ||
        previousSelectedDate?.year !== selectedDate?.year
      ) {
        setDaysInMonth(
          calculateDaysInMonth(
            Number(selectedDate.year),
            Number(selectedDate.month),
          ),
        );
      }
    }
  }, [selectedDate, previousSelectedDate?.year, previousSelectedDate?.month]);
  /**
   * Derived Selected Date from Prop's defaultValue
   */
  React.useEffect(() => {
    if (isValid(props.defaultValue!)) {
      setSelectedDate(convertDateToObject(props.defaultValue!));
    }
  }, [props.defaultValue]);

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
  minDecade: 30, // past 30 years
  maxDecade: 30, // next 30 years
};
