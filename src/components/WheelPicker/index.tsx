import React, { useState } from 'react';
// Global Components
import Picker from 'rmc-picker/es/Picker';
import MultiPicker from 'rmc-picker/es/MultiPicker';
// Styles
import { GlobalStyle } from './styles';
// Helpers
import {
  convertSelectedDateToAnArray,
  convertSelectedDateToObject,
  prefixClassName,
} from '../../helpers';
import { jallaliMonthMap, pickerData } from '../../helpers/date';
// Hooks
// import { usePrevious } from '../../hooks/previous';
// Types
import type {
  PickerColumns,
  PickerItemModel,
  PickerSelectedDateValue,
  WheelPickerProps,
} from './index.types';
import { DateConfig, PickerSelectedDate } from './index.types';

export const WheelPicker: React.FC<WheelPickerProps> = (props) => {
  // Local States
  const [daysInMonth] = useState<number>(29);
  // const [, setCurrentDaysInMonth] = useState<number>(30);
  const [selectedDate, setSelectedDate] = useState<PickerSelectedDate>({});
  // Hooks
  // const previousSelectedDate = usePrevious<PickerSelectedDate>(
  //   defaultSelectedValue,
  // );
  // Local Variables
  // const memoizeDaysInMonths = new Map<string, number>();
  console.log('selectedDate', selectedDate);
  /**
   * Picker CSS classnames prefix name
   */
  const prefix = prefixClassName(props.prefix!);
  // Memo list
  /**
   * Default Picker selected columns value which goes from the parent to local changes
   */
  const defaultPickerValues = React.useMemo<Array<PickerItemModel>>(() => {
    return convertSelectedDateToAnArray(props.defaultValue || selectedDate);
  }, [props.defaultValue, selectedDate]);
  console.log('defaultPickerValues', defaultPickerValues);
  /**
   * Generate Picker's columns with their values
   *
   * @category watchers
   * @return {PickerColumns}
   */
  const pickerColumns = React.useMemo<PickerColumns>(() => {
    return Object.keys(props.config).map((column) => {
      switch (column) {
        case 'jyear':
          return {
            type: 'year',
            value: pickerData.getJallaliYears(),
          };
        case 'jmonth':
          return {
            type: 'month',
            value: pickerData.getJallaliMonths(),
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
          throw Error('unknown type');
      }
    }) as PickerColumns;
  }, [props.config, pickerData, daysInMonth]);
  // Local Watchers
  // Calculate days in selected months
  // React.useEffect(() => {
  //   const $defaultSelectedValue = [...defaultSelectedValue];
  //   if (
  //     !isLeapJalaaliYear(Number($defaultSelectedValue[0].value)) &&
  //     $defaultSelectedValue[1].value === 12 &&
  //     ($defaultSelectedValue[2].value as JalaliMonth)?.value === 30
  //   ) {
  //     $defaultSelectedValue[2].value = 29;
  //   }
  //   const currentDate = `${$defaultSelectedValue.join('/')}`;
  //
  //   if (
  //     !memoizeDaysInMonths.has(currentDate) &&
  //     isValidJalaaliDate(
  //       Number(selectedYear.value),
  //       Number(selectedMonth.value),
  //       Number($defaultSelectedValue[2].value),
  //     )
  //   ) {
  //     memoizeDaysInMonths.set(
  //       currentDate,
  //       daysInMonth(Number(selectedYear.value), Number(selectedMonth.value)),
  //     );
  //   }
  //
  //   if (
  //     previousSelectedDate?.[1] !== selectedMonth ||
  //     previousSelectedDate?.[0] !== selectedYear
  //   ) {
  //     const daysInMonthNo = memoizeDaysInMonths.get(currentDate);
  //     const $daysList = createAnArrayOfNumbers(daysInMonthNo!);
  //     setCurrentDaysInMonth(daysInMonthNo!);
  //     setDaysList($daysList);
  //   }
  // }, [defaultSelectedValue]);
  /**
   * Date picker columns config
   *
   * @returns {DateConfig}
   */
  const configs = React.useMemo(() => {
    const result = { ...props.config } as Required<DateConfig>;
    if (result.jmonth && !result.jmonth.formatter) {
      result.jmonth.formatter = (value) => jallaliMonthMap[value];
    }

    return result;
  }, [props.config]);
  console.log('configs', configs);
  console.log('columns', pickerColumns);
  // Handlers
  /**
   * Picker items' text content
   *
   * @param {PickerItemModel} pickerItem
   * @returns {PickerSelectedDateValue} columns text content
   */
  function handlePickerItemTextContent(
    pickerItem: PickerItemModel,
  ): PickerSelectedDateValue {
    return (
      configs[pickerItem.type]?.formatter?.(pickerItem.value) ??
      pickerItem.value
    );
  }

  function handlePickerItemClassNames(pickerItem: PickerItemModel): string {
    const classNamesFormatter = configs[pickerItem.type]?.classname;
    if (classNamesFormatter) {
      const classNames = classNamesFormatter(pickerItem.value);

      return Array.isArray(classNames) ? classNames.join(' ') : classNames;
    }

    return '';
  }

  /**
   * Picker onChange event which includes every columns' selected value
   *
   * @param {Array<PickerItemModel>} value
   * @returns {undefined}
   */
  function onChange(value: Array<PickerItemModel>) {
    console.log(
      'onChange selected value',
      value,
      convertSelectedDateToObject(value),
    );
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
              {column.value.map((pickerItem) => {
                return (
                  <Picker.Item
                    key={`${pickerItem.type}_${pickerItem.value}`}
                    className={`${prefix(
                      'view-item',
                    )} ${handlePickerItemClassNames(pickerItem)}`}
                    value={pickerItem}
                  >
                    {handlePickerItemTextContent(pickerItem)}
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
  minDay: 1,
  maxDay: 31,
  minMonth: 1,
  maxMonth: 12,
  minYear: 1300,
  maxYear: 1500,
};
