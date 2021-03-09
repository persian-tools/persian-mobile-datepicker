import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Picker, { PickerProps } from './index';

export default {
  title: 'Base Picker',
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

export const Default = Template.bind({});
Default.args = {
  theme: 'light',
};
