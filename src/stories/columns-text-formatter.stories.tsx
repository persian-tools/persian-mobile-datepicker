import React from 'react';
import { createBaseStory, BaseTemplate } from './base';
import {
  createDateInstance,
  format,
  Picker,
  WheelPickerSelectEvent,
} from '../index'; // in your code: @persian-tools/persian-mobile-datepicker
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { digitsEnToFa } from '@persian-tools/persian-tools';
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../components/WheelPicker/index.types';

export default createBaseStory('Columns Text Formatter');

const stories = storiesOf('persian-mobile-datepicker', module);

const configs = {
  year: {
    caption: {
      text: 'سال',
      style: {
        color: '#1672ec',
      },
    },
    formatter(value: Record<string, any>) {
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
    formatter(value: Record<string, any>) {
      return digitsEnToFa(value.day);
    },
  },
};

const BasePickerTemplate: ComponentStory<typeof Picker> = (args) => {
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
      <Picker {...args} onChange={handleOnChange} onSubmit={handleOnChange} />
    </BaseTemplate>
  );
};

stories.add(
  'Columns Text Formatter',
  (args: any) => <BasePickerTemplate {...args} />,
  {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'auto',
      highlightHolidays: true,
      highlightWeekends: true,
      config: configs,
      initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
    },
    argTypes: {
      theme: {
        control: {
          type: 'inline-radio',
          options: ['light', 'dark', 'auto'],
        },
      },
    },
  },
);
