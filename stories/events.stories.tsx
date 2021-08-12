import React from 'react';
import { createBaseStory, BaseTemplate, baseArgs } from './base';
import { newDate, format, Picker, WheelPickerSelectEvent } from '../src'; // in your code: @persian-tools/persian-mobile-datepicker
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../src/components/WheelPicker/index.types';

const title = 'Getting Started/Events';
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
    <BaseTemplate
      value={selectedDateValue!}
      events={selectedDateEvents!}
      info="برای مشاهده ایونت ها، از پنل پایین، بر روی تب Actions کلیک کنید"
    >
      <Picker
        {...args}
        onChange={handleEvent('onChange')}
        onSubmit={handleEvent('onSubmit')}
        onCancel={action('onCancel')}
        onClose={action('onClose')}
      />
    </BaseTemplate>
  );
};

storiesOf(title, module).add(
  'Events',
  (args: any) => <BasePickerTemplate {...args} />,
  {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'auto',
      title: 'انتخاب تاریخ',
      highlightHolidays: true,
      highlightWeekends: true,
      config,
      initialValue: newDate({ year: 1400, month: 1, day: 1 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  },
);
