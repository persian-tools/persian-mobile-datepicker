import React from 'react';
import { createBaseStory, BaseTemplate, baseArgs } from './base';
import {
  createDateInstance,
  format,
  Picker,
  WheelPickerSelectEvent,
} from '../index'; // in your code: @persian-tools/persian-mobile-datepicker
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../components/WheelPicker/index.types';

const title = 'Max and Min Date';

export default createBaseStory(title);

const stories = storiesOf('Date Range', module);

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

stories
  .add('Min and Max Date', (args: any) => <BasePickerTemplate {...args} />, {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'auto',
      title: 'انتخاب تاریخ در بازه فروردین تا مرداد',
      highlightHolidays: true,
      highlightWeekends: true,
      config,
      initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
      minDate: createDateInstance({ year: 1400, month: 1, day: 1 }),
      maxDate: createDateInstance({ year: 1400, month: 5, day: 31 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  })
  .add('Min Date', (args: any) => <BasePickerTemplate {...args} />, {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'auto',
      title: 'انتخاب تاریخ از خرداد ماه به بعد',
      highlightHolidays: true,
      highlightWeekends: true,
      config,
      initialValue: createDateInstance({ year: 1396, month: 3, day: 1 }),
      minDate: createDateInstance({ year: 1396, month: 3, day: 1 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  })
  .add('Max Date', (args: any) => <BasePickerTemplate {...args} />, {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'auto',
      title: 'انتخاب تاریخ از ۲۰ خرداد ۱۳۹۶',
      highlightHolidays: true,
      highlightWeekends: true,
      config,
      initialValue: createDateInstance({ year: 1396, month: 3, day: 20 }),
      maxDate: createDateInstance({ year: 1396, month: 3, day: 20 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  })
  .add('Max Year', (args: any) => <BasePickerTemplate {...args} />, {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'auto',
      title: 'انتخاب تاریخ از ۲۰ خرداد ۱۳۹۶ تا پایان سال ۱۳۹۸',
      highlightHolidays: true,
      highlightWeekends: true,
      config,
      initialValue: createDateInstance({ year: 1396, month: 3, day: 20 }),
      endYear: 1398,
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  })
  .add('Min Year', (args: any) => <BasePickerTemplate {...args} />, {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'auto',
      title: 'انتخاب تاریخ از ۱۳۸۰',
      highlightHolidays: true,
      highlightWeekends: true,
      config,
      initialValue: createDateInstance({ year: 1396, month: 3, day: 20 }),
      startYear: 1380,
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  })
  .add('Min and Max Year', (args: any) => <BasePickerTemplate {...args} />, {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'auto',
      title: 'انتخاب تاریخ از ۱۳۸۰',
      highlightHolidays: true,
      highlightWeekends: true,
      config,
      initialValue: createDateInstance({ year: 1388, month: 3, day: 20 }),
      startYear: 1380,
      endYear: 1388,
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  })
  .add(
    'Min, Max Year and Min, Max Date Range',
    (args: any) => (
      <BasePickerTemplate
        {...args}
        info="در حالتی که minDate و maxDate به کامپوننت داده شود، مقادیر ورودی minYear و maxYear نادیده گرفته میشود"
      />
    ),
    {
      component: Picker,
      args: {
        isOpen: true,
        theme: 'auto',
        title: 'انتخاب تاریخ از ۱۳۹۰',
        highlightHolidays: true,
        highlightWeekends: true,
        config,
        initialValue: createDateInstance({ year: 1390, month: 1, day: 1 }),
        minDate: createDateInstance({ year: 1390, month: 1, day: 1 }),
        maxDate: createDateInstance({ year: 1400, month: 5, day: 31 }),
        startYear: 1389,
        endYear: 1399,
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  );
