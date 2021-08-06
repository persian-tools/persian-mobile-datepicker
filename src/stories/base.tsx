import React from 'react';
// Storybook
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
// Local Components
import StoryWrapper from './wrapper/StoryWrapper';
// Picker Component
import { Picker } from '../index';
// Picker Utilities
import { format } from '../index';
// Types
import type { PickerProps } from '../index.types';
import type { WheelPickerSelectEvent } from '../index';
import type { Event } from '../components/WheelPicker/index.types';

export const Template: Story<Partial<PickerProps>> = (args) => {
  const pickerProps = args as Required<PickerProps>;
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
    <StoryWrapper>
      <p>تاریخ انتخابی:</p>
      <input
        type="string"
        readOnly
        value={selectedDateValue}
        className="input"
      />
      <p>رویداد های روز:</p>
      <ul>
        {selectedDateEvents.map((event, index) => (
          <li key={`events_${index}`}>
            <label className="event-label">
              دسته بندی: <span className="event-label-value">{event.type}</span>
            </label>
            <label className="event-label">
              عنوان: <span className="event-label-value">{event.title}</span>
            </label>
          </li>
        ))}
      </ul>
      <Picker
        {...pickerProps}
        onChange={handleOnChange}
        onSubmit={handleOnChange}
      />
    </StoryWrapper>
  );
};

export function createBaseStory(title: string): Meta<PickerProps> {
  return {
    title,
    component: Picker,
    argTypes: {
      theme: {
        control: {
          type: 'inline-radio',
          options: ['light', 'dark'],
        },
      },
    },
    parameters: {
      docs: {
        source: {
          type: 'code',
        },
      },
    },
    decorators: [(Story): JSX.Element => <Story />],
  };
}
