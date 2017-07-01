const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const path = require('path');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

function makeTemplate(name, obj) {
  const template = {
    alwaysWriteToDisk: true,
    inject: 'body',
    filename: `${name}.html`,
    template: `${srcPath}/${name}.html`,
    hash: 'true',
    cache: 'true',
    chunks: [name],
  };

  return Object.assign({}, template, obj);
}

module.exports = {
  entry: {
    blobs: `${srcPath}/blobs.js`,
    'cellular-automata': `${srcPath}/cellular-automata.js`,
  },

  output: {
    filename: '[name].js',
    path: distPath,
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: /(src)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-3'],
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin(makeTemplate('index', { chunks: [] })),
    new HtmlWebpackPlugin(makeTemplate('blobs')),
    new HtmlWebpackPlugin(makeTemplate('cellular-automata')),
    new HtmlWebpackHarddiskPlugin({
      outputPath: distPath,
    }),
    new CopyWebpackPlugin([
      { from: `${srcPath}/assets`, to: `${distPath}/assets` },
    ]),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: true,
      sourceMap: true,
    }),
  ],
};
