module.exports = function override(config) {
  console.log(JSON.stringify(config.module, null, 2));
  config.module.rules.unshift({
    test: /\.stories\.tsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  });

  return config;
};
