import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withConsole } from '@storybook/addon-console';
import { addDecorator } from '@storybook/react';

addDecorator((storyFn, context) =>
  withConsole({
    panelExclude: [
      /Warning/,
      /error/,
      /warn/,
      /Error/,
      /Illegal mix/,
      /Ignored an update to unaccepted module/,
      /but no exported stories/,
      /a story file/,
    ],
    // consoleExclude: [
    //   /error/,
    //   /warn/,
    //   /Warning/,
    //   /Error/,
    //   /Ignored an update to unaccepted module/,
    //   /`waring message`/,
    //   /Illegal mix/,
    //   /`Found a story file for`/,
    //   /but no exported stories/,
    // ],
  })(storyFn)(context),
);

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
