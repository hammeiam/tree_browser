var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: './',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {compact: false}
      },
      {
        test: /\.jsx?$/,
        loader: 'eslint'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
}