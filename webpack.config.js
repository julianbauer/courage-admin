var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: './app/main.js',

  output: {
    publicPath: '/'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [node_modules_dir],
      loaders: ['react-hot', 'babel']
    }, {
      test: /\.styl$/,
      loader: 'style!css!autoprefixer!stylus?paths=./app/assets/styles'
    }, {
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'file'
      ]
    }, {
      test: /\.(woff|woff2|ttf|eot)$/,
      loader: 'url?limit=100000'
    }, {
      test: /\.json$/,
      loader: 'json'
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Courage',
      template: 'app/index.html'
    })
  ]
};

module.exports = config;
