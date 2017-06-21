// @TODO: add minification

module.exports = {
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
  entry: './src/index.js',
  output: {
    filename: 'dist/scribe-hexmap.min.js',
  },
};
