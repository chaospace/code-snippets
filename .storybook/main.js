const {nodeModules} = require('../webpack/const');

module.exports = {
  webpackFinal: async (config, {configType}) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /(\.module)?.(sass|s.?css)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: {
              auto: /\.module.(sass|s?css)$/,
              exportLocalsConvention: 'camelCaseOnly'
            }
          }
        },
        {
          loader: 'sass-loader',
          options: {
            //additionalData: "@use '@/assets/styles/config';",
            sourceMap: true,
            sassOptions: {
              outputStyle: 'compressed',
              includePaths: [nodeModules]
            }
          }
        }
      ]
    });

    // Return the altered config
    return config;
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  }
};
