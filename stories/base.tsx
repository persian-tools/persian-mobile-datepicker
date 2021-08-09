import React from 'react';
// Storybook
import { ComponentMeta } from '@storybook/react';
// Local Components
import StoryWrapper from './wrapper/StoryWrapper';
// Picker Component
import { Picker } from '../src';
// Types
import type { Event } from '../src/components/WheelPicker/index.types';

interface Props {
  value: string;
  info?: string;
  events: Array<Event>;
}

export const BaseTemplate: React.FC<Props> = (props) => {
  return (
    <StoryWrapper>
      {props.info && <h3 className="info">{props.info}</h3>}
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
    argTypes: baseArgs,
    decorators: [(Story): JSX.Element => <Story />],
  };
}

export const baseArgs = {
  theme: {
    control: {
      type: 'inline-radio',
      options: ['light', 'dark', 'auto'],
      defaultValue: 'light',
    },
  },
  config: {
    control: {
      type: 'object',
    },
  },
  classNamePrefix: {
    name: 'classNamePrefix',
    description: 'Elements className may have a prefix',
    control: {
      type: 'text',
      defaultValue: 'persian-datepicker',
    },
  },
  title: {
    name: 'title',
    description: 'WheelPicker title',
    control: {
      type: 'text',
      defaultValue: '',
    },
  },
  minDate: {
    name: 'minDate',
    description: 'Specifies the minimum selectable day by user',
    control: {
      type: 'date',
    },
  },
  maxDate: {
    name: 'maxDate',
    description: 'Specifies the maximum selectable day by user',
    control: {
      type: 'date',
    },
  },
  endYear: {
    name: 'endYear',
    description: 'The Minimum selectable year',
    control: {
      type: 'number',
    },
  },
  startYear: {
    name: 'startYear',
    description: 'The Maximum selectable year',
    control: {
      type: 'number',
    },
  },
  addDayName: {
    name: 'addDayName',
    description: 'Add the name of the day of the week',
    control: {
      type: 'boolean',
      defaultValue: false,
    },
  },
  isOpen: {
    name: 'isOpen',
    description: 'Picker open status',
    control: {
      type: 'boolean',
      defaultValue: false,
    },
  },
  submitText: {
    name: 'submitText',
    description: 'Submit button text',
    control: {
      type: 'text',
      defaultValue: 'تایید',
    },
  },
  cancelText: {
    name: 'cancelText',
    description: 'Cancel button text',
    control: {
      type: 'text',
      defaultValue: 'انصراف',
    },
  },
  showCancelButton: {
    name: 'showCancelButton',
    description: 'Display Cancel button',
    control: {
      type: 'boolean',
      defaultValue: true,
    },
  },
  disableSheetDrag: {
    name: 'disableSheetDrag',
    description: 'Disable drag for the sheet content',
    control: {
      type: 'boolean',
      defaultValue: true,
    },
  },
  disableSheetHeaderDrag: {
    name: 'disableSheetHeaderDrag',
    description: 'Disable drag for the sheet header',
    control: {
      type: 'boolean',
      defaultValue: false,
    },
  },
  height: {
    name: 'height',
    description: 'Height of Picker Sheet modal',
    control: {
      type: 'number',
      defaultValue: 385,
      min: 385,
    },
  },
};
