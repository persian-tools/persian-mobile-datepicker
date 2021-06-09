import React from 'react';
import { WheelPicker } from './index';
import { Story } from '@storybook/react/types-6-0';
// Types
import type { Meta } from '@storybook/react/types-6-0';
import type { WheelPickerProps } from './index.types';

export default {
  title: 'Wheel Picker',
  component: WheelPicker,
  decorators: [(Story): JSX.Element => <Story />],
} as Meta<WheelPickerProps>;

const Template: Story<WheelPickerProps> = (args) => <WheelPicker {...args} />;

export const Default = Template.bind({});
Default.args = {};
