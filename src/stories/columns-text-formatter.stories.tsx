import React from 'react';
import { createBaseStory, BaseTemplate, baseArgs } from './base';
import { newDate, format, Picker, WheelPickerSelectEvent } from '../index'; // in your code: @persian-tools/persian-mobile-datepicker
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { digitsEnToFa, numberToWords } from '@persian-tools/persian-tools';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../components/WheelPicker/index.types';

const title = 'Columns Text Formatter';
export default createBaseStory(title);

const stories = storiesOf(title, module);

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

stories
  .add(
    'Convert Year digits to Farsi',
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
        initialValue: newDate({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  )
  .add(
    'Convert Year and Day digits to Persian Words',
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
            formatter({ year }) {
              if (1300 <= year && year < 1400) {
                return numberToWords(year - 1300);
              } else if (1400 <= year && year <= 1450) {
                return numberToWords(year - 1000);
              }
              return numberToWords(year);
            },
            itemStyle: {
              fontSize: '12px',
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
            itemStyle: {
              fontSize: '13px',
            },
            formatter({ day }) {
              return numberToWords(day, {
                ordinal: true,
              });
            },
          },
        },
        initialValue: newDate({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  )
  .add('Custom Month name', (args: any) => <BasePickerTemplate {...args} />, {
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
          formatter({ month }) {
            return {
              1: 'فروردین',
              2: 'اردی بهشت',
              3: 'خرداد',
              4: 'تیر',
              5: 'آمرداد',
              6: 'شهریور',
              7: 'مهر',
              8: 'آبان',
              9: 'آذر',
              10: 'دی',
              11: 'بهمن',
              12: 'اسفند',
            }[month];
          },
        },
        day: {
          caption: {
            text: 'روز',
          },
        },
      },
      initialValue: newDate({ year: 1400, month: 1, day: 1 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  });
