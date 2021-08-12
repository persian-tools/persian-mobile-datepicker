import React from 'react';
import { createBaseStory, BaseTemplate, baseArgs } from '../base';
import { newDate, format, Picker, WheelPickerSelectEvent } from '../../src'; // in your code: @persian-tools/persian-mobile-datepicker
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../../src/components/WheelPicker/index.types';

const title = 'Filters/Hide friday in all Years';
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
  'Hide friday in all Years',
  (args: any) => (
    <BasePickerTemplate
      {...args}
      info="جلوگیری از نمایش روز های جمعه تمام سال ها"
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
          shouldRender: ({ weekDay }) => weekDay !== 6,
        },
      },
      initialValue: newDate({ year: 1400, month: 2, day: 1 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  },
);
