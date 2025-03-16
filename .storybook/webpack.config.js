const path = require('path');
const sass = require('sass-embedded');

module.exports = ({ config }) => {
  // Twig Loader
  config.module.rules.push({
    test: /\.twig$/,
    use: [
      {
        loader: 'twigjs-loader',
      },
    ],
  });

  // Babel Loader for JS
  config.module.rules.push({
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
    include: path.resolve(__dirname, '../src'),
  });

  // SCSS Loader: USWDS + Custom SCSS
  config.module.rules.push({
    test: /\.scss$/,
    include: [
      path.resolve(__dirname, '../src/scss'),
      path.resolve(__dirname, '../src'),
    ],
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          url: false, // ✅ Prevent font/image URL resolution
        },
      },
      {
        loader: 'sass-loader',
        options: {
          implementation: sass,
          sassOptions: {
            loadPaths: [
              path.resolve(__dirname, '../src/scss'),
              path.resolve(__dirname, '../node_modules/@uswds/uswds/packages'),
            ],
            silenceDeprecations: ['mixed-decls'], // ✅ Suppress USWDS warnings
          },
        },
      },
    ],
  });

  // YAML Loader
  config.module.rules.push({
    test: /\.yml$/,
    use: ['yaml-loader'],
    include: path.resolve(__dirname, '../'),
  });

  // Twig extension resolution
  config.resolve.extensions.push('.twig');

  return config;
};
