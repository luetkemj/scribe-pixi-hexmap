const path = require('path');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|build|coverage|dist|test)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-3'],
          },
        },
      },
    ],
  },
  devtool: 'eval-source-map',
  entry: './src/index.js',
  output: {
    filename: 'dist/scribe-hexmap.min.js',
  },
  devServer: {
    hot: true,
    port: 3000,
    contentBase: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
};
