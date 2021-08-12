import React from 'react';
import { createBaseStory, BaseTemplate, baseArgs } from '../base';
import { newDate, format, Picker, WheelPickerSelectEvent } from '../../src'; // in your code: @persian-tools/persian-mobile-datepicker
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../../src/components/WheelPicker/index.types';

const title = 'Filters/Hide a Day of Year(s)';
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
  'Hide a Day of Year(s)',
  (args: any) => (
    <BasePickerTemplate
      {...args}
      info="جلوگیری از نمایش اولین روز سال تمام سال ها"
    />
  ),
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
          shouldRender: ({ dayOfYear }) => dayOfYear !== 1,
        },
      },
      initialValue: newDate({ year: 1400, month: 1, day: 1 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  },
);
