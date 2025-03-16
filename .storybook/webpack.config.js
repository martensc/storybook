const path = require('path');
const sass = require('sass-embedded');

module.exports = ({ config }) => {
  // Twig Loader: Handle `.twig` template files using twig-loader
  config.module.rules.push({
    test: /\.twig$/,
    use: [
      {
        loader: 'twig-loader',
        options: {
          // No specific options required unless adding custom filters/functions
        },
      },
    ],
  });

  // SCSS Loader: Compile SCSS (including USWDS + custom styles) to CSS
  config.module.rules.push({
    test: /\.scss$/,
    include: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../src/scss'),
    ],
    use: [
      'style-loader', // Inject CSS into DOM
      {
        loader: 'css-loader',
        options: {
          url: false, // Prevent resolving image/font URLs; handled manually
        },
      },
      {
        loader: 'sass-loader',
        options: {
          implementation: sass, // Use Dart Sass embedded version
          sassOptions: {
            loadPaths: [
              // Allow SCSS imports from USWDS and project-specific folders
              path.resolve(__dirname, '../node_modules/@uswds/uswds/packages'),
              path.resolve(__dirname, '../src/scss'),
            ],
            silenceDeprecations: ['mixed-decls'], // Suppress mixed declarations warnings (USWDS-specific)
          },
        },
      },
    ],
  });

  // YAML Loader: Enable importing `.yml` files as JavaScript objects
  config.module.rules.push({
    test: /\.yml$/,
    use: ['yaml-loader'],
    include: path.resolve(__dirname, '../'), // Apply loader to all project YML files
  });

  // File Extension Resolution: Automatically resolve `.twig` imports without specifying extension
  config.resolve.extensions.push('.twig');

  return config;
};
