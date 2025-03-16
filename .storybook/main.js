/** @type { import('@storybook/html-webpack5').StorybookConfig } */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const sass = require('sass-embedded');

module.exports = {
  stories: ['../src/**/*.stories.js'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
  ],

  staticDirs: ['../public'],

  framework: {
    name: "@storybook/html-webpack5",
    options: {
      builder: {
        useSWC: true,
        options: {
          publicPath: '/storybook/',
        },
      },
      fastRefresh: false,
    },
  },

  webpackFinal: async (config) => {
    // ─── Copy USWDS Assets WITHOUT hashing ────────────────────────
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../node_modules/@uswds/uswds/dist/fonts'),
            to: 'uswds/fonts/[name][ext]',
          },
          {
            from: path.resolve(__dirname, '../node_modules/@uswds/uswds/dist/img'),
            to: 'uswds/img/[name][ext]',
          },
          {
            from: path.resolve(__dirname, '../node_modules/@uswds/uswds/dist/js/uswds-init.min.js'),
            to: 'uswds/js/uswds-init.min.js',
          },
        ],
      })
    );

    // ─── Stylelint Plugin ──────────────────────────────────────────
    config.plugins.push(
      new StylelintPlugin({
        files: 'src/**/*.scss',
        emitWarning: true,
        failOnError: false,
        fix: false,
      })
    );

    // ─── Twig Loader ───────────────────────────────────────────────
    config.module.rules.push({
      test: /\.twig$/,
      use: 'twig-loader',
    });

    // ─── SCSS Loader ───────────────────────────────────────────────
    config.module.rules.push({
      test: /\.scss$/,
      include: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../src/scss'),
      ],
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            url: false,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: sass,
            sassOptions: {
              loadPaths: [
                path.resolve(__dirname, '../node_modules/@uswds/uswds/packages'),
                path.resolve(__dirname, '../src/scss'),
              ],
              silenceDeprecations: ['mixed-decls'],
            },
          },
        },
      ],
    });

    // ─── YAML Loader ───────────────────────────────────────────────
    config.module.rules.push({
      test: /\.yml$/,
      use: 'yaml-loader',
      include: path.resolve(__dirname, '../'),
    });

    // ─── Resolve Extensions ────────────────────────────────────────
    config.resolve.extensions.push('.twig');
    config.resolve.modules = [
      path.resolve(__dirname, '../src/scss'),
      path.resolve(__dirname, '../node_modules'),
      'node_modules',
    ];

    return config;
  },
};
