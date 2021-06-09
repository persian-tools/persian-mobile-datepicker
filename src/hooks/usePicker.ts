import { useState, useRef, useMemo, useEffect } from 'react';

import {
  convertDateInstanceToDateObject,
  convertDateObjectToDateInstance,
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
  RequiredPickerExtraDateInfo,
} from '../components/WheelPicker/index.types';
import type { PickerColumnCaption } from '../components/WheelPicker/index.types';

export function usePicker(props: WheelPickerProps) {
  const selectedDateRef = useRef<PickerDateModel>();
  /**
   * Date picker columns config
   *
   * @return {Required<DateConfig>}
   * @private
   */
  const configs = useMemo<Required<DateConfig>>(() => {
    const config = { ...props.config } as Required<DateConfig>;
    if (config.month && !config.month.formatter) {
      config.month.formatter = (value) => jalaliMonths[value.month!];
    }

    return config;
  }, [props.config]);

  /**
   * Picker CSS classnames prefix name
   *
   * @type {(str: string) => string}
   * @private
   */
  const prefix = prefixClassName(props.prefix!);

  /**
   * * Check if the [Min Date] is valid and has filled
   *
   * @type {boolean}
   * @private
   */
  const isMinDateValid = isValid(props.minDate!);
  /**
   * * Parse and convert [minDate] to an object
   *
   * @type {RequiredPickerDateModel}
   */
  const minDateObject = useMemo<RequiredPickerDateModel>(
    () => convertDateInstanceToDateObject(props.minDate!),
    [props.minDate],
  );
  /**
   * * Parse and convert [maxDate] to an object
   *
   * @type {RequiredPickerDateModel}
   */
  const maxDateObject = useMemo<RequiredPickerDateModel>(
    () => convertDateInstanceToDateObject(props.maxDate!),
    [props.maxDate],
  );
  /**
   * * Check if the [Max Date] is valid and has filled
   *
   * @type {boolean}
   * @private
   */
  const isMaxDateValid = isValid(props.maxDate!);

  /**
   * * Parse and convert the [defaultValue] that filled as a prop to an Object
   *
   * @type {RequiredPickerDateModel}
   * @private
   */
  const defaultValueDateObject = useMemo<RequiredPickerDateModel>(
    () => convertDateInstanceToDateObject(props.defaultValue!),
    [props.defaultValue],
  );
  /**
   * Check if the Default Value Date is valid and has filled
   *
   * @type {boolean}
   * @private
   */
  const isDefaultValueValid = isValid(props.defaultValue!);

  /**
   * Get Min Year of the Year Column which should be rendered
   *
   * @type {number}
   * @private
   */
  const minYear = useMemo<number>(() => {
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
   * @private
   */
  const maxYear = useMemo<number>(() => {
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
   * @private
   */
  const defaultSelectedDateObject = useMemo<PickerDateModel>(() => {
    if (
      selectedDateRef.current &&
      isValid(convertDateObjectToDateInstance(selectedDateRef.current))
    ) {
      return selectedDateRef.current;
    }

    if (isDefaultValueValid) {
      const defaultSelectedDateObject = convertDateInstanceToDateObject(
        props.defaultValue!,
      );
      // Default value has no overlap with [minDate], [maxDate] and also can be rendered by the shouldRender in Component's Config prop
      if (
        shouldRenderItem(
          defaultSelectedDateObject,
          'month',
          defaultSelectedDateObject.month,
        ) &&
        shouldRenderItem(
          defaultSelectedDateObject,
          'day',
          defaultSelectedDateObject.day,
        ) &&
        shouldRenderYearItem(
          defaultSelectedDateObject,
          defaultSelectedDateObject.year,
        ) &&
        configShouldRender(defaultSelectedDateObject, 'year') &&
        configShouldRender(defaultSelectedDateObject, 'month') &&
        configShouldRender(defaultSelectedDateObject, 'day')
      ) {
        return defaultSelectedDateObject;
      }
    }

    const currentDate = new Date();
    const currentDateAsObject = currentDateObject();

    if (isMinDateValid) {
      // We goes here if `maxDate` or `defaultValue` is not valid as valid date
      // Check if the `Current Date` is bigger than or Equals the `Min Date`, if was true, consider the `Current Date` as `defaultValue`
      if (
        isAfter(currentDate, props.minDate!) ||
        isEqual(currentDate, props.minDate!)
      ) {
        return currentDateAsObject;
      }

      return minDateObject;
    } else if (isMaxDateValid) {
      // We goes here if `defaultValue` is not valid as valid date
      // Check if the `Current Date` is less than or Equals the `maxDate`, if was true, consider the `currentDate` as the `defaultValue`
      if (
        isBefore(currentDate, props.maxDate!) ||
        isEqual(currentDate, props.maxDate!)
      ) {
        return currentDateAsObject;
      }

      // `Current Date` is not in range of [maxDate] and Max Date should be used as `defaultValue`
      return maxDateObject;
    }

    // I tried my best but `defaultValue`, `maxDate` and `minDate` are not valid dates.
    throw new Error(
      `[PersianMobileDatePicker] I tried my best but can't consider a valid default value for using in the Picker's Columns.`,
    );
  }, [
    isMinDateValid,
    maxDateObject,
    minDateObject,
    isMaxDateValid,
    props.defaultValue,
    isDefaultValueValid,
    selectedDateRef.current,
  ]);

  /**
   * Default Picker selected columns value which goes from the parent to local changes
   *
   * @type {Array<string>}
   * @private
   */
  const defaultPickerValueAsString = useMemo<Array<string>>(() => {
    return convertSelectedDateToAnArray(defaultSelectedDateObject);
  }, [defaultSelectedDateObject]);

  // Local States
  const [daysInMonth, setDaysInMonth] = useState<number>(29);
  const [selectedDate, setSelectedDate] = useState<PickerDateModel>(
    defaultSelectedDateObject,
  );
  // Hooks
  const previousSelectedDate = usePrevious<PickerDateModel>(selectedDate);

  // Watchers
  // Calculate days in selected months
  useEffect(() => {
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

  // Handlers
  /**
   * Check if entered Year is in Range of Min and Max
   *
   * @param {PickerDateModel} selectedDate - Selected date which is an Object
   * @param {number} value - year value as a number
   * @return {boolean} entered year is allowed to render
   * @private
   */
  function shouldRenderYearItem(
    selectedDate: PickerDateModel,
    value: number,
  ): boolean {
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

  /**
   * This function will call `shouldRender` in the Config object, which gave us one of the DatePicker component's props and checks to render the Item(This property is optional).
   *
   * @param {PickerDateModel} currentSelectedDate
   * @param {DateConfigTypes} key
   * @param {PickerSelectedDateValue} value
   * @return {boolean}
   * @private
   */
  function configShouldRender(
    currentSelectedDate: PickerDateModel,
    key: DateConfigTypes,
    value?: PickerSelectedDateValue,
  ): boolean {
    return (
      configs?.[key]?.shouldRender?.(
        addExtraDateInfo(currentSelectedDate, {
          type: key,
          value: value ?? currentSelectedDate[key]!,
        }),
      ) ?? true
    );
  }

  /**
   * * Check if the Month or Day Column's item should be rendered or not
   *
   * @param {PickerDateModel} selectedDate
   * @param {DateConfigTypes} key
   * @param {PickerSelectedDateValue} value
   * @return {boolean}
   * @private
   */
  function shouldRenderItem(
    selectedDate: PickerDateModel,
    key: DateConfigTypes,
    value: PickerSelectedDateValue,
  ): boolean {
    // Create new Date object and clone the SelectedDate and assign the entered day to the Object
    const $date = { ...selectedDate, [key]: value };

    // Call the Config's shouldRender method to find that we should render this item or not
    // User can prevent rendering the weekend's holidays in Date Picker
    if (!configShouldRender($date, key, value)) return false;

    // Convert to a Date instance
    const selectedDateValue = convertDateObjectToDateInstance($date);

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
   * @return {Array<PickerItemModel>} new list of Column's items which should be displayed in the DatePicker
   * @private
   */
  function filterAllowedColumnRows(
    pickerList: Array<PickerItemModel>,
    type: DateConfigTypes,
  ): Array<PickerItemModel> {
    return pickerList.filter((pickerItem) => {
      // Check if Day or Month is in Range
      if (
        (type === 'day' || type === 'month') &&
        !shouldRenderItem(selectedDate, pickerItem.type, pickerItem.value)
      ) {
        return false;
        // Check if Month is in Range
      } else if (
        type === 'year' &&
        !shouldRenderYearItem(selectedDate, pickerItem.value)
      ) {
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
   * @return {PickerSelectedDateValue | string} columns text content
   * @private
   */
  function pickerItemTextFormatter(
    pickerItem: PickerItemModel,
  ): PickerSelectedDateValue | string {
    const dateValues = addExtraDateInfo(selectedDate, pickerItem);
    return (
      configs[pickerItem.type]?.formatter?.(dateValues) ?? pickerItem.value
    );
  }

  /**
   * Get Picker columns Caption and its styles if has
   *
   * @param {DateConfigTypes} type
   * @return {PickerColumnCaption} Caption text and styles
   * @private
   */
  function getPickerColumnsCaption(
    type: DateConfigTypes,
  ): PickerColumnCaption | boolean {
    return configs[type]?.caption! ?? false;
  }

  /**
   * Handle every single of columns' row Classname by their type and value
   *
   * @param {PickerItemModel} pickerItem
   * @return {string}
   * @private
   */
  function getPickerItemClassNames(pickerItem: PickerItemModel): string {
    const classNamesFormatter = configs[pickerItem.type]?.classname;
    if (classNamesFormatter) {
      const dateValues = addExtraDateInfo(selectedDate, pickerItem);
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

  /**
   * Highlight Weekends by adding a className dynamically
   *
   * @param {number} day
   * @return {string}
   * @private
   */
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
   * @private
   */
  function addExtraDateInfo(
    currentSelectedDate: PickerDateModel,
    pickerItem: PickerItemModel,
  ): RequiredPickerExtraDateInfo {
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

    return targetSelectedDate as RequiredPickerExtraDateInfo;
  }

  return {
    prefix,
    configs,

    daysInMonth,
    selectedDate,
    setSelectedDate: (date: PickerDateModel) => {
      selectedDateRef.current = date;

      setSelectedDate(date);
    },
    defaultSelectedDateObject,

    defaultSelectedDate: defaultSelectedDateObject,
    maxYear,
    minYear,
    minDateObject,
    maxDateObject,
    isMinDateValid,
    isMaxDateValid,

    isDefaultValueValid,
    defaultValueDateObject,
    defaultPickerValueAsString,

    // Functions
    filterAllowedColumnRows,
    getPickerItemClassNames,
    getPickerColumnsCaption,
    shouldRender: shouldRenderItem,
    shouldRenderYear: shouldRenderYearItem,
    handlePickerItemTextContent: pickerItemTextFormatter,
  };
}
