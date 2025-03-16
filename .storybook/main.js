/** @type { import('@storybook/html-webpack5').StorybookConfig } */

// Required dependencies
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  // Define where to find Storybook stories
  stories: ['../src/**/*.stories.js'],

  // Add essential Storybook addons for functionality, accessibility, links, etc.
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],

  // Serve static files (fonts, images, etc.) from the public folder
  staticDirs: ['../public'],

  // Use the HTML Webpack5 builder for Storybook
  framework: {
    name: "@storybook/html-webpack5",
    options: {
      builder: {
        useSWC: true, // Use SWC for faster builds (alternative to Babel)
      },
      fastRefresh: false, // Disable fast refresh (optional, depends on project needs)
    }
  },

  // Customize Webpack configuration for Storybook
  webpackFinal: async (config) => {
    // Copy USWDS assets (fonts, images, JS) into hashed output folders
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

    // Generate an asset manifest mapping original filenames to hashed filenames
    config.plugins.push(
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '', // Use relative paths to match Storybook deployment structure
      })
    );

    // Lint SCSS files using Stylelint during build (non-blocking, shows warnings only)
    config.plugins.push(
      new StylelintPlugin({
        files: 'src/**/*.scss', // Target SCSS files in src folder
        emitWarning: true, // Show warnings in console
        failOnError: false, // Don't block build on lint errors (can change for production strictness)
        fix: false, // Auto-fix disabled (optional to enable)
      })
    );

    return config;
  },
};
