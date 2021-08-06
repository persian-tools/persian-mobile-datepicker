import { createDateInstance } from '../index';
import { createBaseStory, Template } from './base';

export default createBaseStory('Highlight Weekends');

export const HighlightWeekends = Template.bind({});
HighlightWeekends.args = {
  isOpen: true,
  theme: 'light',
  highlightWeekends: true,
  config: {
    year: {},
    month: {},
    day: {},
  },
  initialValue: createDateInstance({ year: 1400, month: 1, day: 6 }),
};
