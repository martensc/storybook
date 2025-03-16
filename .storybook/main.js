/** @type { import('@storybook/html-webpack5').StorybookConfig } */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  "stories": ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  staticDirs: ['../public'],
  framework: {
    name: "@storybook/html-webpack5",
    options: {
      builder: {
          useSWC: true,
      },
      fastRefresh: false,
    }
  },
  webpackFinal: async (config) => {
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../node_modules/@uswds/uswds/dist/js'),
            to: path.resolve(__dirname, '../public/uswds/js'),
          },
        ],
      })
    );
    return config;
  },
};
