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

export default createBaseStory('Initial design');

const stories = storiesOf('Initial design', module);

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

stories.add('Initial design', (args: any) => <BasePickerTemplate {...args} />, {
  component: Picker,
  args: {
    isOpen: true,
    theme: 'auto',
    config: {
      year: {},
      month: {},
      day: {},
    },
    initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
  },
  argTypes: baseArgs,
  badges: [BADGE.STABLE],
});
