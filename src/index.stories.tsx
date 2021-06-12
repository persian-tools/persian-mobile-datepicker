import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { digitsEnToFa } from '@persian-tools/persian-tools';
import { createDateInstance, DatePickerConfig, Picker } from './index';
import { PickerProps } from './index.types';

export default {
  title: 'Picker with Sheet modal',
  component: Picker,
  argTypes: {
    theme: {
      control: {
        type: 'inline-radio',
        options: ['light', 'dark'],
      },
    },
  },
  decorators: [(Story): JSX.Element => <Story />],
} as Meta<PickerProps>;

const Template: Story<PickerProps> = (args) => <Picker {...args} />;

const pickerConfig: DatePickerConfig = {
  year: {},
  month: {},
  day: {},
};

export const Initial = Template.bind({});
Initial.args = {
  isOpen: true,
  config: pickerConfig,
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};

export const HighlightWeekends = Template.bind({});
HighlightWeekends.args = {
  isOpen: true,
  highlightWeekends: true,
  config: pickerConfig,
  initialValue: createDateInstance({ year: 1400, month: 1, day: 6 }),
};

export const HighlightHolidays = Template.bind({});
HighlightHolidays.args = {
  isOpen: true,
  highlightHolidays: true,
  highlightWeekends: true,
  config: pickerConfig,
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};

export const ColumnsCaption = Template.bind({});
const ColumnsCaptionConfig: DatePickerConfig = {
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
ColumnsCaption.args = {
  isOpen: true,
  highlightHolidays: true,
  highlightWeekends: true,
  config: ColumnsCaptionConfig,
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};

export const ColumnsCaptionWithCSSStyle = Template.bind({});
const ColumnsCaptionWithStyleConfig: DatePickerConfig = {
  year: {
    caption: {
      text: 'سال',
      style: {
        color: '#1672ec',
      },
    },
  },
  month: {
    caption: {
      text: 'ماه',
      style: {
        color: '#1672ec',
      },
    },
  },
  day: {
    caption: {
      text: 'روز',
      style: {
        color: '#1672ec',
      },
    },
  },
};
ColumnsCaptionWithCSSStyle.args = {
  isOpen: true,
  highlightHolidays: true,
  highlightWeekends: true,
  config: ColumnsCaptionWithStyleConfig,
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};

export const ColumnsTextFormatter = Template.bind({});
const ColumnsTextFormatterConfig: DatePickerConfig = {
  year: {
    caption: {
      text: 'سال',
      style: {
        color: '#1672ec',
      },
    },
    formatter(value) {
      return digitsEnToFa(value.year);
    },
  },
  month: {
    caption: {
      text: 'ماه',
      style: {
        color: '#1672ec',
      },
    },
  },
  day: {
    caption: {
      text: 'روز',
      style: {
        color: '#1672ec',
      },
    },
    formatter(value) {
      return digitsEnToFa(value.day);
    },
  },
};
ColumnsTextFormatter.args = {
  isOpen: true,
  highlightHolidays: true,
  highlightWeekends: true,
  config: ColumnsTextFormatterConfig,
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};

export const ColumnsWithStyles = Template.bind({});
const ColumnsWithStylesConfig: DatePickerConfig = {
  year: {
    caption: {
      text: 'سال',
    },
    formatter(value) {
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
    formatter(value) {
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
ColumnsWithStyles.args = {
  isOpen: true,
  highlightHolidays: true,
  highlightWeekends: true,
  config: ColumnsWithStylesConfig,
  initialValue: createDateInstance({ year: 1400, month: 1, day: 1 }),
};
