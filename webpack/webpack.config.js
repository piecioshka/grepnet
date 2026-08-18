const path = require('node:path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const root = path.join(__dirname, '..');

module.exports = {
  entry: [path.join(root, 'client', 'scripts', 'main.js')],

  output: {
    filename: 'bundle.js',
    path: path.join(root, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'client/index.html', to: 'index.html' },
        { from: 'client/images/', to: 'images/' },
      ],
    }),
  ],
};
