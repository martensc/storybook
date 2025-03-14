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
        },
      },
    ],
    include: path.resolve(__dirname, '../assets/scss'),
  });

  config.module.rules.push({
    test: /\.yml$/,
    use: ['yaml-loader'],
    include: path.resolve(__dirname, '../'),
  });

  config.resolve.extensions.push('.twig');

  return config;
};
