import React from 'react';
import { newDate, format, Picker } from '../../src'; // in your code: @persian-tools/persian-mobile-datepicker
import { createBaseStory, BaseTemplate, baseArgs } from '../base';
import { storiesOf } from '@storybook/react';
import { digitsEnToFa } from '@persian-tools/persian-tools';
import { action } from '@storybook/addon-actions';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../../src/components/WheelPicker/index.types';
import type { WheelPickerSelectEvent } from '../../src'; // in your code: @persian-tools/persian-mobile-datepicker

const title = 'Styling/Columns Style';
export default createBaseStory(title);

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

storiesOf(title, module).add(
  'Columns Style',
  (args: any) => <BasePickerTemplate {...args} />,
  {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'auto',
      highlightHolidays: true,
      highlightWeekends: true,
      config: {
        year: {
          caption: {
            text: 'سال',
          },
          formatter(value: Record<string, any>) {
            return digitsEnToFa(value.year);
          },
          columnStyle: {
            background: '#f5e2A0',
          },
        },
        month: {
          caption: {
            text: 'ماه',
          },
          columnStyle: {
            background: '#dbe9f8',
          },
        },
        day: {
          caption: {
            text: 'روز',
          },
          formatter(value: Record<string, any>) {
            return digitsEnToFa(value.day);
          },
          columnStyle: {
            background: '#dbe9f8',
          },
        },
      },
      initialValue: newDate({ year: 1400, month: 1, day: 1 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  },
);
