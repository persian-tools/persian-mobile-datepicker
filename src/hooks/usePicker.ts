import React from 'react';
import {
  convertDateToObject,
  convertObjectToDate,
  currentDateObject,
  daysInMonth as calculateDaysInMonth,
  getCurrentYear,
  getWeekDay,
  isAfter,
  isBefore,
  isEqual,
  isLeapYear,
  isValid,
  isWeekend,
  jalaliMonths,
  weekDays,
} from '../helpers/date';
import {
  convertSelectedDateToAnArray,
  isObjectEmpty,
  prefixClassName,
  toPositive,
} from '../helpers';
// Hooks
import { useState } from 'react';
import { usePrevious } from './usePrevious';
// Types
import type {
  DateConfig,
  DateConfigTypes,
  PickerExtraDateInfo,
  PickerDateModel,
  PickerItemModel,
  PickerSelectedDateValue,
  RequiredPickerDateModel,
  WheelPickerProps,
} from '../components/WheelPicker/index.types';

export function usePicker(props: WheelPickerProps) {
  /**
   * Date picker columns config
   *
   * @returns {Required<DateConfig>}
   */
  const configs = React.useMemo<Required<DateConfig>>(() => {
    const config = { ...props.config } as Required<DateConfig>;
    if (config.month && !config.month.formatter) {
      config.month.formatter = (value) => jalaliMonths[value];
    }

    return config;
  }, [props.config]);

  /**
   * Picker CSS classnames prefix name
   */
  const prefix = prefixClassName(props.prefix!);

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
    const startYear = Number(props.startYear);

    let year: number;
    if (isMinDateValid) {
      year = minDateObject.year;
    } else if (isDefaultValueValid) {
      year = defaultValueDateObject.year + startYear;
    } else {
      year = currentYear + startYear;
    }

    return toPositive(currentYear - year);
  }, [
    isMinDateValid,
    minDateObject,
    isDefaultValueValid,
    defaultValueDateObject,
    props.startYear,
  ]);
  /**
   * * Get Max Year of the [Year Column] which should be rendered
   *
   * @type {number}
   */
  const maxYear = React.useMemo<number>(() => {
    const currentYear = getCurrentYear();
    const endYear = Number(props.endYear);

    let year: number;
    if (isMinDateValid) {
      year = maxDateObject.year;
    } else if (isDefaultValueValid) {
      year = defaultValueDateObject.year + endYear;
    } else {
      year = currentYear + endYear;
    }

    return toPositive(currentYear - year);
  }, [
    isMinDateValid,
    maxDateObject,
    defaultValueDateObject,
    props.endYear,
    isDefaultValueValid,
  ]);

  /**
   * Get default selected date by [MinDate], [MaxDate], [DefaultValue] or current date
   *
   * @type {PickerDateModel}
   */
  const defaultSelectedDate = React.useMemo<PickerDateModel>(() => {
    if (isDefaultValueValid) {
      const defaultSelectedDateObject = convertDateToObject(
        props.defaultValue!,
      );
      // Check if defaultValue has overlap with shouldRender which passed by config prop.
      if (
        configShouldRender(defaultSelectedDateObject, 'year') &&
        configShouldRender(defaultSelectedDateObject, 'month') &&
        configShouldRender(defaultSelectedDateObject, 'day')
      ) {
        return defaultSelectedDateObject;
      } else {
        // TODO: should be refactored and check currentDate if it is in range of min and max dates, if it was, it should be the default value
        return currentDateObject();
      }
    }
    if (isMinDateValid) {
      return minDateObject;
    } else if (isMaxDateValid) {
      return maxDateObject;
    }

    return currentDateObject();
  }, [
    isMinDateValid,
    maxDateObject,
    minDateObject,
    isMaxDateValid,
    props.defaultValue,
    isDefaultValueValid,
  ]);

  // Local States
  const [daysInMonth, setDaysInMonth] = useState<number>(29);
  const [selectedDate, setSelectedDate] =
    useState<PickerDateModel>(defaultSelectedDate);
  // Hooks
  const previousSelectedDate = usePrevious<PickerDateModel>(selectedDate);

  // Watchers
  /**
   * Derived Selected Date from Prop's defaultValue
   */
  React.useEffect(() => {
    if (isValid(props.defaultValue!)) {
      setSelectedDate(convertDateToObject(props.defaultValue!));
    }
  }, [props.defaultValue]);

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
   * Default Picker selected columns value which goes from the parent to local changes
   */
  const defaultPickerValues = React.useMemo<Array<string>>(() => {
    return convertSelectedDateToAnArray(
      (isObjectEmpty(selectedDate)
        ? convertDateToObject(props.defaultValue!)
        : selectedDate)!,
    );
  }, [props.defaultValue, selectedDate]);

  // Handlers
  /**
   * Check if entered Year is in Range of Min and Max
   *
   * @param {number} value
   * @returns {boolean}
   */
  function shouldRenderYear(value: number): boolean {
    // Call the Config's shouldRender method to find that we should render this item or not
    // User can prevent rendering specific year or a list of years in Picker's Year column
    if (!configShouldRender(selectedDate, 'year', value)) return false;

    if (isMinDateValid && isMaxDateValid) {
      return value >= minDateObject.year && value <= maxDateObject.year;
    } else if (isMaxDateValid) {
      return value <= maxDateObject.year;
    } else if (isMinDateValid) {
      return value >= minDateObject.year;
    }

    return true;
  }

  function configShouldRender(
    currentSelectedDate: PickerDateModel,
    key: DateConfigTypes,
    value?: PickerSelectedDateValue,
  ) {
    return (
      configs?.[key]?.shouldRender?.(
        extraDateInfo(currentSelectedDate, {
          type: key,
          value: value ?? currentSelectedDate[key]!,
        }),
      ) ?? true
    );
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

    // Call the Config's shouldRender method to find that we should render this item or not
    // User can prevent rendering the weekend's holidays in Date Picker
    if (!configShouldRender($date, key, value)) return false;

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

    if (isMinDateValid && isMaxDateValid) {
      // Date should be in range of min and max dates
      return (
        isAfter(selectedDateValue, props.minDate!) &&
        isBefore(selectedDateValue, props.maxDate!)
      );
    } else if (isMinDateValid) {
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

  // Picker Config's Formatters
  /**
   * Format the Picker items' text content
   *
   * @param {PickerItemModel} pickerItem
   * @returns {PickerSelectedDateValue | string} columns text content
   */
  function pickerItemTextFormatter(
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
      const dateValues = extraDateInfo(selectedDate, pickerItem);
      // Pass to the classname config's formatter
      const classNames = classNamesFormatter(dateValues);
      const classNameString = Array.isArray(classNames)
        ? classNames.join(' ')
        : classNames;
      // Only add weekend className for the Day items
      const highlightWeekendClassNameString =
        pickerItem.type === 'day'
          ? // Check result safely
            highlightWeekendClassName(pickerItem.value) ?? ''
          : '';

      return [classNameString, highlightWeekendClassNameString]
        .filter(Boolean)
        .join(' ');
    } else if (props.highlightWeekends && pickerItem.type === 'day') {
      return highlightWeekendClassName(pickerItem.value) ?? '';
    }

    return '';
  }

  function highlightWeekendClassName(day: number): string {
    const determineDayOfWeek = isWeekend(
      selectedDate.year!,
      selectedDate.month!,
      day,
    );

    return determineDayOfWeek ? prefix('weekend') : '';
  }

  // Utilities
  /**
   * Find WeekDay and WeekName by a selected date and add to the Date object
   *
   * @param {PickerDateModel} currentSelectedDate
   * @param {PickerItemModel} pickerItem
   * @return {PickerExtraDateInfo}
   */
  function extraDateInfo(
    currentSelectedDate: PickerDateModel,
    pickerItem: PickerItemModel,
  ): PickerExtraDateInfo {
    const targetSelectedDate: PickerExtraDateInfo = {
      ...currentSelectedDate,
      [pickerItem.type]: pickerItem.value,
    };
    // Add Month text if the Picker type is month, just for Month's config object
    targetSelectedDate.monthText = jalaliMonths[targetSelectedDate.month!];
    // Check if year is leap year and if it was true just for Year's config object
    targetSelectedDate.isLeapYear = isLeapYear(targetSelectedDate.year!);

    const determineDayOfWeek = getWeekDay(
      targetSelectedDate.year!,
      targetSelectedDate.month!,
      targetSelectedDate.day!,
    );
    if (determineDayOfWeek >= 0) {
      targetSelectedDate.weekDay = determineDayOfWeek;
      targetSelectedDate.weekDayText = weekDays[determineDayOfWeek];
    }

    return targetSelectedDate;
  }

  return {
    prefix,

    daysInMonth,
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
    handlePickerItemTextContent: pickerItemTextFormatter,
    handlePickerItemClassNames,
  };
}
