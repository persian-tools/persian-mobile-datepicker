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
  pickerData,
  convertDateObjectToDateInstance,
} from '../../helpers/date';
// Types
import type {
  DateConfigTypes,
  PickerColumns,
  WheelPickerProps,
  PickerColumnCaption,
  PickerItemModel,
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

  /**
   * Get Picker's selected items styles from Config prop
   *
   * @param {DateConfigTypes} type
   * @return {CSSProperties}
   *
   * @private
   */
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
   * Get Picker's text content styles if the day is weekend
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
      return pickerItem.type === 'day' && checkDayIsWeekend(pickerItem.value)
        ? {
            color: '#de3f18',
          }
        : {};
    },
    [selectedDate],
  );

  return (
    <React.Fragment>
      {pickerColumns.map((column, index) => {
        const caption = getPickerColumnsCaption(column.type);
        if (caption) {
          const { style = {}, text } = caption as PickerColumnCaption;
          return (
            <Caption
              key={`Picker_Caption_${column.type}_${index}`}
              columnSize={pickerColumns.length}
              className={classNamePrefix('caption')}
              style={style}
            >
              {text}
            </Caption>
          );
        }

        return (
          <Caption
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
