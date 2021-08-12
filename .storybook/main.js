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
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
    '@storybook/addon-viewport',
    '@storybook/addon-links',
    '@geometricpanda/storybook-addon-badges',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: /\.stories\.tsx?$/,
          include: [path.resolve(__dirname, '../stories')],
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
