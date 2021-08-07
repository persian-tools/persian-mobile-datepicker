import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6',
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#f7f7f7',
      },
      {
        name: 'dark',
        value: '#333333',
      },
    ],
  },
};
