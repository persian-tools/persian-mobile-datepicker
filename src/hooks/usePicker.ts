// React Hooks
import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
// Utilities
import {
  convertDateInstanceToDateObject,
  newDate,
  currentDateObject,
  daysInMonth as calculateDaysInMonth,
  getCurrentYear,
  getDayOfYear,
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
  convertSelectedDateObjectToArray,
  isObjectEmpty,
  prefixClassName,
  toPositive,
} from '../helpers';
// Hooks
import { usePrevious } from './usePrevious';
// Events
import { solarEvents } from '../events/solar';
// Types
import type {
  DatePickerConfig,
  DateConfigTypes,
  PickerExtraDateInfo,
  PickerDateModel,
  PickerItemModel,
  PickerSelectedDateValue,
  RequiredPickerDateModel,
  WheelPickerProps,
  RequiredPickerExtraDateInfo,
} from '../components/WheelPicker/index.types';
import type { CSSProperties } from 'react';
import type { PickerColumnCaption } from '../components/WheelPicker/index.types';

export function usePicker(props: WheelPickerProps) {
  const selectedDateRef = useRef<PickerDateModel>({});
  /**
   * Date picker columns config
   */
  const configs = useMemo<Required<DatePickerConfig>>(() => {
    const config = { ...props.config } as Required<DatePickerConfig>;
    if (config.month && !config.month.formatter) {
      config.month.formatter = (value) => jalaliMonths[value.month!];
    }

    return config;
  }, [props.config]);

  /**
   * Picker CSS classnames prefix name
   */
  const classNamePrefix = prefixClassName(props.classNamePrefix!);

  /**
   * Check if the [Min Date] is valid and has filled
   */
  const isMinDateValid = isValid(props.minDate!);
  /**
   * Parse and convert [minDate] to an object
   */
  const minDateObject = useMemo<RequiredPickerDateModel>(
    () => convertDateInstanceToDateObject(props.minDate!),
    [props.minDate],
  );
  /**
   * Parse and convert [maxDate] to an object
   */
  const maxDateObject = useMemo<RequiredPickerDateModel>(
    () => convertDateInstanceToDateObject(props.maxDate!),
    [props.maxDate],
  );
  /**
   * Check if the [Max Date] is valid and has filled
   */
  const isMaxDateValid = isValid(props.maxDate!);

  /**
   * Parse and convert the [initialValue] that filled as a prop to an Object
   */
  const initialValueDateObject = useMemo<RequiredPickerDateModel>(
    () => convertDateInstanceToDateObject(props.initialValue!),
    [props.initialValue],
  );
  /**
   * Check if the Default Value Date is valid and has filled
   */
  const isInitialValueValid = isValid(props.initialValue!);

  /**
   * Get Min Year of the Year Column which should be rendered
   */
  const minYear = useMemo<number>(() => {
    const currentYear = getCurrentYear();
    const startYear = Number(props.startYear);
    const startYearIsGreaterThanEquals1000 = startYear >= 1000;
    const startYearPrecision = startYearIsGreaterThanEquals1000
      ? toPositive(startYear - currentYear)
      : startYear;

    let year: number;
    if (isMinDateValid) {
      year = minDateObject.year;
    } else if (isInitialValueValid && !startYearIsGreaterThanEquals1000) {
      year = initialValueDateObject.year - startYearPrecision;
    } else if (startYearIsGreaterThanEquals1000) {
      year = startYear;
    } else {
      year = currentYear - startYearPrecision;
    }

    const result = toPositive(year);

    return result === 0 ? year : result;
  }, [
    isMinDateValid,
    minDateObject,
    isInitialValueValid,
    initialValueDateObject,
    props.startYear,
  ]);

  /**
   * Get Max Year of the [Year Column] which should be rendered
   */
  const maxYear = useMemo<number>(() => {
    const currentYear = getCurrentYear();
    const endYear = Number(props.endYear);
    const endYearIsGreaterThanEquals1000 = endYear >= 1000;
    const endYearPrecision = toPositive(
      endYearIsGreaterThanEquals1000 ? currentYear - endYear : endYear,
    );

    let year: number;
    if (isMaxDateValid) {
      year = maxDateObject.year;
    } else if (isInitialValueValid && !endYearIsGreaterThanEquals1000) {
      year = initialValueDateObject.year + endYearPrecision;
    } else if (endYearIsGreaterThanEquals1000) {
      year = endYear;
    } else {
      year = currentYear + endYearPrecision;
    }

    const result = toPositive(year);

    return result === 0 ? currentYear : result;
  }, [
    isMaxDateValid,
    maxDateObject,
    initialValueDateObject,
    props.endYear,
    isInitialValueValid,
  ]);

  /**
   * Get default selected date by [MinDate], [MaxDate], [initialValue], [selectedDateRef] or [Current date that we are in]
   */
  const defaultSelectedDateObject = useMemo<PickerDateModel>(() => {
    if (
      !isObjectEmpty(selectedDateRef.current) &&
      isValid(newDate(selectedDateRef.current))
    ) {
      /**
       * This is happen when [MinDate] is `newDate({year: 1399, month: 9, day: 11})` and [MaxDate] is `newDate({year: 1400, month: 1, day: 13})`
       * For namely, If the user select year: 1399 month: 10 day: 14, then change the Year to 1400, now, the current selectedDateRef is not valid because it doesn't meet the [MaxDate]
       * what does it mean?
       * selectedDateRef is, year: 1400 month: 10 and day: 14 which [MaxDate] is Year: 1400, month: 1 and day: 13
       * So what should we do?
       * We should Check if we can Render month 10 with day 14? if Yes, there is no issue,
       * But if No, we have big trouble, We should find the closest month and day or just a day that can be replaced with month: 10 and day: 1 or just day: 14
       **/
      if (
        canRender(
          selectedDateRef.current,
          'month',
          selectedDateRef.current.month!,
        ) &&
        canRender(selectedDateRef.current, 'day', selectedDateRef.current.day!)
      ) {
        return selectedDateRef.current;
      } else if (
        canRenderYear(selectedDateRef.current, selectedDateRef.current?.year!)
      ) {
        // Year can be rendered
        const { year, day, month } = selectedDateRef.current;
        const closestBound =
          year! - minDateObject.year > maxDateObject.year - year!
            ? 'upperBound' // Closest to `maxDate` Year
            : 'lowerBound'; // Closest to `minDate` Year
        const isUpperBound = closestBound === 'upperBound';

        // Just we have trouble with the day and it is not in our [MaxDate] range
        if (
          canRender(
            selectedDateRef.current,
            'month',
            selectedDateRef.current.month!,
          )
        ) {
          // Month can also render and day should be updated

          if (isUpperBound) {
            // Current Selected Year is closest to the [MaxDate] year and we should use the [MaxDate] day if its possible
            selectedDateRef.current.day =
              day! <= maxDateObject.day ? day : maxDateObject.day;
          } else {
            // Current Selected Year is closest to the [MinDate] year and we should use the [MinDate] day if its possible
            selectedDateRef.current.day =
              day! >= minDateObject.day ? day : minDateObject.day;
          }
        } else {
          // We have trouble with Month and Day and they should be changed

          // Current Selected Year is closest to the [MaxDate] year and we should use the [MaxDate] month and day if its possible
          if (isUpperBound) {
            selectedDateRef.current.day =
              day! <= maxDateObject.day ? day : maxDateObject.day;
            selectedDateRef.current.month =
              month! <= maxDateObject.month ? month : maxDateObject.month;

            return selectedDateRef.current;
          } else {
            // Current Selected Year is closest to the [MinDate] year and we should use the [MinDate] month and day if its possible
            selectedDateRef.current.day =
              day! >= minDateObject.day ? day : minDateObject.day;
            selectedDateRef.current.month =
              month! >= minDateObject.month ? month : minDateObject.month;

            return selectedDateRef.current;
          }
        }
      }
    }

    if (isValid(props.value?.date!)) {
      return props.value?.object!;
    } else if (isInitialValueValid) {
      // Default value has no overlap with [minDate], [maxDate] and also can be rendered by the shouldRender in Component's Config prop
      if (
        // [initialValue] is in Range of [MinDate] and [MaxDate] - /start
        canRender(
          initialValueDateObject,
          'month',
          initialValueDateObject.month,
        ) &&
        canRender(initialValueDateObject, 'day', initialValueDateObject.day) &&
        canRenderYear(initialValueDateObject, initialValueDateObject.year) &&
        initialValueDateObject.year >= minYear &&
        initialValueDateObject.year <= maxYear &&
        // /end
        // [initialValue] can be rendered by the [shouldRender] Config method - /start
        canRenderByConfig(initialValueDateObject, 'year') &&
        canRenderByConfig(initialValueDateObject, 'month') &&
        canRenderByConfig(initialValueDateObject, 'day')
        // /end
      ) {
        return initialValueDateObject;
      }
    }

    const currentDate = new Date();
    const currentDateAsObject = currentDateObject();

    if (isMinDateValid && !isMaxDateValid) {
      // We goes here if `maxDate` or `initialValue` is not valid
      // Check if the `Current Date` is bigger than or Equals the `Min Date`, if was true, consider the `Current Date` as `initialValue`
      if (
        isAfter(currentDate, props.minDate!) ||
        isEqual(currentDate, props.minDate!)
      ) {
        return currentDateAsObject;
      }
      return minDateObject;
    } else if (isMaxDateValid && !isMinDateValid) {
      // We goes here if `initialValue` is not valid as valid date
      // Check if the `Current Date` is less than or Equals the `maxDate`, if was true, consider the `currentDate` as the `initialValue`
      if (
        isBefore(currentDate, props.maxDate!) ||
        isEqual(currentDate, props.maxDate!)
      ) {
        return currentDateAsObject;
      }
      // `Current Date` is not in range of [maxDate] and Max Date should be used as `initialValue`
      return maxDateObject;
    } else if (isMaxDateValid && isMinDateValid) {
      if (
        (isAfter(currentDate, props.minDate!) &&
          isBefore(currentDate, props.maxDate!)) ||
        isEqual(currentDate, props.maxDate!) ||
        isEqual(currentDate, props.minDate!)
      ) {
        return currentDateAsObject;
      }

      return minDateObject;
    }

    // Check if initialValue's year is in Range of minYear and maxYear
    if (
      isInitialValueValid &&
      initialValueDateObject.year >= minYear &&
      initialValueDateObject.year <= maxYear
    ) {
      return initialValueDateObject;
    }

    // I tried my best but `value`, `initialValue`, `maxDate` and `minDate` are not valid dates.
    throw new Error(
      `[PersianMobileDatePicker] I tried my best but can't consider a valid default value for using in the Picker's Columns.`,
    );
  }, [
    props.maxDate,
    props.minDate,
    isMinDateValid,
    isMaxDateValid,
    props.value?.date,
    props.value?.object,
    props.initialValue,
    isInitialValueValid,
    selectedDateRef.current,
  ]);

  /**
   * Default Picker selected columns value which goes from the parent to local changes
   */
  const defaultPickerValueAsString = useMemo<Array<string>>(() => {
    return convertSelectedDateObjectToArray(defaultSelectedDateObject);
  }, [defaultSelectedDateObject]);

  // Local States
  const [daysInMonth, setDaysInMonth] = useState<number>(29);
  const [selectedDate, setSelectedDate] = useState<PickerDateModel>(
    defaultSelectedDateObject,
  );
  // Hooks
  const previousSelectedDate = usePrevious<PickerDateModel>(selectedDate);

  /**
   * Check if the Month or Day Column's item should be rendered or not
   */
  function canRender(
    selectedDate: PickerDateModel,
    key: DateConfigTypes,
    value: PickerSelectedDateValue,
  ): boolean {
    // Create new Date object and clone the SelectedDate and assign the entered day to the Object
    const $date = { ...selectedDate, [key]: value };

    // If [minDate] is valid and we are validating the month column,
    // we should pass the [minDate] day to the [selectedDate] as day value
    if (key === 'month' && isMinDateValid) {
      $date.day = minDateObject.day;
    }
    // Call the Config's shouldRender method to find that we should render this item or not
    // User can prevent rendering the weekend's holidays in Date Picker
    if (!canRenderByConfig($date, key, value)) return false;

    // Convert to a Date instance
    const selectedDateValue = newDate($date);

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

  // Watchers
  // Calculate days in selected months
  useEffect(() => {
    if (!isObjectEmpty(selectedDate)) {
      const $daysInMonth = calculateDaysInMonth(
        Number(selectedDate.year),
        Number(selectedDate.month),
      );
      if (
        (previousSelectedDate?.month !== selectedDate?.month ||
          previousSelectedDate?.year !== selectedDate?.year) &&
        daysInMonth !== $daysInMonth
      ) {
        setDaysInMonth($daysInMonth);
      }
    }
  }, [
    selectedDate.month,
    selectedDate.year,
    previousSelectedDate?.year,
    previousSelectedDate?.month,
  ]);

  // Handlers
  /**
   * This function will call `shouldRender` in the Config object, which gave us one of the DatePicker component's props and checks to render the Item(This property is optional).
   */
  function canRenderByConfig(
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
   * Check if entered Year is in Range of Min and Max
   */
  function canRenderYear(
    selectedDate: PickerDateModel,
    value: number,
  ): boolean {
    // Call the Config's shouldRender method to find that we should render this item or not
    // User can prevent rendering specific year or a list of years in Picker's Year column
    if (!canRenderByConfig(selectedDate, 'year', value)) return false;

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
   * Filter all Columns values and only return the Column's items which should be displayed
   */
  const filterAllowedColumnRows = useCallback<
    (
      pickerList: Array<PickerItemModel>,
      type: DateConfigTypes,
    ) => Array<PickerItemModel>
  >(
    (pickerList, type) => {
      return pickerList.filter((pickerItem) => {
        // Check if Day or Month is in Range
        if (
          (type === 'day' || type === 'month') &&
          !canRender(selectedDateRef.current, pickerItem.type, pickerItem.value)
        ) {
          return false;
          // Check if Month is in Range
        } else if (
          type === 'year' &&
          !canRenderYear(selectedDateRef.current, pickerItem.value)
        ) {
          return false;
        }

        return true;
      });
    },
    [selectedDateRef.current],
  );

  // Picker Config's Formatters
  /**
   * Format the Picker items' text content
   */
  const pickerItemTextFormatter = useCallback<
    (pickerItem: PickerItemModel) => PickerSelectedDateValue | string
  >(
    (pickerItem) => {
      const dateValues = addExtraDateInfo(selectedDateRef.current, pickerItem);
      const textContent =
        configs[pickerItem.type]?.formatter?.(dateValues) ?? pickerItem.value;
      const isDayColumn = pickerItem.type === 'day';
      const shouldHighlightWeekends =
        isDayColumn && !!props.highlightWeekends && dateValues.weekDay === 6;
      const shouldAddDayName = isDayColumn && !!props.addDayName;

      return shouldHighlightWeekends
        ? `${textContent}(${weekDays[6]})`
        : shouldAddDayName
        ? `${textContent}(${weekDays[dateValues.weekDay]})`
        : textContent;
    },
    [selectedDate, props.config, props.highlightWeekends, props.addDayName],
  );

  /**
   * Get Picker columns Caption and its styles if has
   */
  function getPickerColumnsCaption(
    type: DateConfigTypes,
  ): PickerColumnCaption | boolean {
    return configs[type]?.caption! ?? false;
  }

  /**
   * Handle every single of columns' row Classname by their type and value
   */
  const getPickerItemClassNames = useCallback<
    (pickerItem: PickerItemModel) => string
  >(
    (pickerItem) => {
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
    },
    [props.config, props.highlightWeekends],
  );

  /**
   * Highlight Weekends by adding a className dynamically
   */
  const highlightWeekendClassName = useCallback<(day: number) => string>(
    (day) => {
      return checkDayIsWeekend(day) ? classNamePrefix('weekend') : '';
    },
    [],
  );

  /**
   * Check that the day is a weekend or not?
   */
  const checkDayIsWeekend = useCallback<(day: number) => boolean>(
    (day) => {
      return isWeekend(
        selectedDateRef.current.year!,
        selectedDateRef.current.month!,
        day,
      );
    },
    [selectedDateRef.current],
  );

  /**
   * Check the given day of year is holiday or not?
   */
  function checkDateIsHoliday(dayOfYear: number): boolean {
    return solarEvents[dayOfYear]?.holiday || false;
  }

  // Utilities
  /**
   * Find WeekDay and WeekName by a selected date and add to the Date object
   */
  function addExtraDateInfo(
    currentSelectedDate: PickerDateModel,
    pickerItem?: PickerItemModel,
  ): RequiredPickerExtraDateInfo {
    const targetSelectedDate: PickerExtraDateInfo = {
      ...currentSelectedDate,
    };
    if (pickerItem) {
      targetSelectedDate[pickerItem.type] = pickerItem.value;
    }
    // Add Month text if the Picker type is month, just for Month's config object
    targetSelectedDate.monthText = jalaliMonths[targetSelectedDate.month!];
    // Check if year is leap year and if it was true just for Year's config object
    targetSelectedDate.isLeapYear = isLeapYear(targetSelectedDate.year!);
    // Day of Year
    targetSelectedDate.dayOfYear = getDayOfYear(
      targetSelectedDate.year!,
      targetSelectedDate.month!,
      targetSelectedDate.day!,
    );
    //
    targetSelectedDate.isHoliday =
      solarEvents[targetSelectedDate.dayOfYear]?.holiday ?? false;

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

  // Columns styles value
  const getColumnStylesByKey = useCallback<
    (
      type: DateConfigTypes,
      styleKey: 'itemStyle' | 'columnStyle' | 'selectedItemStyle',
    ) => CSSProperties
  >(
    (type, styleKey) => {
      const styleConfig = configs[type];
      return styleConfig[styleKey] || {};
    },
    [configs],
  );

  /**
   * Get Picker's item styles such as selected and none selected styles
   */
  const getPickerItemStyles = useCallback<
    (type: DateConfigTypes, isSelected: boolean) => CSSProperties
  >(
    (type, isSelected) => {
      return {
        ...getColumnStylesByKey(type, 'itemStyle'),
        ...(isSelected ? getColumnStylesByKey(type, 'selectedItemStyle') : {}),
      };
    },
    [configs],
  );

  /**
   * Get Picker's text content styles if the day is weekend or holiday
   */
  const getPickerTextContentStyles = useCallback<
    (pickerItem: PickerItemModel) => CSSProperties
  >(
    (pickerItem) => {
      const isDayItem = pickerItem.type === 'day';
      if (isDayItem) {
        // Highlight weekends if needed
        if (props.highlightWeekends && checkDayIsWeekend(pickerItem.value)) {
          return {
            color: '#de3f18',
          };
        }

        // Highlight holidays if needed
        if (props.highlightHolidays) {
          const dayOfYear = getDayOfYear(
            selectedDateRef.current.year!,
            selectedDateRef.current.month!,
            pickerItem.value,
          );
          if (checkDateIsHoliday(dayOfYear)) {
            return {
              color: '#de3f18',
            };
          }
        }
      }
      return {};
    },
    [selectedDateRef.current, props.highlightHolidays, props.highlightWeekends],
  );

  /**
   * Get every Picker Item's content styles
   */
  const getPickerItemContentStyles = useCallback<
    (
      pickerItem: PickerItemModel,
      type: DateConfigTypes,
      isSelectedItem: boolean,
    ) => CSSProperties
  >(
    (pickerItem, type, isSelectedItem) => {
      return {
        ...getPickerTextContentStyles(pickerItem),
        ...getPickerItemStyles(type, isSelectedItem),
      };
    },
    [configs],
  );

  return {
    configs,
    classNamePrefix,

    daysInMonth,
    selectedDate,
    setSelectedDate: (date: PickerDateModel) => {
      selectedDateRef.current = date;

      setSelectedDate(date);
    },
    defaultSelectedDate: defaultSelectedDateObject,
    maxYear,
    minYear,
    minDateObject,
    maxDateObject,
    isMinDateValid,
    isMaxDateValid,

    isInitialValueValid,
    initialValueDateObject,
    defaultPickerValueAsString,

    // Functions
    checkDayIsWeekend,
    filterAllowedColumnRows,
    getPickerItemClassNames,
    getPickerColumnsCaption,
    shouldRender: canRender,
    shouldRenderYear: canRenderYear,
    handlePickerItemTextContent: pickerItemTextFormatter,

    // Styles
    getColumnStylesByKey,
    getPickerItemContentStyles,
  };
}
