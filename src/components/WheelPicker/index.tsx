import React, {
  CSSProperties,
  useLayoutEffect,
  useMemo,
  useCallback,
  FC,
} from 'react';
// Global Components
import MultiPicker from 'rmc-picker/es/MultiPicker';
// Styles
import {
  Caption,
  GlobalStyle,
  PickerItemWithStyle,
  PickerWithStyle,
} from './styles';
// Hooks
import { usePicker } from '../../hooks/usePicker';
// Helpers
import { convertSelectedDateToObject, isObjectEmpty } from '../../helpers';
import {
  convertDateObjectToDateInstance,
  isWeekend,
  pickerData,
} from '../../helpers/date';
// Types
import type {
  DateConfigTypes,
  PickerColumns,
  WheelPickerProps,
  PickerColumnCaption,
} from './index.types';

export const WheelPicker: FC<WheelPickerProps> = (props) => {
  const {
    prefix,
    configs,

    daysInMonth,
    selectedDate,
    setSelectedDate,
    defaultSelectedDateObject,
    defaultPickerValueAsString,

    maxYear,
    minYear,

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
  }, [props.config, daysInMonth, minYear, maxYear]);
  /**
   * Prepare the default value of DatePicker when the Developer has not passed a defaultValue
   */
  useLayoutEffect(() => {
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
  }, [pickerColumns, selectedDate, props.defaultValue]);

  /**
   * Picker onChange event which includes every columns' selected value
   *
   * @param { Array<string>} value date
   * @return {void}
   */
  function onChange(value: Array<string>): void {
    const convertSelectedDate = convertSelectedDateToObject(value);

    setSelectedDate(convertSelectedDate);
    // Call onChange if presents
    props.onChange?.({
      object: convertSelectedDate,
      date: convertDateObjectToDateInstance(convertSelectedDate),
    });
  }

  const columnStyles = useCallback<(type: DateConfigTypes) => CSSProperties>(
    (type) => {
      return configs[type].columnStyle || {};
    },
    [configs],
  );

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

  const columnSelectedItemStyles = useCallback<
    (type: DateConfigTypes) => CSSProperties
  >(
    (type) => {
      return configs[type].selectedItemStyle || {};
    },
    [configs],
  );

  return (
    <React.Fragment>
      {pickerColumns.map((column, index) => {
        const caption = getPickerColumnsCaption(column.type);
        if (caption) {
          return (
            <Caption
              key={`${column.type}_${index}`}
              columnSize={pickerColumns.length}
              className={prefix('caption')}
              style={(caption as PickerColumnCaption).style || {}}
            >
              {(caption as PickerColumnCaption).text}
            </Caption>
          );
        }

        return (
          <Caption
            key={`${column.type}_${index}`}
            columnSize={pickerColumns.length}
            className={`${prefix('caption')} ${prefix('caption--empty')}`}
          ></Caption>
        );
      })}
      <MultiPicker
        selectedValue={defaultPickerValueAsString}
        className={prefix('multi-picker')}
        onValueChange={onChange}
      >
        {pickerColumns.map((column, index) => {
          return (
            <PickerWithStyle
              key={`${index}`}
              style={columnStyles(column.type)}
              indicatorClassName={`${prefix(`indicator`)} ${prefix(
                `${column.type}-column`,
              )}`}
            >
              {filterAllowedColumnRows(column.value, column.type).map(
                (pickerItem) => {
                  const isSelectedItem =
                    pickerItem.value ===
                    defaultSelectedDateObject[pickerItem.type];
                  return (
                    <PickerItemWithStyle
                      // @ts-ignore
                      style={{
                        ...{ unicodeBidi: 'plaintext', direction: 'rtl' },
                        ...columnItemStyles(column.type),
                        ...(isSelectedItem
                          ? columnSelectedItemStyles(column.type)
                          : {}),
                      }}
                      key={`${pickerItem.type}_${pickerItem.value}`}
                      className={`${
                        isSelectedItem ? prefix('active-selected') : ''
                      } ${prefix('view-item')} ${getPickerItemClassNames(
                        pickerItem,
                      )}`}
                      value={`${pickerItem.type}-${pickerItem.value}`}
                    >
                      <div
                        style={
                          pickerItem.type === 'day' &&
                          isWeekend(
                            selectedDate.year!,
                            selectedDate.month!,
                            pickerItem.value,
                          )
                            ? {
                                color: '#de3f18',
                              }
                            : {}
                        }
                      >
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
};
