var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client/public/js');
var APP_DIR = path.resolve(__dirname, 'client/app');

var config = {
  entry: [APP_DIR + '/index.jsx', 'webpack/hot/dev-server'],
  output: {
    path: BUILD_DIR,
    publicPath: 'client/public/js',
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ["transform-decorators-legacy", "transform-class-properties"]
        }
      }, {
        test: /\.css$/,
        exclude: /\.useable\.css$/,
        loader: "style-loader!css-loader"
      },

    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.OldWatchingPlugin()
  ]
};

module.exports = config;
