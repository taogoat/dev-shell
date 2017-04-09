var webpack = require('webpack')
var cssPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/core/client/index.js',

  output: {
    path: './build/public/',
    filename: 'index.js',
    publicPath: '/public/',
  },

  resolve: {
    extensions: ['.js'],
  },
  module: {
    loaders: [{
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'url-loader'
    },{
      test: /\.jpg$/,
      loader: 'url-loader'
    },{
      test: /\.css$/,
      loader: 'css-loader'
    },{
      test: /\.svg$/,
      loader: 'raw-loader'
    },{
      test: /\.html$/,
      loader: 'raw-loader'
    },{
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  plugins: [
    new cssPlugin('[name].css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true)
      }
    }),
    //new webpack.optimize.UglifyJsPlugin()
  ],
}
