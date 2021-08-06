import { createBaseStory, Template } from './base';
import { createDateInstance } from '../index';
import { digitsEnToFa } from '@persian-tools/persian-tools';
// Types
import type { DatePickerConfig } from '../index';

export default createBaseStory('Columns Text Formatter');

export const ColumnsTextFormatter = Template.bind({});
const ColumnsTextFormatterConfig: DatePickerConfig = {
  year: {
    caption: {
      text: 'سال',
      style: {
        color: '#1672ec',
      },
    },
    formatter(value) {
      return digitsEnToFa(value.year);
    },
  },
  month: {
    caption: {
      text: 'ماه',
      style: {
        color: '#1672ec',
      },
    },
  },
  day: {
    caption: {
      text: 'روز',
      style: {
        color: '#1672ec',
      },
    },
    formatter(value) {
      return digitsEnToFa(value.day);
    },
  },
};
ColumnsTextFormatter.args = {
  isOpen: true,
  theme: 'light',
  highlightHolidays: true,
  highlightWeekends: true,
  config: ColumnsTextFormatterConfig,
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};
