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
  options: {
    panelPosition: 'right',
    toolbar: {
      Docs: { hidden: true },
    },
    showRoot: true,
    storySort: {
      order: [
        'Overview',
        'Getting Started',
        'Filters',
        'Date Range',
        'Text Formatter',
        'Accessibility',
        'Styling',
      ],
    },
  },
};

const storybookLayout = JSON.parse(
  window.localStorage.getItem('storybook-layout'),
);
if (
  storybookLayout &&
  storybookLayout.resizerPanel &&
  storybookLayout.resizerPanel.x
) {
  storybookLayout.resizerPanel.x = window.innerWidth - 300;
  window.localStorage.setItem(
    'storybook-layout',
    JSON.stringify(storybookLayout),
  );
}
