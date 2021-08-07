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
import { digitsEnToFa } from '@persian-tools/persian-tools';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../components/WheelPicker/index.types';

const title = 'Styling';
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
  .add('Columns Style', (args: any) => <BasePickerTemplate {...args} />, {
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
      initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  })
  .add('Column Items Style', (args: any) => <BasePickerTemplate {...args} />, {
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
          itemStyle: {
            color: '#6ea674',
            background: '#def6e2',
            height: 30,
            fontSize: '15px',
            lineHeight: '30px',
            borderRadius: 5,
          },
        },
        month: {
          caption: {
            text: 'ماه',
          },
          itemStyle: {
            color: '#404345',
            background: '#ddeafa',
            height: 30,
            fontSize: '15px',
            lineHeight: '30px',
            borderRadius: 5,
          },
        },
        day: {
          caption: {
            text: 'روز',
          },
          formatter(value: Record<string, any>) {
            return digitsEnToFa(value.day);
          },
          itemStyle: {
            color: '#404345',
            background: '#ddeafa',
            height: 30,
            fontSize: '15px',
            lineHeight: '30px',
            borderRadius: 5,
          },
        },
      },
      initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  })
  .add('Active Item Style', (args: any) => <BasePickerTemplate {...args} />, {
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
          selectedItemStyle: {
            color: '#215e25',
            backgroundColor: '#bae6c1',
          },
          itemStyle: {
            color: '#6ea674',
            background: '#def6e2',
            height: 30,
            fontSize: '15px',
            lineHeight: '30px',
            borderRadius: 5,
          },
        },
        month: {
          caption: {
            text: 'ماه',
          },
          selectedItemStyle: {
            color: '#215e25',
            backgroundColor: '#a5c7ef',
          },
          itemStyle: {
            color: '#404345',
            background: '#ddeafa',
            height: 30,
            fontSize: '15px',
            lineHeight: '30px',
            borderRadius: 5,
          },
        },
        day: {
          caption: {
            text: 'روز',
          },
          formatter(value: Record<string, any>) {
            return digitsEnToFa(value.day);
          },
          selectedItemStyle: {
            color: '#215e25',
            backgroundColor: '#a5c7ef',
          },
          itemStyle: {
            color: '#404345',
            background: '#ddeafa',
            height: 30,
            fontSize: '15px',
            lineHeight: '30px',
            borderRadius: 5,
          },
        },
      },
      initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  })
  .add(
    'Columns Caption Style',
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
              style: {
                fontSize: '1.2em',
                color: '#ade8b7',
              },
            },
            formatter(value: Record<string, any>) {
              return digitsEnToFa(value.year);
            },
            selectedItemStyle: {
              color: '#215e25',
              backgroundColor: '#bae6c1',
            },
            itemStyle: {
              color: '#6ea674',
              background: '#def6e2',
              height: 30,
              fontSize: '15px',
              lineHeight: '30px',
              borderRadius: 5,
            },
          },
          month: {
            caption: {
              text: 'ماه',
              style: {
                fontSize: '1.2em',
                color: '#84b4ec',
              },
            },
            selectedItemStyle: {
              color: '#215e25',
              backgroundColor: '#a5c7ef',
            },
            itemStyle: {
              color: '#404345',
              background: '#ddeafa',
              height: 30,
              fontSize: '15px',
              lineHeight: '30px',
              borderRadius: 5,
            },
          },
          day: {
            caption: {
              text: 'روز',
              style: {
                fontSize: '1.2em',
                color: '#84b4ec',
              },
            },
            formatter(value: Record<string, any>) {
              return digitsEnToFa(value.day);
            },
            selectedItemStyle: {
              color: '#215e25',
              backgroundColor: '#a5c7ef',
            },
            itemStyle: {
              color: '#404345',
              background: '#ddeafa',
              height: 30,
              fontSize: '15px',
              lineHeight: '30px',
              borderRadius: 5,
            },
          },
        },
        initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: baseArgs,
      badges: [BADGE.STABLE],
    },
  );
