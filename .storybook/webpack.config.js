const path = require('path');
const sass = require('sass-embedded');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.twig$/,
    use: [
      {
        loader: 'twigjs-loader',
      },
    ],
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          implementation: sass,
          sassOptions: {
            loadPaths: [
              path.resolve(__dirname, '../assets/scss'),
              path.resolve(
                __dirname,
                '../node_modules/@uswds/uswds/packages'
              ),
            ],
            // Hiding mixed declaration warnings for now.
            // https://sass-lang.com/documentation/breaking-changes/mixed-decls/
            silenceDeprecations: ['mixed-decls'],
          },
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.yml$/,
    use: ['yaml-loader'],
    include: path.resolve(__dirname, '../'),
  });

  config.resolve.extensions.push('.twig');

  return config;
};
