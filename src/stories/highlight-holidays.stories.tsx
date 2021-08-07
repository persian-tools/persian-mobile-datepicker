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
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../components/WheelPicker/index.types';

export default createBaseStory('Highlight Holidays');

const stories = storiesOf('Highlight Holidays', module);

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
  'Highlight Holidays',
  (args: any) => <BasePickerTemplate {...args} />,
  {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'auto',
      highlightHolidays: true,
      highlightWeekends: true,
      config: {
        year: {},
        month: {},
        day: {},
      },
      initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
    },
    argTypes: baseArgs,
  },
);
