import React, { CSSProperties, useMemo, useCallback, FC } from 'react';
// Global Components
import MultiPicker from 'rmc-picker/es/MultiPicker';
// Styles
import {
  StyledCaption,
  GlobalStyle,
  PickerItemWithStyle,
  PickerWithStyle,
  StyledTitle,
} from './index.styles';
// Hooks
import { usePicker } from '../../hooks/usePicker';
// Helpers and Utilities
import {
  convertSelectedDateToObject,
  convertSelectedDateObjectToArray,
} from '../../helpers';
import {
  pickerData,
  convertDateObjectToDateInstance,
  getDayOfYear,
} from '../../helpers/date';
// Events
import { solarEvents } from '../../events/solar';
import { persianEvents } from '../../events/persian';
// Types
import type {
  DateConfigTypes,
  PickerColumns,
  WheelPickerProps,
  PickerColumnCaption,
  PickerItemModel,
  EventTypes,
} from './index.types';

export const WheelPicker: FC<WheelPickerProps> = (props) => {
  const {
    configs,
    classNamePrefix,

    daysInMonth,
    selectedDate,
    setSelectedDate,
    defaultSelectedDateObject,
    defaultPickerValueAsString,

    maxYear,
    minYear,

    checkDayIsWeekend,
    checkDateIsHoliday,
    getPickerColumnsCaption,
    filterAllowedColumnRows,
    getPickerItemClassNames,
    handlePickerItemTextContent,
  } = usePicker(props);

  // Memo list
  /**
   * Generate Picker's columns with their values
   *
   * @category watchers
   * @return {PickerColumns}
   * @private
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
  }, [
    props.config,
    daysInMonth,
    minYear,
    maxYear,
    props.startYear,
    props.endYear,
  ]);

  React.useEffect(() => {
    if (selectedDate && defaultPickerValueAsString.length) {
      onChange(convertSelectedDateObjectToArray(selectedDate));
    }
  }, []);

  /**
   * Picker onChange event which includes every columns' selected value
   *
   * @param { Array<string>} value date
   * @return {void}
   */
  function onChange(value: Array<string>): void {
    const convertSelectedDate = convertSelectedDateToObject(value);
    const dayOfYear = getDayOfYear(
      convertSelectedDate.year!,
      convertSelectedDate.month!,
      convertSelectedDate.day!,
    );
    // Events
    const events = [];
    const solarEvent = solarEvents[dayOfYear];
    if (solarEvent) {
      events.push({
        type: 'solar' as EventTypes,
        title: solarEvent.title,
      });
    }
    const persianEvent = persianEvents[dayOfYear];
    if (persianEvent) {
      events.push({
        type: 'persian' as EventTypes,
        title: persianEvent.title,
      });
    }

    setSelectedDate(convertSelectedDate);
    // Call onChange if presents
    props.onChange?.({
      events,
      object: convertSelectedDate,
      date: convertDateObjectToDateInstance(convertSelectedDate),
    });
  }

  // Columns style
  const columnStyles = useCallback<(type: DateConfigTypes) => CSSProperties>(
    (type) => {
      return configs[type].columnStyle || {};
    },
    [configs],
  );

  // Columns items style
  const columnItemStyles = useCallback<
    (type: DateConfigTypes) => CSSProperties
  >(
    (type) => {
      return {
        ...{ color: '#3f3f3e' },
        ...(configs[type].itemStyle || {}),
      };
    },
    [configs],
  );

  // Column selected item styles
  const columnSelectedItemStyles = useCallback<
    (type: DateConfigTypes) => CSSProperties
  >(
    (type) => {
      return configs[type].selectedItemStyle || {};
    },
    [configs],
  );

  /**
   * Get Picker's item styles such as selected and none selected styles
   *
   * @param {DateConfigTypes} type
   * @param {boolean} isSelected
   * @return {CSSProperties}
   *
   * @private
   */
  const pickerItemStyles = React.useCallback<
    (type: DateConfigTypes, isSelected: boolean) => CSSProperties
  >(
    (type, isSelected) => {
      return {
        ...{ unicodeBidi: 'plaintext', direction: 'rtl' },
        ...columnItemStyles(type),
        ...(isSelected ? columnSelectedItemStyles(type) : {}),
      };
    },
    [columnSelectedItemStyles, columnItemStyles],
  );

  /**
   * Get Picker's text content styles if the day is weekend or holiday
   *
   * @param {PickerItemModel} pickerItem
   * @return {CSSProperties}
   *
   * @private
   */
  const pickerTextContentStyles = React.useCallback<
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
            selectedDate.year!,
            selectedDate.month!,
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
    [selectedDate, props.highlightHolidays, props.highlightWeekends],
  );

  console.count('rerender');

  return (
    <React.Fragment>
      {props.title && <StyledTitle>{props.title}</StyledTitle>}
      {pickerColumns.map((column, index) => {
        const caption = getPickerColumnsCaption(column.type);
        if (caption) {
          const { style = {}, text } = caption as PickerColumnCaption;
          return (
            <StyledCaption
              key={`Picker_Caption_${column.type}_${index}`}
              columnSize={pickerColumns.length}
              className={classNamePrefix('caption')}
              style={style}
            >
              {text}
            </StyledCaption>
          );
        }

        return (
          <StyledCaption
            key={`Picker_Caption_${column.type}_${index}`}
            columnSize={pickerColumns.length}
            className={`${classNamePrefix('caption')} ${classNamePrefix(
              'caption--empty',
            )}`}
          />
        );
      })}
      <MultiPicker
        selectedValue={defaultPickerValueAsString}
        className={classNamePrefix('multi-picker')}
        onValueChange={onChange}
      >
        {pickerColumns.map((column, index) => {
          return (
            <PickerWithStyle
              key={`Picker_${index}`}
              style={columnStyles(column.type)}
              indicatorClassName={`${classNamePrefix(
                `indicator`,
              )} ${classNamePrefix(`${column.type}-column`)}`}
            >
              {filterAllowedColumnRows(column.value, column.type).map(
                (pickerItem) => {
                  const isSelectedItem =
                    pickerItem.value ===
                    defaultSelectedDateObject[pickerItem.type];
                  return (
                    <PickerItemWithStyle
                      // @ts-ignore
                      style={pickerItemStyles(column.type, isSelectedItem)}
                      key={`Picker_Item_${pickerItem.type}_${pickerItem.value}`}
                      className={`${
                        isSelectedItem ? classNamePrefix('active-selected') : ''
                      } ${classNamePrefix(
                        'view-item',
                      )} ${getPickerItemClassNames(pickerItem)}`}
                      value={`${pickerItem.type}-${pickerItem.value}`}
                    >
                      <div style={pickerTextContentStyles(pickerItem)}>
                        {handlePickerItemTextContent(pickerItem)}
                      </div>
                    </PickerItemWithStyle>
                  );
                },
              )}
            </PickerWithStyle>
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
  addDayName: false,
  disabled: false,
  classNamePrefix: 'persian-datepicker',
};
