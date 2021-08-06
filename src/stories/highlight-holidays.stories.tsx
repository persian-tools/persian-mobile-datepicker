import { createBaseStory, Template } from './base';
import { createDateInstance } from '../index';

export default createBaseStory('Highlight Holidays');

export const HighlightHolidays = Template.bind({});
HighlightHolidays.args = {
  isOpen: true,
  highlightHolidays: true,
  highlightWeekends: true,
  config: {
    year: {},
    month: {},
    day: {},
  },
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};
