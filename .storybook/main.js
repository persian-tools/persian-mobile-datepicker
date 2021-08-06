const path = require('path');
const fs = require('fs');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-viewport',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          include: [path.resolve(__dirname, '../src')],
        },
        loaderOptions: {
          prettierConfig: fs.readFileSync(
            path.resolve(__dirname, '../.prettierrc'),
            {
              encoding: 'utf8',
            },
          ),
        },
      },
    },
  ],
};
