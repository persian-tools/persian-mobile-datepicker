import React, { CSSProperties, useMemo, useCallback, FC } from 'react';
// Global Components
import MultiPicker from 'rmc-picker/es/MultiPicker';
// Styles
import {
  StyledCaption,
  GlobalStyle,
  StyledWheelPickerItem,
  StyledWheelPicker,
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
  getDayOfYear,
  getCurrentYear,
  newDate,
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

  // Call onChange for the first time that the WheelPicker has mounted.
  React.useEffect(() => {
    if (selectedDate && defaultPickerValueAsString.length) {
      onChange(convertSelectedDateObjectToArray(selectedDate));
    }
  }, []);

  /**
   * Picker onChange event which includes every columns' selected value
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
      date: newDate(convertSelectedDate),
    });
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
  const getPickerItemStyles = React.useCallback<
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
  const getPickerTextContentStyles = React.useCallback<
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

  /**
   * Get every Picker Item's content styles
   */
  const getPickerItemContentStyles = React.useCallback<
    (
      pickerItem: PickerItemModel,
      type: DateConfigTypes,
      isSelectedItem: boolean,
    ) => React.CSSProperties
  >(
    (pickerItem, type, isSelectedItem) => {
      return {
        ...getPickerTextContentStyles(pickerItem),
        ...getPickerItemStyles(type, isSelectedItem),
      };
    },
    [configs],
  );

  return (
    <React.Fragment>
      {props.title && (
        <StyledTitle className={classNamePrefix('title')}>
          {props.title}
        </StyledTitle>
      )}
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
        {/* Render Picker Columns */}
        {pickerColumns.map((column, index) => {
          return (
            <StyledWheelPicker
              key={`Picker_${index}`}
              style={getColumnStylesByKey(column.type, 'columnStyle')}
              indicatorClassName={`${classNamePrefix(
                `indicator`,
              )} ${classNamePrefix(`${column.type}-column`)}`}
            >
              {/* Filter columns items and only render item which can be rendered */}
              {filterAllowedColumnRows(column.value, column.type).map(
                (pickerItem) => {
                  // Is this Column item selected and viewed to the User now?
                  const isSelectedItem =
                    pickerItem.value ===
                    defaultSelectedDateObject[pickerItem.type];
                  return (
                    <StyledWheelPickerItem
                      key={`Picker_Item_${pickerItem.type}_${pickerItem.value}`}
                      className={`${
                        isSelectedItem ? classNamePrefix('active-selected') : ''
                      } ${classNamePrefix(
                        'column-item',
                      )} ${getPickerItemClassNames(pickerItem)}`}
                      value={`${pickerItem.type}-${pickerItem.value}`}
                    >
                      {/* Every Picker Item's content */}
                      <div
                        className={`rmc-column-item-content ${classNamePrefix(
                          'column-item-content',
                        )}`}
                        style={getPickerItemContentStyles(
                          pickerItem,
                          column.type,
                          isSelectedItem,
                        )}
                      >
                        {handlePickerItemTextContent(pickerItem)}
                      </div>
                    </StyledWheelPickerItem>
                  );
                },
              )}
            </StyledWheelPicker>
          );
        })}
      </MultiPicker>
      <GlobalStyle />
    </React.Fragment>
  );
};

WheelPicker.displayName = 'PersianTools(WheelPicker)';
WheelPicker.defaultProps = {
  startYear: getCurrentYear() - 30, // since 30 years ago
  endYear: getCurrentYear() + 30, // up to next 30 years
  addDayName: false,
  classNamePrefix: 'persian-datepicker',
};
