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
    // Add alias or copy rule to expose uswds-init.min.js
    config.module.rules.push({
      test: /uswds-init\.min\.js$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'vendor/uswds/[name].[ext]', // Serve from /vendor/uswds/
          },
        },
      ],
      include: path.resolve(__dirname, '../node_modules/@uswds/uswds/dist/js'),
    });

    return config;
  },
};
