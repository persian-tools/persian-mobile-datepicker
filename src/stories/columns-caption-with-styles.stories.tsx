import React from 'react';
import { createBaseStory, BaseTemplate, baseArgs } from './base';
import {
  createDateInstance,
  format,
  Picker,
  WheelPickerSelectEvent,
} from '../index'; // in your code: @persian-tools/persian-mobile-datepicker
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../components/WheelPicker/index.types';

export default createBaseStory('Columns Caption With Styles');

const stories = storiesOf('Columns Caption With Styles', module);

const configs = {
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
    },
    columnStyle: { background: '#aaa', color: 'green' },
    itemStyle: { color: 'green' },
    selectedItemStyle: { color: 'blue' },
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

stories.add(
  'Columns Caption With Styles',
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
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  },
);
