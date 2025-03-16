/** @type { import('@storybook/html-webpack5').StorybookConfig } */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const sass = require('sass'); // Ensure you have 'sass' installed!

module.exports = {
  stories: ['../src/**/*.stories.js'],
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
    // Copy USWDS fonts, images, and JS to /public/uswds/
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          // Copy fonts
          {
            from: path.resolve(__dirname, '../node_modules/@uswds/uswds/dist/fonts'),
            to: path.resolve(__dirname, '../public/uswds/fonts'),
          },
          // Copy images
          {
            from: path.resolve(__dirname, '../node_modules/@uswds/uswds/dist/img'),
            to: path.resolve(__dirname, '../public/uswds/img'),
          },
          // Copy JS (uswds-init.min.js)
          {
            from: path.resolve(__dirname, '../node_modules/@uswds/uswds/dist/js/uswds-init.min.js'),
            to: path.resolve(__dirname, '../public/uswds/js/uswds-init.min.js'),
          },
        ],
      })
    );

    return config;
  },
};
