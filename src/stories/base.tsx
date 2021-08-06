import React from 'react';
// Storybook
import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
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

interface Props {
  value: string;
  events: Array<Event>;
}

export const BaseTemplate: React.FC<Props> = (props) => {
  return (
    <StoryWrapper>
      <p>تاریخ انتخابی:</p>
      <input type="string" readOnly value={props.value} className="input" />
      <p>رویداد های روز:</p>
      <ul>
        {props.events.map((event, index) => (
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
      {props.children}
    </StoryWrapper>
  );
};

export function createBaseStory(title: string): ComponentMeta<typeof Picker> {
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
