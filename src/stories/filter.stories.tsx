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

const title = 'Specific filters';

export default createBaseStory(title);

const stories = storiesOf(title, module);

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
  .add(
    'Hide a Year',
    (args: any) => (
      <BasePickerTemplate {...args} info="جلوگیری از نمایش سال ۱۴۰۱" />
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
            shouldRender: ({ year }) => year !== 1401,
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
        },
        initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  )
  .add(
    'Hide a Month',
    (args: any) => (
      <BasePickerTemplate
        {...args}
        info="جلوگیری از نمایش ماه اردیبهشت در تمام سال ها"
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
            shouldRender: ({ month }) => month !== 2,
          },
          day: {
            caption: {
              text: 'روز',
            },
          },
        },
        initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  )
  .add(
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
        initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  )
  .add(
    'Hide a Day of a specific Year',
    (args: any) => (
      <BasePickerTemplate
        {...args}
        info="جلوگیری از نمایش اولین روز سال ۱۴۰۱"
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
            shouldRender: ({ dayOfYear, year }) =>
              year === 1401 ? dayOfYear !== 1 : true,
          },
        },
        initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  )
  .add(
    'Hide a day of a Month in a specific Year',
    (args: any) => (
      <BasePickerTemplate
        {...args}
        info="جلوگیری از نمایش اولین روز ادیبهشت ماه سال ۱۴۰۱"
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
            shouldRender: ({ day, year, month }) =>
              year === 1401 && month === 2 ? day !== 1 : true,
          },
        },
        initialValue: createDateInstance({ year: 1400, month: 2, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  )
  .add(
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
        initialValue: createDateInstance({ year: 1400, month: 2, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  )
  .add(
    'Hide holidays in all Years',
    (args: any) => (
      <BasePickerTemplate
        {...args}
        info="جلوگیری از نمایش تعطیلات رسمی در تمام سال ها"
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
            shouldRender: ({ isHoliday }) => !isHoliday,
          },
        },
        initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  )
  .add(
    'Hide holidays in a specific Year',
    (args: any) => (
      <BasePickerTemplate
        {...args}
        info="جلوگیری از نمایش تعطیلات رسمی در سال ۱۴۰۰"
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
            shouldRender: ({ isHoliday, year }) =>
              year === 1400 ? !isHoliday : true,
          },
        },
        initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  )
  .add(
    'Hide Leap Years',
    (args: any) => (
      <BasePickerTemplate {...args} info="جلوگیری از نمایش سالهای کبیسه" />
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
            shouldRender: ({ isLeapYear }) => !isLeapYear,
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
        },
        initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  );
