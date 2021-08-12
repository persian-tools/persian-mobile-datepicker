import React from 'react';
import { createBaseStory, BaseTemplate, baseArgs } from './base';
import { newDate, format, Picker, WheelPickerSelectEvent } from '../src'; // in your code: @persian-tools/persian-mobile-datepicker
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../src/components/WheelPicker/index.types';

const title = 'Getting Started/Highlight Weekends';
export default createBaseStory(title);

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

storiesOf(title, module).add(
  'Highlight Weekends',
  (args: any) => <BasePickerTemplate {...args} />,
  {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'light',
      highlightWeekends: true,
      config: {
        year: {},
        month: {},
        day: {},
      },
      initialValue: newDate({ year: 1400, month: 1, day: 6 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  },
);
