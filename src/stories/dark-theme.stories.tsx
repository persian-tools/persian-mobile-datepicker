import { createDateInstance } from '../index';
import { createBaseStory, Template } from './base';
import { digitsEnToFa } from '@persian-tools/persian-tools';
// Types
import type { DatePickerConfig } from '../index';

export default createBaseStory('Dark Theme');

export const DarkTheme = Template.bind({});
const DarkThemeConfig: DatePickerConfig = {
  year: {
    caption: {
      text: 'سال',
    },
    formatter(value) {
      return digitsEnToFa(value.year);
    },
    columnStyle: {},
    selectedItemStyle: {
      background: '#7048ec',
    },
    itemStyle: {
      background: '#313133',
      height: 30,
      fontSize: '15px',
      lineHeight: '30px',
      borderRadius: 5,
      color: '#fff',
    },
  },
  month: {
    caption: {
      text: 'ماه',
    },
    itemStyle: {
      background: '#313133',
      height: 30,
      fontSize: '15px',
      lineHeight: '30px',
      borderRadius: 5,
      color: '#fff',
    },
    selectedItemStyle: {
      background: '#7048ec',
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
      color: '#fff',
      background: '#313133',
      height: 30,
      fontSize: '15px',
      lineHeight: '30px',
      borderRadius: 5,
    },
    selectedItemStyle: {
      background: '#7048ec',
    },
  },
};
DarkTheme.args = {
  isOpen: true,
  height: 400,
  highlightHolidays: true,
  highlightWeekends: true,
  theme: 'dark',
  config: DarkThemeConfig,
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};
