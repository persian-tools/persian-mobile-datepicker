import { createBaseStory, Template } from './base';
import { createDateInstance } from '../index';
// Types
import type { DatePickerConfig } from '../index';

export default createBaseStory('Columns Caption With Styles');

export const ColumnsCaptionWithStyles = Template.bind({});
const ColumnsCaptionWithStyleConfig: DatePickerConfig = {
  year: {
    caption: {
      text: 'سال',
      style: {
        color: '#1672ec',
      },
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
  },
};
ColumnsCaptionWithStyles.args = {
  isOpen: true,
  highlightHolidays: true,
  highlightWeekends: true,
  config: ColumnsCaptionWithStyleConfig,
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};
