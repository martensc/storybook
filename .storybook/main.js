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
    // ✅ Copy USWDS fonts & images to /public/uswds/
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
        ],
      })
    );

    // ✅ Rule to expose uswds-init.min.js via file-loader
    config.module.rules.push({
      test: /uswds-init\.min\.js$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'vendor/uswds/[name].[ext]',
          },
        },
      ],
      include: path.resolve(__dirname, '../node_modules/@uswds/uswds/dist/js'),
    });

    return config;
  },
};
