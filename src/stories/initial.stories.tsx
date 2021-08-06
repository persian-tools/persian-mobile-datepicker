import { createBaseStory, Template } from './base';
import { createDateInstance } from '../index';

export default createBaseStory('Picker With Sheet Modal');

export const PickerWithSheetModal = Template.bind({});
PickerWithSheetModal.args = {
  isOpen: true,
  theme: 'light',
  config: {
    year: {},
    month: {},
    day: {},
  },
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};
