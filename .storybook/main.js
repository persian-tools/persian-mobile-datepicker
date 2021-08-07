const path = require('path');
const fs = require('fs');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  reactOptions: {
    fastRefresh: false,
    strictMode: true,
  },
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-viewport',
    '@storybook/addon-links',
    '@geometricpanda/storybook-addon-badges',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: /\.stories\.tsx?$/,
          include: [path.resolve(__dirname, '../src/stories')],
        },
        sourceLoaderOptions: {
          injectStoryParameters: true,
        },
        loaderOptions: {
          injectStoryParameters: true,
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
