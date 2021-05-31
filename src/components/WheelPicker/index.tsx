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
  isObjectEmpty,
  prefixClassName,
} from '../../helpers';
import {
  isValidDate,
  jalaliMonths,
  pickerData,
  daysInMonth as calculateDaysInMonth,
  getWeekDay,
  getWeekDayName,
  convertDateToObject,
  convertObjectToDate,
  isValid,
  isAfter,
  isBefore,
} from '../../helpers/date';
// Hooks
import { usePrevious } from '../../hooks/previous';
// Types
import type {
  PickerColumns,
  PickerItemModel,
  PickerSelectedDateValue,
  WheelPickerProps,
  DateConfig,
  PickerDateModel,
  DateConfigTypes,
  PickerClassNameFormatter,
} from './index.types';

export const WheelPicker: React.FC<WheelPickerProps> = (props) => {
  // Local States
  const [daysInMonth, setDaysInMonth] = useState<number>(29);
  const [selectedDate, setSelectedDate] = useState<PickerDateModel>({});
  // Hooks
  const previousSelectedDate = usePrevious<PickerDateModel>(selectedDate);
  // Local Variables
  /**
   * Picker CSS classnames prefix name
   */
  const prefix = prefixClassName(props.prefix!);
  // Memo list

  /**
   * Default Picker selected columns value which goes from the parent to local changes
   */
  const defaultPickerValues = React.useMemo<Array<string>>(() => {
    return convertSelectedDateToAnArray(
      (isObjectEmpty(selectedDate) ? props.defaultValue : selectedDate)!,
    );
  }, [props.defaultValue, selectedDate]);
  /**
   * parse and convert [minDate] to an object
   *
   * @type {Required<PickerDateModel>}
   */
  const minDateObject = React.useMemo(
    () => convertDateToObject(props.minDate!),
    [props.minDate],
  );
  console.log('minDateObject', minDateObject);
  /**
   * parse and convert [maxDate] to an object
   *
   * @type {Required<PickerDateModel>}
   */
  const maxDateObject = React.useMemo(
    () => convertDateToObject(props.maxDate!),
    [props.minDate],
  );
  console.log('maxDateObject', maxDateObject);
  /**
   * Generate Picker's columns with their values
   *
   * @category watchers
   * @return {PickerColumns}
   */
  const pickerColumns = React.useMemo<PickerColumns>(() => {
    let columns = Object.keys(props.config).map((column) => {
      switch (column) {
        case 'year':
          return {
            type: 'year',
            value: pickerData.getYears({
              min: 10,
              max: 10,
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
          throw Error('unknown type');
      }
    }) as PickerColumns;

    return columns;
  }, [props.config, pickerData, daysInMonth]);
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
  }, [pickerColumns, selectedDate]);
  /**
   * * Local Watchers
   */
  // Calculate days in selected months
  React.useEffect(() => {
    if (!isObjectEmpty(selectedDate)) {
      if (
        previousSelectedDate.month !== selectedDate.month ||
        previousSelectedDate.year !== selectedDate.year
      ) {
        setDaysInMonth(
          calculateDaysInMonth(
            Number(selectedDate.year),
            Number(selectedDate.month),
          ),
        );
      }
    }
  }, [selectedDate]);
  /**
   * Derived Selected Date from Prop's defaultValue
   */
  React.useEffect(() => {
    if (
      isValidDate(
        Number(props.defaultValue?.year),
        Number(props.defaultValue?.month),
        Number(props.defaultValue?.day),
      )
    ) {
      setSelectedDate(props.defaultValue!);
    }
  }, [props.defaultValue]);
  /**
   * Date picker columns config
   *
   * @returns {DateConfig}
   */
  const configs = React.useMemo(() => {
    const result = { ...props.config } as Required<DateConfig>;
    if (result.month && !result.month.formatter) {
      result.month.formatter = (value) => jalaliMonths[value];
    }

    return result;
  }, [props.config]);
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
  /**
   * Handle every single of columns' row Classname by their type and value
   *
   * @param pickerItem
   * @returns {string}
   */
  function handlePickerItemClassNames(pickerItem: PickerItemModel): string {
    const classNamesFormatter = configs[pickerItem.type]?.classname;
    if (classNamesFormatter) {
      const targetSelectedDate: PickerClassNameFormatter = { ...selectedDate };
      targetSelectedDate[pickerItem.type] = pickerItem.value;
      const weekDay = getWeekDay(
        targetSelectedDate.year as number,
        targetSelectedDate.month as number,
        targetSelectedDate.day as number,
      );
      if (weekDay >= 0) {
        targetSelectedDate.weekDay = weekDay;
        targetSelectedDate.weekDayName = getWeekDayName(
          targetSelectedDate.year as number,
          targetSelectedDate.month as number,
          targetSelectedDate.day as number,
        );
      }

      // Pass to the classname config's formatter
      const classNames = classNamesFormatter(targetSelectedDate);

      return Array.isArray(classNames) ? classNames.join(' ') : classNames;
    }

    return '';
  }

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

  /**
   * Allow to render the Column's row if [min] and [max] is passed.
   *
   * @param {DateConfigTypes} rowType
   * @param {PickerSelectedDateValue} rowValue
   * @returns {boolean}
   */
  const shouldRenderColumnRow = React.useCallback<
    (rowType: DateConfigTypes, rowValue: PickerSelectedDateValue) => boolean
  >(
    (rowType, rowValue) => {
      const $selectedDateObject = { ...selectedDate };
      $selectedDateObject[rowType] = rowValue;
      const $selectedDate = convertObjectToDate($selectedDateObject);
      console.log(
        '$selectedDateObject',
        $selectedDateObject,
        'isValid',
        isValid($selectedDate),
      );
      if (!isValid($selectedDate)) return true;

      if (!isObjectEmpty(minDateObject) && !isObjectEmpty(maxDateObject)) {
        if (rowType === 'year') {
          return (
            rowValue >= (minDateObject[rowType] || rowValue) &&
            rowValue <= (maxDateObject[rowType] || rowValue)
          );
        }

        return (
          isAfter(props.minDate!, $selectedDate) &&
          isBefore(props.maxDate!, $selectedDate)
        );
      } else if (!isObjectEmpty(minDateObject)) {
        return isAfter(props.minDate!, $selectedDate);
      } else if (!isObjectEmpty(maxDateObject)) {
        return isBefore(props.maxDate!, $selectedDate);
      }

      return true;
    },
    [selectedDate, props.minDate, props.maxDate],
  );

  console.log('selectedDate', selectedDate);
  console.log('pickerColumns', pickerColumns);

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
                  shouldRenderColumnRow(pickerItem.type, pickerItem.value) && (
                    <Picker.Item
                      key={`${pickerItem.type}_${pickerItem.value}`}
                      className={`${prefix(
                        'view-item',
                      )} ${handlePickerItemClassNames(pickerItem)}`}
                      value={`${pickerItem.type}-${pickerItem.value}`}
                    >
                      {handlePickerItemTextContent(pickerItem)}
                    </Picker.Item>
                  )
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
  defaultValue: {
    year: 1399,
    month: 12,
    day: 29,
  },
};
