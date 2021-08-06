import { createDateInstance } from '../index';
import { createBaseStory, Template } from './base';
import { digitsEnToFa } from '@persian-tools/persian-tools';
// Types
import type { DatePickerConfig } from '../index';

export default createBaseStory('Columns with styles');

export const FirstColumnsStyles = Template.bind({});
const FirstColumnsStylesConfig: DatePickerConfig = {
  year: {
    caption: {
      text: 'سال',
    },
    formatter(value) {
      return digitsEnToFa(value.year);
    },
    columnStyle: {
      background: '#f5e2A0',
    },
    selectedItemStyle: {
      color: '#43a047',
    },
  },
  month: {
    caption: {
      text: 'ماه',
    },
    columnStyle: {
      background: '#dbe9f8',
    },
    itemStyle: {
      color: '#1444d9',
    },
  },
  day: {
    caption: {
      text: 'روز',
    },
    formatter(value) {
      return digitsEnToFa(value.day);
    },
    columnStyle: {
      background: '#dbe9f8',
    },
    itemStyle: {
      color: '#1444d9',
    },
  },
};
FirstColumnsStyles.args = {
  isOpen: true,
  height: 400,
  highlightHolidays: true,
  highlightWeekends: true,
  config: FirstColumnsStylesConfig,
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};

export const SecondColumnsStyles = Template.bind({});
const SecondColumnsStylesConfig: DatePickerConfig = {
  year: {
    caption: {
      text: 'سال',
    },
    formatter(value) {
      return digitsEnToFa(value.year);
    },
    selectedItemStyle: {
      color: '#215e25',
    },
    itemStyle: {
      color: '#6ea674',
      background: '#def6e2',
      height: 30,
      fontSize: '15px',
      lineHeight: '30px',
      borderRadius: 5,
    },
  },
  month: {
    caption: {
      text: 'ماه',
    },
    itemStyle: {
      color: '#404345',
      background: '#ddeafa',
      height: 30,
      fontSize: '15px',
      lineHeight: '30px',
      borderRadius: 5,
    },
  },
  day: {
    caption: {
      text: 'روز',
    },
    formatter(value) {
      return digitsEnToFa(value.day);
    },
    itemStyle: {
      color: '#404345',
      background: '#ddeafa',
      height: 30,
      fontSize: '15px',
      lineHeight: '30px',
      borderRadius: 5,
    },
  },
};
SecondColumnsStyles.args = {
  isOpen: true,
  height: 400,
  highlightHolidays: true,
  highlightWeekends: true,
  config: SecondColumnsStylesConfig,
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};
