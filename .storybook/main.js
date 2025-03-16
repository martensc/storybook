/** @type { import('@storybook/html-webpack5').StorybookConfig } */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const sass = require('sass-embedded');

module.exports = {
  // Where Storybook should find stories
  stories: ['../src/**/*.stories.js'],

  // Essential addons
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],

  // Serve static assets
  staticDirs: ['../public'],

  // Use HTML + Webpack5 builder with SWC for fast JS transpilation
  framework: {
    name: "@storybook/html-webpack5",
    options: {
      builder: { useSWC: true },
      fastRefresh: false,
    }
  },

  // Customize Webpack
  webpackFinal: async (config) => {
    // ─── Copy USWDS Assets ────────────────────────────────
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

    // ─── Generate Asset Manifest ───────────────────────────
    config.plugins.push(
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '', // Relative paths
      })
    );

    // ─── Stylelint for SCSS ───────────────────────────────
    config.plugins.push(
      new StylelintPlugin({
        files: 'src/**/*.scss',
        emitWarning: true,
        failOnError: false,
        fix: false,
      })
    );

    // ─── Twig Loader ───────────────────────────────────────
    config.module.rules.push({
      test: /\.twig$/,
      use: 'twig-loader',
    });

    // ─── SCSS Loader: USWDS + Custom SCSS ───────────────────
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
            url: false, // Prevent resolving image/font URLs
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

    // ─── YAML Loader ───────────────────────────────────────
    config.module.rules.push({
      test: /\.yml$/,
      use: 'yaml-loader',
      include: path.resolve(__dirname, '../'),
    });

    // ─── Resolve SCSS & Twig Shortcuts ─────────────────────
    config.resolve.extensions.push('.twig');
    config.resolve.modules = [
      path.resolve(__dirname, '../src/scss'),
      path.resolve(__dirname, '../node_modules'),
      'node_modules',
    ];

    return config;
  },
};
