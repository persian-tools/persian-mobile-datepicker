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

const title = 'Picker Accessibility';
export default createBaseStory(title);

const stories = storiesOf(title, module);

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

stories
  .add(
    'Submit and Cancel buttons text',
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
        submitText: 'تایید و انتخاب',
        cancelText: 'بستن',
        initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  )
  .add('Hide Cancel button', (args: any) => <BasePickerTemplate {...args} />, {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'auto',
      title: 'انتخاب تاریخ',
      highlightHolidays: true,
      highlightWeekends: true,
      config,
      showCancelButton: false,
      initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.EXPERIMENTAL],
  })
  .add('Bottom Sheet Title', (args: any) => <BasePickerTemplate {...args} />, {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'auto',
      title: 'انتخاب تاریخ',
      highlightHolidays: true,
      highlightWeekends: true,
      config,
      initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  })
  .add(
    'Drag for the sheet content',
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
        disableSheetDrag: false,
        disableSheetHeaderDrag: true,
        initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  )
  .add(
    'Drag for the sheet header',
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
        disableSheetDrag: true,
        disableSheetHeaderDrag: false,
        initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  )
  .add('ClassName Prefix', (args: any) => <BasePickerTemplate {...args} />, {
    component: Picker,
    args: {
      isOpen: true,
      theme: 'auto',
      title: 'انتخاب تاریخ',
      config,
      classNamePrefix: 'test',
      initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  });
