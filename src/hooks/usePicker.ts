// React Hooks
import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
// Utilities
import {
  convertDateInstanceToDateObject,
  createDateInstance,
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
   * Get default selected date by [MinDate], [MaxDate], [initialValue] or current date
   */
  const defaultSelectedDateObject = useMemo<PickerDateModel>(() => {
    if (
      selectedDateRef.current &&
      isValid(createDateInstance(selectedDateRef.current))
    ) {
      return selectedDateRef.current;
    }

    if (isValid(props.value?.date!)) {
      return props.value?.object!;
    } else if (isInitialValueValid) {
      // Default value has no overlap with [minDate], [maxDate] and also can be rendered by the shouldRender in Component's Config prop
      if (
        // [initialValue] is in Range of [MinDate] and [MaxDate] - /start
        shouldRenderItem(
          initialValueDateObject,
          'month',
          initialValueDateObject.month,
        ) &&
        shouldRenderItem(
          initialValueDateObject,
          'day',
          initialValueDateObject.day,
        ) &&
        shouldRenderYearItem(
          initialValueDateObject,
          initialValueDateObject.year,
        ) &&
        initialValueDateObject.year >= minYear &&
        initialValueDateObject.year <= maxYear &&
        // /end
        // [initialValue] can be rendered by the [shouldRender] Config method - /start
        configShouldRender(initialValueDateObject, 'year') &&
        configShouldRender(initialValueDateObject, 'month') &&
        configShouldRender(initialValueDateObject, 'day')
        // /end
      ) {
        return initialValueDateObject;
      }
    }

    const currentDate = new Date();
    const currentDateAsObject = currentDateObject();

    if (isMinDateValid) {
      // We goes here if `maxDate` or `initialValue` is not valid as valid date
      // Check if the `Current Date` is bigger than or Equals the `Min Date`, if was true, consider the `Current Date` as `initialValue`
      if (
        isAfter(currentDate, props.minDate!) ||
        isEqual(currentDate, props.minDate!)
      ) {
        return currentDateAsObject;
      }
      return minDateObject;
    } else if (isMaxDateValid) {
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
  function shouldRenderItem(
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
    if (!configShouldRender($date, key, value)) return false;

    // Convert to a Date instance
    const selectedDateValue = createDateInstance($date);

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
   * Check if entered Year is in Range of Min and Max
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
    },
    [selectedDate],
  );

  // Picker Config's Formatters
  /**
   * Format the Picker items' text content
   */
  const pickerItemTextFormatter = useCallback<
    (pickerItem: PickerItemModel) => PickerSelectedDateValue | string
  >(
    (pickerItem) => {
      const dateValues = addExtraDateInfo(selectedDate, pickerItem);
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
    [props.config, props.highlightWeekends, props.addDayName],
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
        defaultSelectedDateObject.year!,
        defaultSelectedDateObject.month!,
        day,
      );
    },
    [defaultSelectedDateObject.month, defaultSelectedDateObject.year],
  );

  /**
   * Check the given day of year is holiday or not?
   */
  function checkDateIsHoliday(dayOfYear: number): boolean {
    return solarEvents[dayOfYear]?.holiday;
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

  return {
    configs,
    classNamePrefix,

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

    isInitialValueValid,
    initialValueDateObject,
    defaultPickerValueAsString,

    // Functions
    addExtraDateInfo,
    checkDayIsWeekend,
    checkDateIsHoliday,
    filterAllowedColumnRows,
    getPickerItemClassNames,
    getPickerColumnsCaption,
    shouldRender: shouldRenderItem,
    shouldRenderYear: shouldRenderYearItem,
    handlePickerItemTextContent: pickerItemTextFormatter,
  };
}
