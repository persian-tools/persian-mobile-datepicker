import React from 'react';
import { createBaseStory, BaseTemplate } from './base';
import {
  createDateInstance,
  format,
  Picker,
  WheelPickerSelectEvent,
} from '../index'; // in your code: @persian-tools/persian-mobile-datepicker
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { digitsEnToFa } from '@persian-tools/persian-tools';
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../components/WheelPicker/index.types';

export default createBaseStory('Columns with styles');

const stories = storiesOf('persian-mobile-datepicker', module);

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

const firstColumnsStylesConfig = {
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
    selectedItemStyle: {
      color: '#43a047',
    },
  },
  month: {
    caption: {
      text: 'ماه',
    },
    columnStyle: {
      background: '#dbe9f8',
    },
    itemStyle: {
      color: '#1444d9',
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
    itemStyle: {
      color: '#1444d9',
    },
  },
};

const secondColumnsStylesConfig = {
  year: {
    caption: {
      text: 'سال',
    },
    formatter(value: Record<string, any>) {
      return digitsEnToFa(value.year);
    },
    selectedItemStyle: {
      color: '#215e25',
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
};

stories
  .add(
    'Columns with styles 1',
    (args: any) => <BasePickerTemplate {...args} />,
    {
      component: Picker,
      args: {
        isOpen: true,
        theme: 'auto',
        highlightHolidays: true,
        highlightWeekends: true,
        config: firstColumnsStylesConfig,
        initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: {
        theme: {
          control: {
            type: 'inline-radio',
            options: ['light', 'dark', 'auto'],
          },
        },
      },
    },
  )
  .add(
    'Columns with styles 2',
    (args: any) => <BasePickerTemplate {...args} />,
    {
      component: Picker,
      args: {
        isOpen: true,
        theme: 'auto',
        highlightHolidays: true,
        highlightWeekends: true,
        config: secondColumnsStylesConfig,
        initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
      },
      argTypes: {
        theme: {
          control: {
            type: 'inline-radio',
            options: ['light', 'dark', 'auto'],
          },
        },
      },
    },
  );
