import {
  DateConfig,
  DateConfigTypes,
  PickerClassNameFormatter,
  PickerDateModel,
  PickerItemModel,
  PickerSelectedDateValue,
  RequiredPickerDateModel,
  WheelPickerProps,
} from '../components/WheelPicker/index.types';
import React, { useState } from 'react';
import {
  convertDateToObject,
  convertObjectToDate,
  currentDateObject,
  getCurrentYear,
  getWeekDay,
  getWeekDayName,
  isAfter,
  isBefore,
  isEqual,
  isValid,
  jalaliMonths,
} from '../helpers/date';
import {
  convertSelectedDateToAnArray,
  isObjectEmpty,
  toPositive,
} from '../helpers';

export function usePicker(props: WheelPickerProps) {
  /**
   * * Parse and convert [minDate] to an object
   *
   * @type {RequiredPickerDateModel}
   */
  const minDateObject = React.useMemo<RequiredPickerDateModel>(
    () => convertDateToObject(props.minDate!),
    [props.minDate],
  );
  /**
   * * Parse and convert [maxDate] to an object
   *
   * @type {RequiredPickerDateModel}
   */
  const maxDateObject = React.useMemo<RequiredPickerDateModel>(
    () => convertDateToObject(props.maxDate!),
    [props.maxDate],
  );
  /**
   * * Check if the [Min Date] is valid and has filled
   *
   * @type {boolean}
   */
  const isMinDateValid = isValid(props.minDate!);
  /**
   * * Check if the [Max Date] is valid and has filled
   *
   * @type {boolean}
   */
  const isMaxDateValid = isValid(props.maxDate!);

  /**
   * * Parse and convert the [defaultValue] that filled as a prop to an Object
   *
   * @type {RequiredPickerDateModel}
   */
  const defaultValueDateObject = React.useMemo<RequiredPickerDateModel>(
    () => convertDateToObject(props.defaultValue!),
    [props.defaultValue],
  );
  /**
   * Check if the Default Value Date is valid and has filled
   *
   * @type {boolean}
   */
  const isDefaultValueValid = isValid(props.defaultValue!);

  /**
   * Get Min Year of the Year Column which should be rendered
   *
   * @type {number}
   */
  const minYear = React.useMemo<number>(() => {
    const currentYear = getCurrentYear();

    let year: number = currentYear;
    if (isMinDateValid) {
      year = minDateObject.year;
    } else if (isDefaultValueValid) {
      year = defaultValueDateObject.year;
    } else if (Number(props.minDecade)) {
      year = currentYear + Number(props.minDecade);
    }

    return toPositive(currentYear - year);
  }, [minDateObject, defaultValueDateObject, props.minDecade]);

  /**
   * * Get Max Year of the [Year Column] which should be rendered
   *
   * @type {number}
   */
  const maxYear = React.useMemo<number>(() => {
    const currentYear = getCurrentYear();

    let year: number = currentYear;
    if (isMinDateValid) {
      year = maxDateObject.year;
    } else if (isDefaultValueValid) {
      year = defaultValueDateObject.year;
    } else if (Number(props.maxDecade)) {
      year = currentYear + Number(props.maxDecade);
    }

    return toPositive(currentYear - year);
  }, [
    maxDateObject,
    defaultValueDateObject,
    props.maxDecade,
    isDefaultValueValid,
  ]);

  const defaultSelectedDate = React.useMemo<PickerDateModel>(() => {
    if (isDefaultValueValid) {
      return convertDateToObject(props.defaultValue!);
    } else if (isMaxDateValid) {
      return maxDateObject;
    } else if (isMinDateValid) {
      return minDateObject;
    }

    return currentDateObject();
  }, [isMinDateValid, isMaxDateValid, isDefaultValueValid]);

  // Local States
  const [selectedDate, setSelectedDate] =
    useState<PickerDateModel>(defaultSelectedDate);

  /**
   * Default Picker selected columns value which goes from the parent to local changes
   */
  const defaultPickerValues = React.useMemo<Array<string>>(() => {
    return convertSelectedDateToAnArray(
      (isObjectEmpty(selectedDate)
        ? convertDateToObject(props.defaultValue!)
        : selectedDate)!,
    );
  }, [props.defaultValue, selectedDate]);
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

  // Functions
  /**
   * Check if entered Year is in Range of Min and Max
   *
   * @param {number} year
   * @returns {boolean}
   */
  function shouldRenderYear(year: number): boolean {
    if (isMaxDateValid && isMaxDateValid) {
      return year >= minDateObject.year && year <= maxDateObject.year;
    } else if (isMaxDateValid) {
      return year <= maxDateObject.year;
    } else if (isMaxDateValid) {
      return year >= minDateObject.year;
    }

    return true;
  }

  /**
   * * Check if the Month or Day Column's item should be rendered or not
   *
   * @param {DateConfigTypes} key
   * @param {PickerSelectedDateValue} value
   * @returns {boolean}
   */
  function shouldRender(
    key: DateConfigTypes,
    value: PickerSelectedDateValue,
  ): boolean {
    // Create new Date object and clone the SelectedDate and assign the entered day to the Object
    const $date = { ...selectedDate, [key]: value };
    // Convert to a Date instance
    const selectedDateValue = convertObjectToDate($date);

    // Date is not valid
    if (!isValid(selectedDateValue)) return true;

    // Selected Date is equals to the Min or Max Date
    if (
      isEqual(props.minDate!, selectedDateValue) ||
      isEqual(props.maxDate!, selectedDateValue)
    )
      return true;

    if (isMaxDateValid && isMaxDateValid) {
      return (
        isAfter(selectedDateValue, props.minDate!) &&
        isBefore(selectedDateValue, props.maxDate!)
      );
    } else if (isMaxDateValid) {
      return isAfter(selectedDateValue, props.minDate!);
    } else if (isMaxDateValid) {
      return isBefore(selectedDateValue, props.maxDate!);
    }

    return true;
  }

  /**
   * * Filter all Columns values and only return the Column's items which should be displayed
   *
   * @param {Array<PickerItemModel>} pickerList list of Column's items
   * @param {DateConfigTypes} type type of column
   * @returns {Array<PickerItemModel>} new list of Column's items which should be displayed in the DatePicker
   */
  function filterAllowedColumnRows(
    pickerList: Array<PickerItemModel>,
    type: DateConfigTypes,
  ): Array<PickerItemModel> {
    return pickerList.filter((pickerItem) => {
      // Check if Day or Month is in Range
      if (
        (type === 'day' || type === 'month') &&
        !shouldRender(pickerItem.type, pickerItem.value)
      ) {
        return false;
        // Check if Month is in Range
      } else if (type === 'year' && !shouldRenderYear(pickerItem.value)) {
        return false;
      }

      return true;
    });
  }

  /**
   * Picker items' text content
   *
   * @param {PickerItemModel} pickerItem
   * @returns {PickerSelectedDateValue} columns text content
   */
  function handlePickerItemTextContent(
    pickerItem: PickerItemModel,
  ): PickerSelectedDateValue | string {
    return (
      configs[pickerItem.type]?.formatter?.(pickerItem.value) ??
      pickerItem.value
    );
  }

  /**
   * Handle every single of columns' row Classname by their type and value
   *
   * @param {PickerItemModel} pickerItem
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

  return {
    selectedDate,
    setSelectedDate,

    defaultSelectedDate,
    maxYear,
    minYear,
    minDateObject,
    maxDateObject,
    isMinDateValid,
    isMaxDateValid,

    defaultValueDateObject,
    isDefaultValueValid,
    defaultPickerValues,

    // Functions
    shouldRenderYear,
    shouldRender,
    filterAllowedColumnRows,
    handlePickerItemTextContent,
    handlePickerItemClassNames,
  };
}
