import React from 'react';
import { createBaseStory, BaseTemplate, baseArgs } from '../base';
import { newDate, format, Picker, WheelPickerSelectEvent } from '../../src'; // in your code: @persian-tools/persian-mobile-datepicker
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../../src/components/WheelPicker/index.types';

const title = 'Date Range/Min and Max Date';

export default createBaseStory(title);

const config = {
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
  },
};

const BasePickerTemplate: ComponentStory<typeof Picker & { info: string }> = (
  args,
) => {
  const { info, ...pickerArgs } = args;
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
    <BaseTemplate
      value={selectedDateValue!}
      events={selectedDateEvents!}
      info={info}
    >
      <Picker
        {...pickerArgs}
        onChange={handleEvent('onChange')}
        onSubmit={handleEvent('onSubmit')}
      />
    </BaseTemplate>
  );
};

storiesOf(title, module).add(
  'Min and Max Date',
  (args: any) => <BasePickerTemplate {...args} />,
  {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'auto',
      title: 'انتخاب تاریخ در بازه فروردین تا مرداد',
      highlightHolidays: true,
      highlightWeekends: true,
      config,
      minDate: newDate({ year: 1399, month: 9, day: 11 }),
      maxDate: newDate({ year: 1400, month: 9, day: 11 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  },
);
