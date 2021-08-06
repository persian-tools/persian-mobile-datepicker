import React from 'react';
import { createBaseStory, BaseTemplate } from './base';
import {
  createDateInstance,
  format,
  Picker,
  WheelPickerSelectEvent,
} from '../index';
// Types
import type { DatePickerConfig } from '../index';
import { ComponentStory } from '@storybook/react';
import { PickerProps } from '../index.types';
import { action } from '@storybook/addon-actions';
import type { Event } from '../components/WheelPicker/index.types';

export default createBaseStory('Columns Caption With Styles');

const Template: ComponentStory<typeof Picker> = (args) => {
  const pickerProps = { theme: 'light', ...args } as Required<PickerProps>;
  const [selectedDateValue, setSelectedDateValue] = React.useState<string>();
  const [selectedDateEvents, setSelectedDateEvents] = React.useState<
    Array<Event>
  >([]);

  function handleOnChange(data: WheelPickerSelectEvent) {
    setSelectedDateValue(format(data.date!, 'd MMMM yyyy'));
    setSelectedDateEvents(data.events);
    action('onClick')(data);
  }

  return (
    <BaseTemplate value={selectedDateValue!} events={selectedDateEvents!}>
      <Picker
        {...pickerProps}
        onChange={handleOnChange}
        onSubmit={handleOnChange}
      />
    </BaseTemplate>
  );
};

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
  theme: 'light',
  highlightHolidays: true,
  highlightWeekends: true,
  config: ColumnsCaptionWithStyleConfig,
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};
