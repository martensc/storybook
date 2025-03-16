/** @type { import('@storybook/html-webpack5').StorybookConfig } */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

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
    // Copy & hash fonts, images, JS
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../node_modules/@uswds/uswds/dist/fonts'),
            to: 'uswds/fonts/[name].[contenthash][ext]',
          },
          {
            from: path.resolve(__dirname, '../node_modules/@uswds/uswds/dist/img'),
            to: 'uswds/img/[name].[contenthash][ext]',
          },
          {
            from: path.resolve(__dirname, '../node_modules/@uswds/uswds/dist/js/uswds-init.min.js'),
            to: 'uswds/js/uswds-init.[contenthash].min.js',
          },
        ],
      })
    );

    // Add manifest plugin to map hashed filenames
    config.plugins.push(
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '', // Keep relative paths
      })
    );

    return config;
  },
};
