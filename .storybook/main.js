/** @type { import('@storybook/html-webpack5').StorybookConfig } */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
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

    // Add Stylelint Webpack Plugin
    config.plugins.push(
      new StylelintPlugin({
        files: 'src/**/*.scss', // Adjust path as needed
        emitWarning: true, // Show warnings during dev
        failOnError: false, // Prevent blocking dev server
        fix: false, // Optional: Enable auto-fix if desired
      })
    );

    return config;
  },
};
