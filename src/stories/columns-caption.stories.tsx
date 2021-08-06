import React from 'react';
import { createDateInstance } from '../index';
import { createBaseStory, Template as Picker } from './base';

export default createBaseStory('Columns Caption');

export const ColumnsCaption = () => (
  <Picker
    isOpen
    highlightHolidays
    highlightWeekends
    config={{
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
    }}
    initialValue={createDateInstance({ year: 1400, month: 1, day: 1 })}
  />
);
