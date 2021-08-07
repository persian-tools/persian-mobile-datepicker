import React from 'react';
import { createBaseStory, BaseTemplate, baseArgs } from './base';
import { newDate, format, Picker, WheelPickerSelectEvent } from '../index'; // in your code: @persian-tools/persian-mobile-datepicker
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { digitsEnToFa } from '@persian-tools/persian-tools';
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../components/WheelPicker/index.types';

export default createBaseStory('Dark Theme');

const stories = storiesOf('Dark Theme', module);

const configs = {
  year: {
    caption: {
      text: 'سال',
    },
    formatter(value: Record<string, any>) {
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

  function handleEvent(eventType: string) {
    return (data: WheelPickerSelectEvent) => {
      setSelectedDateValue(format(data.date!, 'd MMMM yyyy'));
      setSelectedDateEvents(data.events);
      action(eventType)(data);
    };
  }

  return (
    <BaseTemplate value={selectedDateValue!} events={selectedDateEvents!}>
      <Picker
        {...args}
        onChange={handleEvent('onChange')}
        onSubmit={handleEvent('onSubmit')}
      />
    </BaseTemplate>
  );
};

stories.add('Dark Theme', (args: any) => <BasePickerTemplate {...args} />, {
  component: Picker,
  args: {
    isOpen: true,
    theme: 'dark',
    highlightHolidays: true,
    highlightWeekends: true,
    config: configs,
    initialValue: newDate({ year: 1400, month: 1, day: 1 }),
  },
  argTypes: baseArgs,
  backgrounds: {
    default: 'dark',
  },
  badges: [BADGE.EXPERIMENTAL],
});
