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
  },
  month: {
    caption: {
      text: 'ماه',
    },
  },
  day: {
    caption: {
      text: 'روز',
    },
    formatter(value) {
      return digitsEnToFa(value.day);
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
