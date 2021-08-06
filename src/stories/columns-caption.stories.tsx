import { createDateInstance } from '../index';
import { createBaseStory, Template } from './base';
// Types
import type { DatePickerConfig } from '../index';

export default createBaseStory('Columns Caption');

export const ColumnsCaption = Template.bind({});
const ColumnsCaptionConfig: DatePickerConfig = {
  year: {
    caption: {
      text: 'سال',
    },
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
  },
};
ColumnsCaption.args = {
  isOpen: true,
  theme: 'light',
  highlightHolidays: true,
  highlightWeekends: true,
  config: ColumnsCaptionConfig,
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};
