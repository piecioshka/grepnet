const config = require('./webpack.config');

module.exports = {
  mode: 'development',

  devtool: 'source-map',

  ...config,
};
