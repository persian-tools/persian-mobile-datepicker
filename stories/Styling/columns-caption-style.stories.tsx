import React from 'react';
import { newDate, format, Picker } from '../../src'; // in your code: @persian-tools/persian-mobile-datepicker
import { createBaseStory, BaseTemplate, baseArgs } from '../base';
import { storiesOf } from '@storybook/react';
import { digitsEnToFa } from '@persian-tools/persian-tools';
import { action } from '@storybook/addon-actions';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
// Types
import type { ComponentStory } from '@storybook/react';
import type { Event } from '../../src/components/WheelPicker/index.types';
import type { WheelPickerSelectEvent } from '../../src'; // in your code: @persian-tools/persian-mobile-datepicker

const title = 'Styling/Columns Caption Style';
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
      initialValue: newDate({ year: 1400, month: 1, day: 1 }),
    },
    argTypes: baseArgs,
    badges: [BADGE.STABLE],
  },
);
