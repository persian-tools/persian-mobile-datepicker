import React, { useState } from 'react';
// Global Components
import Picker from 'rmc-picker/es/Picker';
import MultiPicker from 'rmc-picker/es/MultiPicker';
// Styles
import { GlobalStyle } from './styles';
// Helpers
import {
  daysInMonth,
  isValidJalaaliDate,
  jalaliMonths,
} from '../../helpers/date';
import {
  columnName,
  createAnArrayOfNumbers,
  prefixClassName,
} from '../../helpers';
// Types
import type { JalaliMonth } from '../../helpers/date';
import type { PickerMultipleColumns, WheelPickerProps } from './index.types';
import { usePrevious } from '../../hooks/previous';
import { isLeapJalaaliYear } from 'jalaali-js';

export const WheelPicker: React.FC<WheelPickerProps> = (props) => {
  // Local States
  const [daysList, setDaysList] = useState<number[]>(
    createAnArrayOfNumbers(30),
  );
  const [, setCurrentDaysInMonth] = useState<number>(30);
  const [selectedDate, setSelectedDate] = useState<number[]>([1399, 12, 10]);
  // Hooks
  const previousSelectedDate = usePrevious<number[]>(selectedDate);
  // Local Variables
  const memoizeDaysInMonths = new Map<string, number>();
  const [selectedYear = 0, selectedMonth = 0] = selectedDate;
  // Local Watchers
  // Calculate days in selected months
  React.useEffect(() => {
    const $selectedDate = [...selectedDate];
    if (
      !isLeapJalaaliYear($selectedDate[0]) &&
      $selectedDate[1] == 12 &&
      $selectedDate[2] == 30
    ) {
      $selectedDate[2] = 29;
    }
    const currentDate = `${$selectedDate.join('/')}`;

    if (
      !memoizeDaysInMonths.has(currentDate) &&
      isValidJalaaliDate(selectedYear, selectedMonth, $selectedDate[2])
    ) {
      memoizeDaysInMonths.set(
        currentDate,
        daysInMonth(selectedYear, selectedMonth),
      );
    }

    if (
      previousSelectedDate?.[1] != selectedMonth ||
      previousSelectedDate?.[0] != selectedYear
    ) {
      const daysInMonthNo = memoizeDaysInMonths.get(currentDate);
      const $daysList = createAnArrayOfNumbers(daysInMonthNo!);
      setCurrentDaysInMonth(daysInMonthNo!);
      setDaysList($daysList);
    }
  }, [selectedDate]);

  const prefix = prefixClassName(props.prefix!);
  const pickerColumns: PickerMultipleColumns = [
    [
      1395,
      1396,
      1397,
      1398,
      1399,
      1400,
      1401,
      1402,
      1403,
      1405,
      1406,
      1407,
      1408,
      1409,
      1410,
    ],
    jalaliMonths,
    daysList,
  ];

  function onChange(value: Array<number>) {
    console.log('onChange selected value', value);
    setSelectedDate(value);
  }
  return (
    <React.Fragment>
      <MultiPicker selectedValue={selectedDate} onValueChange={onChange}>
        {pickerColumns.map((column, index) => {
          const columnType = columnName(index + 1);
          return (
            <Picker
              key={`${index}`}
              indicatorClassName={prefix(
                `indicator ${prefix(`${columnType}-column`)}`,
              )}
            >
              {column.map((columnValues, columnValuesIndex) => {
                // Picker item value and raise this value when selected
                const value =
                  columnType === 'month'
                    ? (columnValues as JalaliMonth).value
                    : columnValues;
                // Picker Item text content
                const textContent =
                  columnType === 'month'
                    ? (columnValues as JalaliMonth).text
                    : columnValues;

                return (
                  <Picker.Item
                    key={`${columnValuesIndex}`}
                    className={prefix('view-item')}
                    value={value}
                  >
                    {textContent}
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
